<template>
<div class="pt-[60px] 4xl:pt-[120px]">
    <h3 class="font-bold pt-0 text-center lg:text-left text-[14px] sm:text-[18px]">
        <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">Entdecke unsere Kollektionen</span>
    </h3>
    <div class="relative 3xl:mx-0 mt-[60px] xl:mt-[80px] bg-[#F5EFEF] left-[calc(-1*(100vw-100%)/2)] w-screen py-[30px] lg:py-[60px]">
        <div class="relative max-w-screen-3xl mx-auto px-[20px]">
            <Carousel v-bind="carouselConfig"
                ref="carousel"
                v-model="currentSlide">
                <Slide v-for="collection in collections" :key="collection.slug">
                    <NuxtLink :to="collection.link" class="w-full flex flex-col gap-[10px] lg:gap-[20px] lg:grid lg:grid-cols-2 lg:gap-[40px]">
                        <div class="relative h-0 pb-[100%]">
                            <NuxtImg :class="imageClasses" :src="collection.image1" loading="lazy" />
                        </div>
                        <div class="grid gap-[10px]">
                            <div class="grid grid-cols-2 gap-[10px] lg:gap-[20px] lg:content-end">
                                <div class="relative h-0 pb-[100%]">
                                    <NuxtImg :class="imageClasses" :src="collection.image2" loading="lazy" />
                                </div>
                                <div class="relative h-0 pb-[100%]">
                                    <NuxtImg :class="imageClasses" :src="collection.image3" loading="lazy" />
                                </div>
                            </div>
                            <div class="flex flex-col text-center lg:order-[-1]" :class="collection.hasContainerQuery ? '@container' : ''">
                                <h3 class="didot-text text-[48px] leading-[48px] 2xl:text-[4cqw] 2xl:leading-[4cqw] 3xl:text-[5cqw] 3xl:leading-[5cqw] 3xl:tracking-[-1px]">{{ collection.name }}</h3>
                                <p class="pb-[20px] xl:pb-[40px] pt-[10px] 2xl:pt-[20px] text-[14px] lg:text-[16px] xl:text-[18px] lg:max-w-[75%] mx-auto leading-[1.25] 2xl:leading-[1.5]">{{ collection.description }}</p>
                                <SfButton class="self-center hover:bg-secondary-600 xl:min-h-[50px] xl:pl-[35px] xl:pr-[35px]"><span class="font-light text-[14px] lg:text-[18px]">Kollektion ansehen</span></SfButton>
                            </div>
                        </div>
                    </NuxtLink>
                </Slide>
            </Carousel>
    
            <!-- custom arrows -->
            <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.prev()" :class="carouselArrowClasses + ' left-0 xl:left-6 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-100px]'">
                <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
            <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.next()" :class="carouselArrowClasses + ' right-0 xl:right-6 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-100px] rotate-180'">
                <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
          </div>
    
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
            <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
          </svg>
    </div>

    <!-- custom pagination -->
    <div class="flex justify-center gap-2 pt-[20px] md:pt-[40px]">
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
    </div>
</div>
</template>

<style scoped>
.didot-text {
  font-family: Didot, "Libre Bodoni", "Bodoni Moda", Georgia, serif;
}
</style>

<script lang="ts" setup>
// my own carousel implementation for homepage
import 'vue3-carousel/dist/carousel.css';
import type { CarouselExposed } from 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';
import { SfButton } from '@storefront-ui/vue';
const viewport = useViewport();

const carousel = ref<CarouselExposed>();
const sliderCount = 4;
const currentSlide = ref(0);
const imageClasses = 'rounded-[5px] absolute top-0 left-0 w-full h-full';
const carouselArrowClasses = 'absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300';
const cdnUrl = 'https://cdn02.plentymarkets.com/w73p32remdlq/frontend';


const collections = [
  {
    slug: 'carola',
    name: 'Carola',
    link: '/kollektionen/carola',
    description: 'Die Serie Carola ist ein absoluter Klassiker und bewährter Bestseller mit einer perfekten Passform.',
    image1: cdnUrl + '/pwa/collections/carola-1.jpg',
    image2: cdnUrl + '/pwa/collections/carola-2.jpg',
    image3: cdnUrl + '/pwa/collections/carola-3.jpg',
    hasContainerQuery: true
  },
  {
    slug: 'jessy',
    name: 'Jessy',
    link: '/kollektionen/jessy',
    description: 'Die klassische und angenehm zu tragende every-day-Serie Jessy. Der BH besitzt wie der Slip einen Ring als Hingucker in der vorderen Mitte. Das gibt der Serie einen leichten, frischen und jungen Touch.',
    image1: cdnUrl + '/pwa/collections/jessy-1.jpg',
    image2: cdnUrl + '/pwa/collections/jessy-2.jpg',
    image3: cdnUrl + '/pwa/collections/jessy-3.jpg',
    hasContainerQuery: false
  },
  {
    slug: 'ava',
    name: 'Ava',
    link: '/kollektionen/ava',
    image1: cdnUrl + '/pwa/collections/ava-1.jpg',
    image2: cdnUrl + '/pwa/collections/ava-2.jpg',
    image3: cdnUrl + '/pwa/collections/ava-3.jpg',
    description: 'Schöne und sexy Serie Ava bestehend aus zwei gefütterten Bügel-BHs mit Schalen, bei einem sind die gemoldeten Cups mit Spitze überzogen. Die Spitze findet sich auch passend im Slip wieder. Das I-Tüpfelchen sind rechteckige Glitzersteine als Hingucker in der vorderen Mitte.',
    hasContainerQuery: false
  },
  {
    slug: 'sally',
    name: 'Sally',
    link: '/kollektionen/sally',
    image1: cdnUrl + '/pwa/collections/sally-1.jpg',
    image2: cdnUrl + '/pwa/collections/sally-2.jpg',
    image3: cdnUrl + '/pwa/collections/sally-3.jpg',
    description: 'Der Multiway-BH der Serie Sally bietet neben den austauschbaren und abnehmbaren Trägern zusätzlich einen Push-up Effekt. Dadurch eröffnen sich verschiedene Tragemöglichkeiten und Lösungen für nahezu jedes Outfit.',
    hasContainerQuery: false
  }
];

const carouselConfig = {
  itemsToShow: 1,
  // autoplay: 5000,
  wrapAround: true,
  // pauseAutoplayOnHover: true,
  transition: 500,
  slideEffect: 'slide' as const // 'slide' || 'fade'
};

const slideTo = (index: number) => {
  currentSlide.value = index;
};
</script>
