<template>
  <div class="w-full max-w-screen-3xl mx-auto px-[20px] relative">
    <!-- Banner Slider-->
    <BannerSlider />

    <!-- Shipping Info -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-[20px] pt-[45px] xl:pt-[60px]">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="31" viewBox="0 0 51 31"><defs><clipPath id="a"><rect width="51" height="31" fill="none" stroke="#000" stroke-width="1"/></clipPath></defs><g transform="translate(0 0)"><path d="M35.5,0a.5.5,0,0,1,.239.061l15,8.182a.5.5,0,0,1,0,.878l-15,8.182a.5.5,0,0,1-.479,0l-15-8.182a.5.5,0,0,1,0-.878l15-8.182A.5.5,0,0,1,35.5,0ZM49.456,8.682,35.5,1.069,21.544,8.682,35.5,16.294Z"/><path d="M35.5,31a.5.5,0,0,1-.239-.061l-15-8.182A.5.5,0,0,1,20,22.318V8.682a.5.5,0,0,1,1,0V22.021L35.5,29.93,50,22.021V8.682a.5.5,0,0,1,1,0V22.318a.5.5,0,0,1-.261.439l-15,8.182A.5.5,0,0,1,35.5,31Z"/><path d="M0,14.136a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V13.636A.5.5,0,0,1,0,14.136Z" transform="translate(35.5 16.864)"/><path d="M15,8.682a.5.5,0,0,1-.239-.061L-.239.439a.5.5,0,0,1-.2-.678.5.5,0,0,1,.678-.2l15,8.182a.5.5,0,0,1-.24.939Z" transform="translate(28 4.591)"/><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(6.5 4.443)"/><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(3.5 22.443)"/><g clip-path="url(#a)"><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(0.5 14.443)"/></g></g></svg>
      <p class="text-center text-[14px] sm:text-[18px]"><span class="font-semibold">Versand erfolgt am gleichen Tag mit DHL</span> (bei Bestellungen werktags bis 14 Uhr)</p>
    </div>

    <!-- BH-Finder -->
    <BhFinder />
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
</script>
