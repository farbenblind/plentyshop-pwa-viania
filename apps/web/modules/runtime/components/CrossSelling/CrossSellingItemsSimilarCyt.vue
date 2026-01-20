<template>
  <div v-if="CrossSellingItemsSimilar?.products?.length > 0">
    <div class="max-w-screen-3xl mx-auto pt-[40px] xl:pt-[80px]">
      <h2 class="pb-[30px] lg:pb-[50px] font-semibold text-[14px] xl:text-[18px] text-center lg:text-left">
        <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">
          Ähnliche Artikel
        </span>
      </h2>
    </div>

    <div class="bg-[#F5EFEF] w-screen relative left-1/2 right-1/2 -mx-[50vw] py-[40px] xl:py-[60px]">
      <div class="max-w-screen-3xl mx-auto px-[10px] sm:px-[20px] relative">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="2"
          :slides-per-group="2"
          :space-between="10"
          :autoplay="enableAutoplay && { delay: 4000, disableOnInteraction: false }"
          :loop="false"
          :speed="500"
          :navigation="{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }"
          :pagination="{
            el: '.swiper-pagination-custom',
            clickable: true,
          }"
          :breakpoints="{
            800: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20
            },
            1600: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20
            },
          }"
          class="3xl:overflow-hidden 3xl:rounded-[10px]"
        >
          <SwiperSlide v-for="(slide, index) in CrossSellingItemsSimilar.products" :key="index">
            <UiProductCard
                :index="index"
                :product="slide"
                :name="productGetters.getName(slide) ?? ''"
                :rating-count="productGetters.getTotalReviews(slide)"
                :rating="productGetters.getAverageRating(slide, 'half')"
                :image-url="addModernImageExtension(productGetters.getCoverImage(slide))"
                :image-alt="
                    'alt-' + productImageGetters.getImageAlternate(productImageGetters.getFirstImage(slide)) ||
                    productGetters.getName(slide) ||
                    ''
                "
                :image-title="
                    productImageGetters.getImageName(productImageGetters.getFirstImage(slide)) ||
                    productGetters.getName(slide) ||
                    ''
                "
                :image-height="productGetters.getImageHeight(slide) || 600"
                :image-width="productGetters.getImageWidth(slide) || 600"
                :slug="productGetters.getSlug(slide) + `-${productGetters.getId(slide)}`"
                :base-price="productGetters.getDefaultBasePrice(product)"
                :unit-content="productGetters.getUnitContent(product)"
                :unit-name="productGetters.getUnitName(product)"
                :show-base-price="productGetters.showPricePerUnit(product)"
                :lazy="true"
                :priority="false"
            />
          </SwiperSlide>
          <!-- <SwiperSlide v-for="(slide, index) in 10" :key="index">
            <div class="text-center bg-white rounded-[5px] p-[20px]">Slide {{ index + 1 }}</div>
          </SwiperSlide> -->
        </Swiper>

        <!-- Custom arrows -->
        <button class="hidden md:block disabled:hidden swiper-button-prev-custom absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300 left-0 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-100px]">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
            <use href="#svg_arrow" />
          </svg>
        </button>
        <button class="hidden md:block disabled:hidden swiper-button-next-custom absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300 right-0 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-100px] rotate-180">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
            <use href="#svg_arrow" />
          </svg>
        </button>
      </div>
      
      <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
        <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
          <path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/>
        </g>
      </svg>
    </div>
    
    <!-- Custom pagination - Swiper handles this automatically! -->
    <div class="swiper-pagination-custom flex justify-center !gap-[10px] pt-[20px] md:pt-[40px]"></div>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const route = useRoute();
const { productId } = createProductParams(route.params);
const { data: product } = useProduct(productId);
const viewport = useViewport();

const enableAutoplay = true

const { addModernImageExtension } = useModernImage();

// Initialize cross-selling composable
const { fetchProducts: fetchCrossSelling, data: CrossSellingItemsSimilar } =
  useProducts(productId + "Similar");

// Fetch cross-selling after Nuxt is fully ready
onNuxtReady(async () => {
  if (product.value) {
    const itemId = productGetters.getItemId(product.value);
    if (itemId) {
      await fetchCrossSelling({
        itemId: itemId,
        type: "cross_selling",
        crossSellingRelation: "Similar",
      });
    }
  }
});
</script>

<style>
.swiper-slide {
  height: auto !important;
  display: flex;
}

.swiper-pagination-custom .swiper-pagination-bullet {
  width: 20px;
  height: 2px;
  border-radius: 9999px;
  background: #E5E5E5;
  opacity: 1;
  transition: all 500ms;
  margin: 0 !important;
}

.swiper-pagination-custom .swiper-pagination-bullet:hover {
  background: #000;
}

.swiper-pagination-custom .swiper-pagination-bullet-active {
  width: 30px;
  background: #000;
}

@media (min-width: 768px) {
  .swiper-pagination-custom .swiper-pagination-bullet {
    width: 30px;
    height: 3px;
  }
  
  .swiper-pagination-custom .swiper-pagination-bullet-active {
    width: 40px;
  }
}
</style>