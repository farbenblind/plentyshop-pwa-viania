<template>
  <div>
    <!-- <EditablePage :identifier="'index'" :type="'immutable'" /> -->
    <div class="w-full max-w-screen-3xl mx-auto 3xl:px-[20px] relative">

        <Carousel class="3xl:overflow-hidden 3xl:rounded-[10px]"
          ref="carousel"
          :items-to-show="1"
          :wrap-around="true"
          v-model="currentSlide">

          <!-- slide 1 -->
          <Slide>
            <NuxtLink to="#" class="w-full h-0 pb-[150%] md:pb-[50%] relative">
              <NuxtImg v-if="viewport.isLessOrEquals('sm')"
                :class="carouselImgClasses"
                loading="eager"
                src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/pwa/banner/banner1-sm.jpg"
              />
              <NuxtImg v-else
                :class="carouselImgClasses"
                loading="eager"
                src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/pwa/banner/banner1-lg.jpg"
              />
            </NuxtLink>
          </Slide>

          <!-- slide 2 -->

          <Slide>
              <NuxtLink to="#" :class="carouselLinkClasses">
                <NuxtImg v-if="viewport.isLessOrEquals('sm')"
                  :class="carouselImgClasses"
                  loading="eager"
                  src="https://placehold.co/800x1200/eee/fff?text=sm"
                />
                <NuxtImg v-else
                  :class="carouselImgClasses"
                  loading="eager"
                  src="https://placehold.co/2400x1200/eee/fff?text=lg"
                />
              </NuxtLink>
          </Slide>

          <!-- slide 3 -->
          <Slide>
              <NuxtLink to="#" :class="carouselLinkClasses">
                <NuxtImg v-if="viewport.isLessOrEquals('sm')"
                  :class="carouselImgClasses"
                  loading="eager"
                  src="https://placehold.co/800x1200/eee/fff?text=sm"
                />
                <NuxtImg v-else
                  :class="carouselImgClasses"
                  loading="eager"
                  src="https://placehold.co/2400x1200/eee/fff?text=lg"
                />
              </NuxtLink>
          </Slide>
        </Carousel>

        <!-- custom pagination -->
        <div class="flex justify-center gap-2 pt-[20px] md:pt-[40px]">
          <button
            v-for="(slide, index) in 3"
            :key="index"
            @click="slideTo(index)"
            :class="[
              'h-[2px] md:h-[3px] rounded-full transition-all duration-[500ms]',
              currentSlide === index 
                ? 'bg-black w-[30px] md:w-[40px]'
                : 'w-[20px] md:w-[30px] bg-[#E5E5E5] hover:bg-black'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>

        <!-- custom arrows -->
        <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.prev()" class="absolute z-10 left-4 4xl:left-[-60px] top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></svg>
        </button>
        <button v-if="viewport.isGreaterOrEquals('md')" @click="carousel?.next()" class="absolute z-10 right-4 4xl:right-[-60px] top-1/2 -translate-y-1/2 rotate-180 p-4 hover:opacity-50 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></svg>
        </button>

    </div>
    <BhFinder />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CarouselExposed } from 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
const viewport = useViewport();

const carousel = ref<CarouselExposed>();
const currentSlide = ref(0);

const carouselLinkClasses = 'w-full h-0 pb-[150%] md:pb-[50%] relative';
const carouselImgClasses = 'absolute top-0 left-0 w-full h-full 3xl:rounded-[10px]';

const slideTo = (index: number) => {
  currentSlide.value = index;
};

definePageMeta({
  pageType: 'static',
  isBlockified: true,
  type: 'immutable',
  identifier: 'index',
  middleware: ['newsletter-confirmation-client'],
});

const { $i18n } = useNuxtApp();

const { setPageMeta } = usePageMeta();
const route = useRoute();
const { setDefaultTemplate } = useCategoryTemplate(
  route?.meta?.identifier as string,
  route.meta.type as string,
  useNuxtApp().$i18n.locale.value,
);

const icon = 'home';
setPageMeta(t('homepage.title'), icon);

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');

const { setBlocksListContext } = useBlocksList();
setBlocksListContext('content');
</script>
