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

    <!-- Collection Slider -->
    <CollectionSlider />

    <!-- Beliebte Kategorien -->
    <CategoryGrid />

    <!-- Video -->
    <div class="pt-[45px] xl:pt-[60px] 4xl:pt-[120px] mx-[-20px] 3xl:mx-0">
      <h3 class="font-bold pt-0 text-center lg:pl-[20px] 3xl:pl-0 lg:text-left text-[14px] sm:text-[18px]">
          <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">Behind the Scenes</span>
      </h3>
      <div class="pt-[40px] xl:pt-[50px] 3xl:overflow-hidden">
        <video
          class="3xl:rounded-[10px]"
          src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/video/contentseiten/viania.mp4" type="video/mp4"
          poster="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/video/contentseiten/viania-poster.jpg" preload="none" controls>
        </video>
      </div>
    </div>

    <!-- Logo -->
    <!-- removed because looks stupid with the video poster
    <div class="flex justify-center pt-[45px] xl:pt-[60px] 4xl:pt-[120px]">
      <NuxtLink :to="localePath(paths.home)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="259" height="70" viewBox="0 0 259 70"><g><path d="M136.614,13.971c0,2.832-.025,5.416,0,8.016.037,2.972.137,5.943.2,8.912.141,7.481.243,14.961.418,22.44.118,4.971.335,9.941.508,14.912.047,1.355-.119,1.5-1.465,1.531-2.123.042-4.247.106-6.37.166-1.231.035-1.491-.226-1.483-1.42.064-9.02.176-18.041.168-27.061,0-6.981-.119-13.963-.254-20.942-.119-6.041-.336-12.083-.508-18.122,0-.267.014-.538,0-.8-.078-.9.328-1.251,1.239-1.249,2.539,0,5.061-.037,7.591-.074a14.8,14.8,0,0,0,1.917-.1,1.8,1.8,0,0,1,2.051,1.2q13.428,26.55,26.9,53.077c.147.288.307.567.587,1.083,0-1.934.029-3.615,0-5.292-.12-5.61-.278-11.22-.391-16.83-.168-8.279-.3-16.561-.475-24.842-.049-2.269-.2-4.534-.3-6.8-.049-1.129.2-1.381,1.29-1.41C170.356.3,172.48.231,174.6.167c1.416-.045,1.543.139,1.512,1.493q-.105,4.809-.105,9.622c0,9.123-.02,18.248.068,27.371.084,8.616.291,17.23.451,25.846q.038,2.052.131,4.1c.037.8-.314,1.145-1.129,1.16-3.2.049-6.406.109-9.608.2a1.839,1.839,0,0,1-1.863-1.213q-9.5-19.006-19.02-38l-7.854-15.68c-.15-.3-.3-.594-.558-1.1"/><path d="M106.251,48.46H98.076c-3.849,0-7.695.013-11.542-.012a.912.912,0,0,0-1.069.715.862.862,0,0,0-.015.123c-1.52,6.321-3.091,12.63-4.626,18.957-.322,1.325-.514,1.511-1.883,1.523-2.53.019-5.06.052-7.588.077-1.035.01-1.276-.3-1-1.265q9.619-33.348,19.236-66.7C90,.468,90.115.4,91.621.371Q96.677.3,101.735.178c1.326-.029,1.582.143,1.926,1.377q8.035,28.806,16.084,57.61c.853,3.049,1.819,6.068,2.723,9.1.315,1.058.172,1.273-.916,1.31-2.9.1-5.794.193-8.694.253-1.4.031-1.516-.106-1.83-1.437q-2.223-9.442-4.466-18.882c-.076-.319-.195-.631-.311-1.049M87.423,40.747h16.828L95.911,8.556,87.423,40.747"/><path d="M231.894.167c2.149,0,4.316.025,6.471-.012a1.457,1.457,0,0,1,1.64,1.24v0q8.166,29.294,16.376,58.573c.782,2.793,1.661,5.559,2.485,8.341.293.987.139,1.229-.865,1.261-2.966.1-5.931.159-8.9.271a1.415,1.415,0,0,1-1.641-1.137,1.278,1.278,0,0,1-.019-.165c-1.446-6.271-2.981-12.521-4.4-18.8-.247-1.089-.706-1.315-1.749-1.307q-9.111.075-18.225,0a1.086,1.086,0,0,0-1.269.861,1.034,1.034,0,0,0-.016.123c-1.54,6.384-3.126,12.768-4.652,19.151a1.3,1.3,0,0,1-1.4,1.195l-.038,0c-2.664,0-5.329.048-7.994.07-1.027,0-1.234-.291-.941-1.293q7.939-27.275,15.869-54.551c1.172-4.035,2.248-8.094,3.373-12.14C226.4.47,226.528.37,227.948.37H231.9V.176m8.766,40.639-8.275-31.93-.178.037-8.4,31.891Z"/><path d="M24.852,58.722q.612-2.452,1.223-4.9c3.044-12.3,6.13-24.587,9.1-36.9C36.417,11.8,37.427,6.624,38.5,1.466A1.224,1.224,0,0,1,39.826.353l.066.007C42.321.342,44.749.306,47.177.284c1.09,0,1.262.231.977,1.25q-7.7,28.113-15.386,56.24c-.955,3.505-1.807,7.04-2.706,10.56-.334,1.308-.516,1.434-1.856,1.455-2.93.046-5.86.089-8.791.193a1.493,1.493,0,0,1-1.706-1.239c0-.017,0-.034-.007-.051Q10.88,42.668,4.027,16.656,2.074,9.208.1,1.76C-.148.816.026.617,1.058.557,3.916.391,6.778.228,9.632.01c.914-.072,1.4.238,1.563,1.124,2.186,11.978,5.18,23.776,8.083,35.593q2.651,10.781,5.275,21.567c.035.147.078.291.117.436l.182.013"/><path d="M53.9,42.993c0-7.318.074-14.638-.021-21.956-.084-6.308-.36-12.614-.555-18.921C53.278.441,53.342.389,55.04.36,57.8.317,60.569.246,63.333.178c1.194-.029,1.338.1,1.33,1.31-.058,11.258-.195,22.518-.152,33.779.031,8.583.273,17.164.445,25.745.051,2.469.2,4.935.276,7.4.037,1.134-.184,1.322-1.338,1.343q-4.3.085-8.6.193c-1.307.031-1.547-.288-1.5-1.6.087-2.5.123-5.009.128-7.514.018-5.948,0-11.9,0-17.845H53.9"/><path d="M201.083,50.464c.176,6.041.34,12.083.543,18.12.027.84-.324,1.161-1.1,1.161q-4.492.1-9,.193c-1.063.021-1.32-.242-1.317-1.265.051-14.466.172-28.934.116-43.4-.03-7.779-.368-15.553-.567-23.332-.039-1.52.028-1.572,1.563-1.6,2.7-.04,5.394-.1,8.09-.164,1.656-.039,1.684,0,1.67,1.768-.07,9.02-.162,18.039-.195,27.059-.018,5.244.168,21.443.195,21.443"/></g></svg>
      </NuxtLink>
    </div>
    -->

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

//my stuff
const localePath = useLocalePath();
</script>
