<template>
  <div ref="reviewArea" class="relative col-span-5 h-fit" :class="{ 'pointer-events-none opacity-50': loadingReviews }">
    <SfLoaderCircular v-if="loadingReviews" class="absolute top-[130px] right-0 left-0 m-auto z-[999]" size="2xl" />

    <div id="customerReviewsAccordion" data-testid="reviews-accordion">
      <h2 id="customerReviewsClick" class="font-semibold font-[14px]">
        {{ t('customerReviews') }}
      </h2>

      <UiReviewStatistics :product="product" />
      <UiReview v-for="(reviewItem, key) in paginatedProductReviews" :key="key" :review-item="reviewItem" />

      <UiPagination
        v-if="paginatedProductReviews.length > 0"
        :key="pagination.totalCount"
        :current-page="currentPage"
        :total-items="pagination.totalCount"
        :page-size="config.defaultItemsPerPage"
        :max-visible-pages="maxVisiblePages"
        current-page-name="feedbackPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';
import type { ProductAccordionPropsType } from '~/components/ReviewsAccordion/types';

const { product } = defineProps<ProductAccordionPropsType>();

const { t } = useI18n();

const viewport = useViewport();
const reviewsOpen = ref(true);
const route = useRoute();

const config = useRuntimeConfig().public;

const productId = Number(productGetters.getItemId(product));
const productVariationId = productGetters.getVariationId(product);

const {
  data: productReviews,
  loading: loadingReviews,
  fetchReviews,
  reviewArea,
} = useProductReviews(productId, productVariationId);

const paginatedProductReviews = computed(() => reviewGetters.getReviewItems(productReviews.value));
const pagination = computed(() => reviewGetters.getReviewPagination(productReviews.value));
const currentPage = computed(() => reviewGetters.getCurrentReviewsPage(productReviews.value));

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 6 : 4));

watch(
  () => reviewsOpen.value,
  (value) => {
    if (value) fetchReviews();
  },
);

watch(
  () => route.query.feedbackPage,
  async () => {
    if (reviewArea.value) reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  },
);

watch(
  () => route.query,
  () => fetchReviews(),
);
</script>
