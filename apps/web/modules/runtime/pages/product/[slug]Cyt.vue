<template>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <NarrowContainer>
        <div class="bg-[#F5EFEF] w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <div class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px]">
            <div class="flex flex-col gap-[30px] xl:grid xl:grid-cols-[auto_520px] xl:gap-[80px]">
              <div class="left xl:min-w-[0] xl:self-start xl:sticky xl:top-[40px]">              
                <Gallery
                  :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" 
                  :product="product"
                />
              </div>              
              <div class="right">
                <div class="drift-zoom-image relative xl:sticky xl:top-[40px]">
                  <NuxtLazyHydrate when-idle>
                    <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
                  </NuxtLazyHydrate>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-3xl mx-auto pt-[20px] pb-[20px] xl:pt-[60px]" v-if="reviewGetters.getTotalReviews(countsProductReviews) > 0">
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />
        </div>
        
        <!-- <div class="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <div class="max-w-screen-3xl mx-auto p-[20px] xl:pt-[80px]">
            <h2 class="pb-[30px] lg:pb-[50px] font-semibold text-[14px] xl:text-[18px] text-center lg:text-left">
              <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">{{ t('Product.recommendedProducts') }}</span>
            </h2>
          </div>
          <div class="bg-[#F5EFEF]">
            <section ref="recommendedSection" class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px] [&>.items-center+.typography-text-xs]:hidden">
              <component
                v-if="showRecommended"
                :is="RecommendedProductsAsync"
                :category-id="productGetters.getCategoryIds(product)[0] ?? ''"
              />
            </section>
          </div>
        </div> -->
        <CrossSellingItemsAccessoryCyt />
        <CrossSellingItemsSimilarCyt />
      </NarrowContainer>
  
      <UiReviewModal />
      <ProductLegalDetailsDrawer v-if="open" :product="product" class="[&_aside]:!border-0 [&_*]:!text-[14px] [&_header]:!px-[20px] [&_header]:!py-[5px] [&_header]:!bg-black [&_[role='tabpanel']>.py-2.px-4]:!p-0 [&_button]:!rounded-[0]" />
    </NuxtLayout>
  </template>
  
<script setup lang="ts">
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, reviewGetters, categoryTreeGetters } from '@plentymarkets/shop-api';

const route = useRoute();
const { setCurrentProduct } = useProducts();

const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { data: product, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const { data: productReviews, fetchProductReviews } = useProductReviews(Number(productId));
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();
const { setPageMeta } = usePageMeta();

const config = useRuntimeConfig().public;

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  validate: async (route) => {
    return validateProductParams(route.params);
  },
  type: 'product',
  isBlockified: false,
  identifier: 0,
});
const RecommendedProductsAsync = defineAsyncComponent(
  async () => await import('~/components/RecommendedProducts/RecommendedProducts.vue'),
);

const showRecommended = ref(false);
const recommendedSection = ref<HTMLElement | null>(null);
const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  if (import.meta.client) showError({ statusCode: 404, statusMessage: 'Product not found' });

  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}
setCurrentProduct(product.value || ({} as Product));
setProductMeta();


onBeforeRouteLeave(() => {
  setCurrentProduct({} as Product);
});

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
}
await fetchReviews();

setBreadcrumbs();

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
        replace: true,
      });
    }
  },
);

watch(
  () => categoryTree.value,
  (categoriesTree) => {
    setProductCanonicalMetaData(product.value);
    const productCategoryId = productGetters.getParentCategoryId(product.value);
    if (categoriesTree.length > 0 && productCategoryId) {
      const categoryTree = categoriesTree.find(
        (categoryTree) => categoryTreeGetters.getId(categoryTree) === productCategoryId,
      );
      if (categoryTree) {
        setProductMetaData(product.value, categoryTree);
        setProductRobotsMetaData(product.value);
      }
    }
  },
  { immediate: true },
);

watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

const observeRecommendedSection = () => {
  if (import.meta.client && recommendedSection.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showRecommended.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(recommendedSection.value);
  }
};

onNuxtReady(() => observeRecommendedSection());
</script>
  