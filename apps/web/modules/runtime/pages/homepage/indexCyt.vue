<template>
  <div class="w-full max-w-screen-3xl mx-auto px-[20px] relative">
    <!-- Banner Slider-->
    <BannerSlider />

    <!-- Shipping Info Fader -->
    <UspSliderCyt />

    <!-- Recommended Products -->
    <RecommendedProducts categoryId="52" cacheKey="homepage" title="Unsere Topseller BHs" class="pt-[45px] xl:pt-[60px] 4xl:pt-[80px]" />

    <!-- BH-Finder -->
    <BhFinder />

    <!-- Collection Slider -->
    <CollectionSlider />

    <!-- Trusted Shops -->
    <TrustedShops />

    <!-- Beliebte Kategorien -->
    <CategoryGrid />

    <!-- Video -->
    <div class="pt-[45px] xl:pt-[60px] 4xl:pt-[120px] mx-[-20px] 3xl:mx-0">
      <h3 class="font-bold pt-0 text-center lg:pl-[20px] 3xl:pl-0 lg:text-left text-[14px] sm:text-[18px]">
          <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">Behind the Scenes</span>
      </h3>
      <div class="pt-[40px] xl:pt-[50px] 3xl:overflow-hidden">
        <video
          ref="videoRef"
          class="3xl:rounded-[10px]"
          src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/video/contentseiten/viania.mp4" 
          type="video/mp4"
          poster="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/video/contentseiten/viania-poster.jpg" 
          preload="metadata"
          muted
          loop
          playsinline>
        </video>
      </div>
    </div>

    <!-- Seo Stuff -->
    <SeoTextHome />
  </div>
</template>

<script lang="ts" setup>
import type { Block } from '@plentymarkets/shop-api';
import homepageTemplateDataDe from '~/composables/useCategoryTemplate/homepageTemplateDataDe.json';
import homepageTemplateDataEn from '~/composables/useCategoryTemplate/homepageTemplateDataEn.json';

definePageMeta({
  pageType: 'static',
  isBlockified: true,
  type: 'immutable',
  identifier: 'index',
  middleware: ['newsletter-confirmation-client'],
});

const useLocaleSpecificHomepageTemplate = (locale: string) =>
  locale === 'de' ? (homepageTemplateDataDe as Block[]) : (homepageTemplateDataEn as Block[]);

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

setDefaultTemplate(useLocaleSpecificHomepageTemplate($i18n.locale.value));

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');

const { setBlocksListContext } = useBlocksList();
setBlocksListContext('content');

const localePath = useLocalePath();

// Video autoplay when visible
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (!videoRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.value?.play().catch(() => {
            // Autoplay was prevented, user needs to interact first
          });
        } else {
          videoRef.value?.pause();
        }
      });
    },
    {
      threshold: 0.5, // Video muss zu 50% sichtbar sein
    }
  );

  observer.observe(videoRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>