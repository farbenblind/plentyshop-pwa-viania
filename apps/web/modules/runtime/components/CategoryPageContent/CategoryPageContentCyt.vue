<template>
  <div class="bg-[#F5EFEF] mb-10">
    <div class="max-w-screen-3xl mx-auto p-[20px] lg:py-[40px] xl:py-[50px]">
      <div class="flex items-center">
        <h1 class="text-[18px] lg:text-[24px] xl:text-[36px] font-bold text-ellipsis whitespace-nowrap overflow-hidden">{{ title }}</h1>
        <NuxtLink to="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/pdf/koerpermasstabelle-viania.pdf" target="_blank" class="text-[12px] flex items-center gap-[10px] ml-auto pl-[10px]">
          <svg class="flex-shrink-0 min-w-[18px] min-h-[16px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="16" viewBox="0 0 18 16"><defs><clipPath id="a"><rect width="18" height="16" fill="none"/></clipPath></defs><g clip-path="url(#a)"><ellipse cx="6.9" cy="4.038" rx="6.9" ry="4.038" transform="translate(0.5 0.5)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><ellipse cx="3.45" cy="1.731" rx="3.45" ry="1.731" transform="translate(3.95 2.807)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M7.4,15.5C3.589,15.5.5,13.692.5,11.462" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line y1="6.923" transform="translate(0.5 4.539)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line y1="4.038" transform="translate(14.3 4.539)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line y2="3" transform="translate(14.3 8.375)" fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-width="1"/><line y2="3" transform="translate(6.8 8.375)" fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-width="1"/><line y2="2.25" transform="translate(3.05 7.625)" fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-width="1"/><line y2="3" transform="translate(10.55 8.375)" fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-width="1"/><path d="M7.4,15.5H17.5V8.577H7.4" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>
          <span class="underline whitespace-nowrap">{{ t('SizeTable') }}</span>
        </NuxtLink>
      </div>
      <NavChildren />
    </div>
  </div>
  <div class="max-w-screen-3xl mx-auto px-[20px]">
    <div class="flex items-center gap-[30px] md:relative md:z-[1]" v-if="products?.length">
      <span class="font-bold lg:font-normal text-[14px] mr-auto md:mr-0">{{ totalProducts }}&nbsp;{{ t('products')}}</span>
      <span class="flex gap-[10px] switcher" v-if="viewport.isLessThan('md')">
        <svg id="col2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g transform="translate(-345 -239)"><g transform="translate(345 239)" fill="none" stroke="#000" stroke-width="1"><rect width="15" height="15" stroke="none"/><rect x="0.5" y="0.5" width="14" height="14" fill="none"/></g><line y2="14" transform="translate(352.5 239.5)" fill="none" stroke="#000" stroke-width="1"/><line x2="14" transform="translate(345.5 246.5)" fill="none" stroke="#000" stroke-width="1"/></g></svg>
        <svg id="col1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="none" stroke="#000" stroke-width="1"><rect width="15" height="15" stroke="none"/><rect x="0.5" y="0.5" width="14" height="14" fill="none"/></g></svg>
      </span>
      <CategorySidebar :is-open="isOpen" @close="close">
        <NuxtLazyHydrate when-visible>
          <slot name="sidebar" />
        </NuxtLazyHydrate>
      </CategorySidebar>
    </div>
    <section
      v-if="products?.length"
      class="grid grid-cols-1 2xs:grid-cols-2 gap-[10px] sm:gap-[20px] sm:gap-y-[40px] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-[30px] 2xl:pt-[100px]" 
      data-testid="category-grid"
    >
      <NuxtLazyHydrate
        v-for="(product, index) in products"
        :key="productGetters.getVariationId(product)"
        when-visible
      >
        <UiProductCard
          :product="product"
          :name="productGetters.getName(product) ?? ''"
          :rating-count="productGetters.getTotalReviews(product)"
          :rating="productGetters.getAverageRating(product, 'half')"
          :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
          :image-alt="
            'alt-' + productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
            productGetters.getName(product) ||
            ''
          "
          :image-title="
            productImageGetters.getImageName(productImageGetters.getFirstImage(product)) ||
            productGetters.getName(product) ||
            ''
          "
          :image-height="productGetters.getImageHeight(product) || 600"
          :image-width="productGetters.getImageWidth(product) || 600"
          :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
          :priority="index < 5"
          :base-price="productGetters.getDefaultBasePrice(product)"
          :unit-content="productGetters.getUnitContent(product)"
          :unit-name="productGetters.getUnitName(product)"
          :show-base-price="productGetters.showPricePerUnit(product)"
        />
      </NuxtLazyHydrate>
    </section>
    <LazyCategoryEmptyState v-else />
    <UiPagination
      v-if="totalProducts > 0"
      :key="`${totalProducts}-${itemsPerPage}`"
      :current-page="getFacetsFromURL().page ?? 1"
      :total-items="totalProducts"
      :page-size="itemsPerPage"
      :max-visible-pages="maxVisiblePages"
    />
  </div>
  <NarrowContainer class="mb-20 px-4 md:px-0" data-testid="category-layout">
    <div class="md:flex gap-6" data-testid="category-page-content">
      <UiButton variant="tertiary" class="md:hidden bg-black !text-white !text-[14px] fixed bottom-[40px] right-[20px] sm:right-[20%] left-[20px] sm:left-[20%] z-[2] hover:!bg-black !rounded-[5px]" @click="open">
        <template #prefix>
          <svg xmlns="http://www.w3.org/2000/svg" width="18.001" height="16" viewBox="0 0 18.001 16"><g transform="translate(0.001)"><circle cx="3" cy="3" r="3" transform="translate(3.51 9.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="3.02" transform="translate(0.5 12.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x2="7.853" transform="translate(9.648 12.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><circle cx="3" cy="3" r="3" transform="translate(8.49 0.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x2="3.02" transform="translate(14.48 3.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="7.853" transform="translate(0.499 3.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>
        </template>
        {{ t('Filter') }}
      </UiButton>
    </div>
  </NarrowContainer>
</template>

<style scoped>
#col1 {
  .single-column & {
    background-color: black;
  }
}

#col2 {
  filter: invert(1);
  background-color: white;

  .single-column & {
    filter: invert(0);
    background-color: transparent;
  }
}

[data-testid="category-grid"] {
  .single-column & {
    @media (max-width: 767px) {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfIconTune, useDisclosure, SfLink } from '@storefront-ui/vue';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';
import { paths } from '~/utils/paths';

const { title, totalProducts, itemsPerPage = 24, products = [] } = defineProps<CategoryPageContentProps>();

const { t } = useI18n();
const localePath = useLocalePath();
const { getFacetsFromURL } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();

const { showNetPrices } = useCustomer();

const { isOpen, open, close } = useDisclosure();
const viewport = useViewport();

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

if (viewport.isLessThan('md')) close();

onMounted(() => {
  const switcher = document.querySelector('.switcher');

  if (!switcher) return;

  switcher.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.id === 'col1') {
      localStorage.setItem('singleColumn', 'true');
      document.documentElement.classList.add('single-column');
    }

    if (target.id === 'col2') {
      localStorage.removeItem('singleColumn');
      document.documentElement.classList.remove('single-column');
    }
  });
});
</script>
