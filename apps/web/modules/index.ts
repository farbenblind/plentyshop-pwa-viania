import { defineNuxtModule, addComponent, createResolver, extendPages, addImportsDir } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';

export default defineNuxtModule({
  async setup(options, nuxt) {
    /**
     * register components
     */
    const {resolve} = createResolver(import.meta.url);

    // BhFinder
    await addComponent({
      name: 'BhFinder',
      filePath: resolve('./runtime/components/BhFinder/BhFinder.vue'),
    });

    // Newsletter
    await addComponent({
      name: 'NewsletterCyt',
      filePath: resolve('./runtime/components/Newsletter/NewsletterCyt.vue'),
    });

    /**
     * override components
     */
    nuxt.hook('components:extend', (components) => {
      // Header
      const Header = components.find((c) => c.pascalName === 'UiHeader');
      if (Header) {
        Header.filePath = resolve('./runtime/components/ui/Header/HeaderCyt.vue');
      }
      // PurchaseCard
      const PurchaseCard = components.find((c) => c.pascalName === 'UiPurchaseCard');
      if (PurchaseCard) {
        PurchaseCard.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCardCyt.vue');
      }
      // ProductCard
      const ProductCard = components.find((c) => c.pascalName === 'UiProductCard');
      if (ProductCard) {
        ProductCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCyt.vue');
      }
      // Footer
      const Footer = components.find((c) => c.pascalName === 'UiFooter');
      if (Footer) {
        Footer.filePath = resolve('./runtime/components/ui/Footer/FooterCyt.vue');
      }

      // MegaMenu
      const MegaMenu = components.find((c) => c.pascalName === 'MegaMenu');
      if (MegaMenu) {
        MegaMenu.filePath = resolve('./runtime/components/MegaMenu/MegaMenuCyt.vue');
      }
      // ProductSlider
      const ProductSlider = components.find((c) => c.pascalName === 'ProductSlider');
      if (ProductSlider) {
        ProductSlider.filePath = resolve('./runtime/components/ProductSlider/ProductSliderCyt.vue');
      }
    });

    /**
     * override tailwindcss config
     */
    nuxt.hook('tailwindcss:config', (config) => {
      // Colors
      if (config?.theme?.extend?.colors) {
        (config.theme.extend.colors as any)['primary']['500'] = '#639';
        (config.theme.extend.colors as any)['secondary']['500'] = '#000';
      }

      // FontFamily
      if (config?.theme?.extend?.fontFamily) {
        (config.theme.extend.fontFamily as any).body = ['Inter', 'sans'];
      }

      // Screens
      if (config?.theme?.extend?.screens) {
        (config.theme.extend.screens as any).xxs = '320px';
        (config.theme.extend.screens as any).xs = '380px';
        (config.theme.extend.screens as any).sm = '640px';
        (config.theme.extend.screens as any).md = '768px';
        (config.theme.extend.screens as any).lg = '1024px';
        (config.theme.extend.screens as any).xl = '1280px';
        (config.theme.extend.screens as any)['2xl'] = '1640px';
        (config.theme.extend.screens as any)['3xl'] = '1792px';
        (config.theme.extend.screens as any)['4xl'] = '1920px';
      }
    });

    /**
     * override layouts
     */
    nuxt.hook('app:resolve', (app) => {
      // default
      app.layouts['default'] = {
        name: 'default',
        file: resolve('./runtime/layouts/defaultCyt.vue'),
      };
    });

    /**
     * override pages
     */
    extendPages((pages: NuxtPage[]) => {
      // Homepage
      const overrideHomePage = pages.find((p) => p.name === 'index');
      if (overrideHomePage) {
        overrideHomePage.file = resolve('./runtime/pages/homepage/indexCyt.vue');
      }

      // CategoryPageContent
      const overrideCategoryPageContent = pages.find((p) => p.name === 'category');
      if (overrideCategoryPageContent) {
        overrideCategoryPageContent.file = resolve('./runtime/components/CategoryPageContent/CategoryPageContentCyt.vue');
      }

      // ProductPage
      const overrideProductPage = pages.find((p) => p.name === 'product-slug');
      if (overrideProductPage) {
        overrideProductPage.file = resolve('./runtime/pages/product/[slug]Cyt.vue');
      }

      // Contentpages -> StoreFinder
      pages.push({
        name: 'store-finder',
        file: resolve('./runtime/pages/contentpages/StoreFinder.vue'),
        path: '/store-finder',
      });

      console.log(pages);
    });

    /**
     * extend i18n
     */
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./runtime/lang'),
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
          {
            code: 'de',
            file: 'de.json',
          },
        ],
      });
    });

    /**
     * add composable imports
     */
    addImportsDir(resolve('./runtime/composables'));
  },
});