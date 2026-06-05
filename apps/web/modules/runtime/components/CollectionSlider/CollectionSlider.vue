<template>
<div class="pt-[60px] 4xl:pt-[120px] collections-section">
    <h3 class="font-bold pt-0 text-center lg:text-left text-[14px] sm:text-[18px]">
        <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">Entdecke unsere Kollektionen</span>
    </h3>
    <div class="relative 3xl:mx-0 mt-[40px] xl:mt-[50px] bg-[#F5EFEF] left-[calc(-1*(100vw-100%)/2)] w-screen py-[30px] lg:py-[60px]">
        <div class="relative max-w-screen-3xl mx-auto px-[20px]">
            <Swiper
                v-bind="swiperOptions"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <SwiperSlide v-for="collection in collections" :key="collection.slug">
                    <NuxtLink :to="collection.link" class="w-full flex flex-col gap-[10px] md:gap-[20px] lg:grid lg:grid-cols-2 lg:gap-[40px] h-full self-start no-underline">
                        <div class="relative h-0 pb-[100%] overflow-hidden">
                            <NuxtImg 
                                :class="[
                                    imageClasses,
                                    enableAnimation && 'transition-all duration-700 ease-out',
                                    enableAnimation && (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')
                                ]" 
                                :src="collection.image1" 
                                loading="lazy" 
                            />
                        </div>
                        <div class="grid gap-[10px] h-full lg:grid-rows-2">
                            <div class="grid grid-cols-2 gap-[10px] md:gap-[20px] lg:content-end">
                                <div class="relative h-0 pb-[100%] overflow-hidden">
                                    <NuxtImg 
                                        :class="[
                                            imageClasses,
                                            enableAnimation && 'transition-all duration-700 ease-out delay-100',
                                            enableAnimation && (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')
                                        ]" 
                                        :src="collection.image2" 
                                        loading="lazy" 
                                    />
                                </div>
                                <div class="relative h-0 pb-[100%] overflow-hidden">
                                    <NuxtImg 
                                        :class="[
                                            imageClasses,
                                            enableAnimation && 'transition-all duration-700 ease-out delay-200',
                                            enableAnimation && (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')
                                        ]" 
                                        :src="collection.image3" 
                                        loading="lazy" 
                                    />
                                </div>
                            </div>
                            <div :class="[
                                'flex flex-col text-center lg:order-[-1] pt-[5px] sm:pt-[10px] lg:pt-[0] @container',
                                enableAnimation && 'transition-all duration-700 ease-out delay-300',
                                enableAnimation && (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')
                            ]">
                                <h3 class="didot-text text-[48px] leading-[48px] lg:pt-[20px] 2xl:text-[6cqw] 2xl:leading-[6cqw] 3xl:text-[8cqw] 3xl:leading-[8cqw] 3xl:tracking-[-1px]">{{ collection.name }}</h3>
                                <p class="pb-[20px] lg:pb-[30px] xl:pb-[40px] pt-[10px] 2xl:pt-[20px] text-[14px] lg:text-[16px] xl:text-[18px] lg:max-w-[75%] mx-auto leading-[1.25] 2xl:leading-[1.5] md:max-w-[75%]">{{ collection.description }}</p>
                                <SfButton class="self-center hover:bg-secondary-600 xl:min-h-[50px] xl:pl-[35px] xl:pr-[35px]"><span class="font-light text-[14px] lg:text-[18px]">Kollektion ansehen</span></SfButton>
                            </div>
                        </div>
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
    
            <!-- custom arrows -->
            <button v-if="viewport.isGreaterOrEquals('lg')" @click="swiperInstance?.slidePrev()" :class="carouselArrowClasses + ' left-0 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-80px]'">
                <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
            <button v-if="viewport.isGreaterOrEquals('lg')" @click="swiperInstance?.slideNext()" :class="carouselArrowClasses + ' right-0 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-80px] rotate-180'">
                <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
          </div>
    
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
            <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
          </svg>
    </div>

    <!-- custom pagination -->
    <div class="flex items-center justify-center gap-2 pt-[20px] 4xl:pt-[40px]">
      <button v-if="viewport.isGreaterOrEquals('lg')" @click="swiperInstance?.slidePrev()" :class="carouselArrowClassesPagination + ' mr-[20px]'">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
      </button>
      <button
          v-for="(slide, index) in sliderCount"
          :key="index"
          @click="slideTo(index)"
          :class="[
          'h-[2px] md:h-[3px] rounded-full transition-all duration-[500ms]',
          currentSlide === index
              ? 'bg-black w-[30px] md:w-[40px]'
              : 'w-[20px] md:w-[30px] bg-[#E5E5E5] hover:bg-black'
          ]"
          :aria-label="`Springe zu Kollektion ${index + 1}`"
      />
      <button v-if="viewport.isGreaterOrEquals('lg')" @click="swiperInstance?.slideNext()" :class="carouselArrowClassesPagination + ' ml-[20px] rotate-180'">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
      </button>
    </div>
