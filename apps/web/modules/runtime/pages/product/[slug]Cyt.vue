<template>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <NarrowContainer>
        <div class="bg-[#F5EFEF]">
          <div class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px]">
            <div class="flex flex-col gap-[30px] xl:grid xl:grid-cols-[auto_520px] xl:gap-[80px]">
              <div class="left xl:min-w-[0] self-start xl:sticky xl:top-[40px]">              
                <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" />
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
        <div class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px]">
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />
        </div>
      </NarrowContainer>
  
      <UiReviewModal />
      <ProductLegalDetailsDrawer v-if="open" :product="product" />
    </NuxtLayout>
  </template>
  
<script setup lang="ts">
import { SfIconChevronRight } from '@storefront-ui/vue';
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, reviewGetters, categoryTreeGetters } from '@plentymarkets/shop-api';

const route = useRoute();
const { t } = useI18n();
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
  