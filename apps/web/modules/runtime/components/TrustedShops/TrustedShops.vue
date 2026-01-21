<template>
<div v-if="data && data.reviews" class="pt-[60px] 4xl:pt-[120px] xl:grid xl:grid-cols-[auto_430px] gap-[40px] 3xl:gap-[80px] xl:max-w-[90%] xl:mx-auto">
    <div class="xl:min-w-0">
        <div class="relative">
            <Swiper
              v-bind="swiperOptions"
              class="text-center"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
            >
                <SwiperSlide v-for="(review, index) in data.reviews" :key="index">
                    <div class="p-4 xl:p-0 flex flex-col gap-[10px] h-full w-full">
                        <div class="inline-flex items-center justify-between truncate mx-auto">
                            <div class="flex gap-[0] text-[#FCC72F]">
                                <svg v-for="star in 5" :key="star" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]" viewBox="0 0 24 24">
                                    <defs>
                                        <linearGradient :id="`star-${star}`">
                                        <stop offset="50%" stop-color="currentColor"/>
                                        <stop offset="50%" stop-color="#fff"/>
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"
                                        :fill="star <= review.rating ? 'currentColor' : (star - 0.5 <= review.rating ? `url(#star-${star})` : '#fff')"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-[18px] xl:text-[24px] leading-[1.35] px-[20px] sm:px-[40px] 3xl:px-[60px] my-auto">{{ viewport.isLessOrEquals('sm') ? truncateText(review.comment, 20) : truncateText(review.comment, 30) }}</p>
                        <p class="text-[12px] xl:text-[14px]">{{ review.name.trim() }}, {{ formatDate(review.submittedAt) }}</p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <button @click="swiperInstance?.slidePrev()" :class="carouselArrowClasses + ' left-[-20px]'">
              <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
            <button @click="swiperInstance?.slideNext()" :class="carouselArrowClasses + ' right-[-20px] rotate-180'">
              <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
        </div>
    </div>

    <div class="bg-[#F8F8F8] mx-[-20px] mt-[40px] xl:mx-0 xl:mt-0 xl:rounded-[10px]">
        <div class="px-[20px] py-[30px] xl:px-[30px] grid grid-cols-[auto_100px] max-w-[400px] mx-auto xl:max-w-[inherit] xl:h-full">
            <div class="text-[12px] xl:text-[14px] my-auto">
                <div class="flex align-center gap-[10px]">
                    <span class="font-semibold text-[18px] xl:text-[24px]">{{ data?.rating365.toString().replace('.',',') }}</span>

                    <div class="inline-flex align-center truncate self-center">
                        <div class="flex gap-[0] text-[#FCC72F]">
                          <svg v-for="star in 5" :key="star" class="w-[17px] h-[17px] xl:w-[22px] xl:h-[22px]" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <defs>
                              <clipPath :id="`half-clip-${star}`" clipPathUnits="objectBoundingBox">
                                <rect x="0" y="0" width="0.5" height="1" />
                              </clipPath>
                            </defs>
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              :fill="star - 0.5 <= data?.rating365 ? '#cccccc' : '#cccccc'"
                            />
                            <path
                              v-if="star - 0.5 <= data?.rating365"
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              fill="#FCC72F"
                              :clip-path="star <= data?.rating365 ? '' : `url(#half-clip-${star})`"
                            />
                          </svg>
                        </div>
                    </div>
                </div>
                <div class="pt-[10px]">{{ data.count365 }} Bewertungen (letzte 12 Monate)</div>
                <div class="font-semibold">{{ data.overallCount }} Bewertungen (gesamt)</div>
                <div class="text-[10px] pt-[5px] font-normal">Stand: {{ formatDate(data.lastUpdated) }}</div>
            </div>
            <NuxtLink to="https://www.trustedshops.de/bewertung/info_XC6D0E273FECA9A8F9DF2ADD8B4DAD48C.html" target="_blank" class="flex m-auto">
                <NuxtImg src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/ts-badge.png" loading="lazy" />
            </NuxtLink>
        </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
      <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
    </svg>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

const viewport = useViewport();

const swiperInstance = ref<SwiperType>();
const carouselArrowClasses = 'absolute z-10 top-0 bottom-0 p-4 bg-white hover:scale-110 transition-transform duration-300';

interface Review {
  name: string;
  title: string;
  comment: string;
  rating: number;
  submittedAt: string;
}

interface RatingData {
  rating365: number;
  count365: number;
  overallCount: number;
  lastUpdated: string;
  reviews: Review[];
}

const data = ref<RatingData | null>(null)
const dataLoaded = ref(false)

const swiperOptions = {
  modules: [Autoplay],
  slidesPerView: 1,
  loop: true,
  speed: 500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  }
};

const currentSlide = ref(0);

// Methods
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const truncateText = (text: string, maxWords: number = 30): string => {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

onMounted(async () => {
  try {
    const response = await $fetch('https://farbenblind.github.io/plentyshop-pwa-viania/trustedshops-data.json')
    data.value = response as RatingData
  } catch (error) {
    console.error('Failed to load ratings:', error)
  } finally {
    dataLoaded.value = true
  }
})

</script>