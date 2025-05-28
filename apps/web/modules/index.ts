import { defineNuxtModule, addComponent, createResolver, extendPages, addImportsDir, addPlugin } from '@nuxt/kit';
import type { NuxtPage, AppConfig } from '@nuxt/schema';

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

    // NavChildren
    await addComponent({
      name: 'NavChildren',
      filePath: resolve('./runtime/components/NavChildren/NavChildren.vue'),
    });

    // customJS
    addPlugin(resolve('./runtime/plugins/customJS'));

    /**
     * override components
     */
    nuxt.hook('components:extend', (components) => {
      // Header
      const Header = components.find((c) => c.pascalName === 'UiHeader');
      if (Header) {
        Header.filePath = resolve('./runtime/components/ui/Header/HeaderCyt.vue');
      }
      // CategoryPageContent
      const CategoryPageContent = components.find((c) => c.pascalName === 'CategoryPageContent');
      if (CategoryPageContent) {
        CategoryPageContent.filePath = resolve('./runtime/components/CategoryPageContent/CategoryPageContentCyt.vue');
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
      // Pagination
      const Pagination = components.find((c) => c.pascalName === 'UiPagination');
      if (Pagination) {
        Pagination.filePath = resolve('./runtime/components/ui/Pagination/PaginationCyt.vue');
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
      // CategorySidebar
      const CategorySidebar = components.find((c) => c.pascalName === 'CategorySidebar');
      if (CategorySidebar) {
        CategorySidebar.filePath = resolve('./runtime/components/CategorySidebar/CategorySidebarCyt.vue');
      }
      // CategorySorting
      const CategorySorting = components.find((c) => c.pascalName === 'CategorySorting');
      if (CategorySorting) {
        CategorySorting.filePath = resolve('./runtime/components/CategorySortings/CategorySortingCyt.vue');
      }
      // CategoryFilters
      const CategoryFilters = components.find((c) => c.pascalName === 'CategoryFilters');
      if (CategoryFilters) {
        CategoryFilters.filePath = resolve('./runtime/components/CategoryFilters/CategoryFiltersCyt.vue');
      }
      // Filter
      const Filter = components.find((c) => c.pascalName === 'CategoryFiltersFilter');
      if (Filter) {
        Filter.filePath = resolve('./runtime/components/CategoryFilters/FilterCyt.vue');
      }
      // WishlistButton
      const WishlistButton = components.find((c) => c.pascalName === 'WishlistButton');
      if (WishlistButton) {
        WishlistButton.filePath = resolve('./runtime/components/WishlistButton/WishlistButtonCyt.vue');
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
        (config.theme.extend.screens as any)['2xl'] = '1440px';
        (config.theme.extend.screens as any)['3xl'] = '1640px';
        (config.theme.extend.screens as any)['4xl'] = '1840px';
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
      console.log(pages);

      // Homepage
      const overrideHomePage = pages.find((p) => p.name === 'index');
      if (overrideHomePage) {
        overrideHomePage.file = resolve('./runtime/pages/homepage/indexCyt.vue');
      }

      // ProductPage
      const overrideProductPage = pages.find((p) => p.name === 'product-slug');
      if (overrideProductPage) {
        overrideProductPage.file = resolve('./runtime/pages/product/[slug]Cyt.vue');
      }

      // CategoryPage
      const overrideCategoryPage = pages.find((p) => p.name === 'slug');
      if (overrideCategoryPage) {
        overrideCategoryPage.file = resolve('./runtime/pages/category/[...slug]Cyt.vue');
      }

      // SearchPage
      const overrideSearchPage = pages.find((p) => p.name === 'search');
      if (overrideSearchPage) {
        overrideSearchPage.file = resolve('./runtime/pages/search/searchCyt.vue');
      }

      // Contentpages -> StoreFinder
      pages.push({
        name: 'store-finder',
        file: resolve('./runtime/pages/contentpages/StoreFinder.vue'),
        path: '/store-finder',
      });
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

    /**
     * Override composables
     */
    nuxt.options.alias['~/composables/defaults'] = resolve(
      __dirname,
      './runtime/composables/defaultsCyt.ts'
    )
  },
});