</div>
</template>

<style scoped>
.didot-text {
  font-family: Didot, "Libre Bodoni", "Bodoni Moda", Georgia, serif;
}
</style>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ref, onMounted, onUnmounted } from 'vue';
import { SfButton } from '@storefront-ui/vue';

// Import Swiper styles
import 'swiper/css';

const viewport = useViewport();

const swiperInstance = ref<SwiperType>();
const sliderCount = 4;
const currentSlide = ref(0);
const isVisible = ref(false);
const enableAnimation = ref(true); // 👈 Toggle this to enable/disable animation
const imageClasses = 'rounded-[5px] absolute top-0 left-0 w-full h-full cursor-grab';
const carouselArrowClasses = 'hidden 4xl:flex absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300';

const carouselArrowClassesPagination = '4xl:hidden px-4 hover:opacity-50 transition-opacity duration-300';

const cdnUrl = 'https://cdn02.plentymarkets.com/w73p32remdlq/frontend';

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (enableAnimation.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entering viewport - trigger animation
            isVisible.value = true;
          } else {
            // Leaving viewport - reset for next time
            isVisible.value = false;
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    const section = document.querySelector('.collections-section');
    if (section) {
      observer.observe(section);
    }
  } else {
    // If animation is disabled, set isVisible to true immediately
    isVisible.value = true;
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const collections = [
  {
    slug: 'carola',
    name: 'Carola',
    link: '/kollektionen/carola',
    description: 'Die Serie Carola ist ein absoluter Klassiker und bewährter Bestseller mit einer perfekten Passform.',
    image1: cdnUrl + '/pwa/collections/carola-1.jpg',
    image2: cdnUrl + '/pwa/collections/carola-2.jpg',
    image3: cdnUrl + '/pwa/collections/carola-3.jpg'
  },
  {
    slug: 'jessy',
    name: 'Jessy',
    link: '/kollektionen/jessy',
    description: 'Die klassische und angenehm zu tragende every-day-Serie Jessy. Der BH besitzt wie der Slip einen Ring als Hingucker in der vorderen Mitte. Das gibt der Serie einen leichten, frischen und jungen Touch.',
    image1: cdnUrl + '/pwa/collections/jessy-1.jpg',
    image2: cdnUrl + '/pwa/collections/jessy-2.jpg',
    image3: cdnUrl + '/pwa/collections/jessy-3.jpg'
  },
  {
    slug: 'ava',
    name: 'Ava',
    link: '/kollektionen/ava',
    image1: cdnUrl + '/pwa/collections/ava-1.jpg',
    image2: cdnUrl + '/pwa/collections/ava-2.jpg',
    image3: cdnUrl + '/pwa/collections/ava-3.jpg',
    description: 'Schöne und sexy Serie Ava bestehend aus zwei gefütterten Bügel-BHs mit Schalen, bei einem sind die gemoldeten Cups mit Spitze überzogen. Die Spitze findet sich auch passend im Slip wieder. Das I-Tüpfelchen sind rechteckige Glitzersteine als Hingucker in der vorderen Mitte.',
  },
  {
    slug: 'sally',
    name: 'Sally',
    link: '/kollektionen/sally',
    image1: cdnUrl + '/pwa/collections/sally-1.jpg',
    image2: cdnUrl + '/pwa/collections/sally-2.jpg',
    image3: cdnUrl + '/pwa/collections/sally-3.jpg',
    description: 'Der Multiway-BH der Serie Sally bietet neben den austauschbaren und abnehmbaren Trägern zusätzlich einen Push-up Effekt. Dadurch eröffnen sich verschiedene Tragemöglichkeiten und Lösungen für nahezu jedes Outfit.',
  }
];

const swiperOptions = {
  modules: [Autoplay],
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  slidesPerView: 1,
  loop: true,
  speed: 500,
  allowTouchMove: true
};

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