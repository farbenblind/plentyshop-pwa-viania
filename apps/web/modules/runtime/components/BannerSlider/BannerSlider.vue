<template>
<div class="relative mx-[-20px] 3xl:mx-0">
    <Swiper
      v-bind="swiperOptions"
      class="3xl:overflow-hidden 3xl:rounded-[10px]"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
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
      </SwiperSlide>
    </Swiper>

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
    <button v-if="viewport.isGreaterOrEquals('md')" @click="swiperInstance?.slidePrev()" :class="carouselArrowClasses + ' ' + arrowLeftClasses">
      <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
    </button>
    <button v-if="viewport.isGreaterOrEquals('md')" @click="swiperInstance?.slideNext()" :class="carouselArrowClasses + ' ' + arrowRightClasses">
      <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
    </button>

    <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
      <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
    </svg>
</div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ref } from 'vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const viewport = useViewport();
const swiperInstance = ref<SwiperType>();
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

// Swiper configuration
const swiperOptions = {
  modules: [Autoplay, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: 'fade' as const,
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  speed: 500,
  allowTouchMove: true
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
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex;
};

const slideTo = (index: number) => {
  swiperInstance.value?.slideToLoop(index);
};
</script>