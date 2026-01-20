<template>
<div class="relative mx-[-20px] 3xl:mx-0">
    <Carousel v-bind="carouselConfig"
      class="3xl:overflow-hidden 3xl:rounded-[10px]"
      ref="carousel"
      v-model="currentSlide">

      <Slide v-for="(slide, index) in slides" :key="index">
        <NuxtLink :to="slide.link" :class="carouselLinkClasses">
          <NuxtImg v-if="viewport.isLessOrEquals('sm')"
            :class="carouselImgClasses"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :src="cdnUrl + slide.imageSm"
          />
          <NuxtImg v-else
            :class="carouselImgClasses"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :src="cdnUrl + slide.imageLg"
          />
        </NuxtLink>
      </Slide>
    </Carousel>

    <!-- custom pagination -->
    <div :class="paginationContainerClasses">
      <button
        v-for="(slide, index) in slides"
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

    <!-- custom arrows -->
    <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.prev()" :class="carouselArrowClasses + ' ' + arrowLeftClasses">
      <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
    </button>
    <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.next()" :class="carouselArrowClasses + ' ' + arrowRightClasses">
      <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
    </button>

    <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
      <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
    </svg>
</div>
</template>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import type { CarouselExposed } from 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';

const viewport = useViewport();
const carousel = ref<CarouselExposed>();
const currentSlide = ref(0);

// CDN configuration
const cdnUrl = 'https://cdn02.plentymarkets.com/w73p32remdlq/frontend';

// Slides data
const slides = [
  {
    link: '/bhs/spacercup-bhs-mit-buegel',
    imageSm: '/pwa/banner/spacer-sm.jpg',
    imageLg: '/pwa/banner/spacer-lg.jpg'
  },
  {
    link: '/bhs/schalen-bhs-mit-buegel',
    imageSm: '/pwa/banner/schalen-sm.jpg',
    imageLg: '/pwa/banner/schalen-lg.jpg'
  },
  {
    link: '/search?term=push-up',
    imageSm: '/pwa/banner/pushup-sm.jpg',
    imageLg: '/pwa/banner/pushup-lg.jpg'
  },
  {
    link: '/bh-hemden',
    imageSm: '/pwa/banner/bh_hemden-sm.jpg',
    imageLg: '/pwa/banner/bh_hemden-lg.jpg'
  },
  {
    link: '/bhs/sport',
    imageSm: '/pwa/banner/sport-sm.jpg',
    imageLg: '/pwa/banner/sport-lg.jpg'
  }
];

// Carousel configuration
const carouselConfig = {
  itemsToShow: 1,
  autoplay: 8000,
  wrapAround: true,
  pauseAutoplayOnHover: false,
  transition: 500,
  slideEffect: 'fade' as const
};

// Classes
const carouselLinkClasses = 'w-full h-0 pb-[150%] md:pb-[50%] relative';
const carouselImgClasses = 'absolute top-0 left-0 w-full h-full 3xl:rounded-[10px]';
const carouselArrowClasses = 'absolute z-10 mt-[-30px] top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300';
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