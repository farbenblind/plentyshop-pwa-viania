<template>
  <div v-if="CrossSellingItemsSimilar?.products?.length > 0">
    <div class="max-w-screen-3xl mx-auto pt-[20px] xl:pt-[80px]">
      <h2 class="pb-[30px] lg:pb-[50px] font-semibold text-[14px] xl:text-[18px] text-center lg:text-left">
        <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">
          Ähnliche Artikel
        </span>
      </h2>
    </div>

    <div class="bg-[#F5EFEF] w-screen relative left-1/2 right-1/2 -mx-[50vw] py-[20px]">
      <div class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px]">
        <div class="relative">
          <Carousel 
            v-bind="carouselConfig"
            class="3xl:overflow-hidden 3xl:rounded-[10px]"
            ref="carousel"
            v-model="currentSlide"
          >
            <Slide v-for="(slide, index) in CrossSellingItemsSimilar.products" :key="index">
              <p>{{ slide.texts.name1 }} {{ slide.prices?.default?.unitPrice?.formatted }}</p>
            </Slide>
          </Carousel>
          
          <button 
            v-if="viewport.isGreaterOrEquals('md')" 
            @click="carousel?.prev()" 
            :class="carouselArrowClasses + ' ' + arrowLeftClasses"
          >
            <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
              <use href="#svg_arrow" />
            </svg>
          </button>
          <button 
            v-if="viewport.isGreaterOrEquals('md')" 
            @click="carousel?.next()" 
            :class="carouselArrowClasses + ' ' + arrowRightClasses"
          >
            <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
              <use href="#svg_arrow" />
            </svg>
          </button>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
        <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
          <path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/>
        </g>
      </svg>
    </div>
    <div :class="paginationContainerClasses">
      <button
        v-for="(slide, index) in CrossSellingItemsSimilar.products"
        :key="index"
        @click="slideTo(index)"
        :class="[
            paginationButtonBaseClasses,
            currentSlide === index
            ? paginationButtonActiveClasses
            : paginationButtonInactiveClasses
        ]"
        :aria-label="`Springe zu Slider ${index + 1}`"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';

const route = useRoute();
const { productId } = createProductParams(route.params);
const { data: product } = useProduct(productId);

// carousel
import 'vue3-carousel/dist/carousel.css';
import type { CarouselExposed } from 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';

const viewport = useViewport();
const carousel = ref<CarouselExposed>();
const currentSlide = ref(0);

// Initialize cross-selling composable
const { fetchProducts: fetchCrossSelling, data: CrossSellingItemsSimilar } =
  useProducts(productId + "Similar");

// Fetch cross-selling after Nuxt is fully ready
onNuxtReady(async () => {
  if (product.value) {
    const itemId = productGetters.getItemId(product.value);
    if (itemId) {
      console.log('onNuxtReady - Fetching cross-selling for itemId:', itemId);
      await fetchCrossSelling({
        itemId: itemId,
        type: "cross_selling",
        crossSellingRelation: "Similar",
      });
      console.log('CrossSellingItemsSimilar after fetch:', CrossSellingItemsSimilar.value);
    }
  }
});

// Carousel configuration
const carouselConfig = {
  autoplay: 8000,
  wrapAround: true,
  gap: 10,
  transition: 500,
  breakpointMode: 'carousel' as const,
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      itemsToScroll: 2,
      snapAlign: 'center' as const,
    },
    // 400px and up
    400: {
      itemsToShow: 3,
      itemsToScroll: 3,
      snapAlign: 'start' as const,
    },
    // 500px and up
    500: {
      itemsToShow: 4,
      itemsToScroll: 4,
      snapAlign: 'start' as const,
    },
  },
};

// Classes
const carouselArrowClasses = 'absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300';
const arrowLeftClasses = 'left-0 xl:left-6 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-100px]';
const arrowRightClasses = 'right-0 xl:right-6 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-100px] rotate-180';

const paginationContainerClasses = 'flex justify-center gap-2 pt-[20px] md:pt-[40px]';
const paginationButtonBaseClasses = 'h-[2px] md:h-[3px] rounded-full transition-all duration-[500ms]';
const paginationButtonActiveClasses = 'bg-black w-[30px] md:w-[40px]';
const paginationButtonInactiveClasses = 'w-[20px] md:w-[30px] bg-[#E5E5E5] hover:bg-black';

// Methods
const slideTo = (index: number) => {
  currentSlide.value = index;
};
</script>