import { defineNuxtModule, addComponent, createResolver, extendPages, addImportsDir, addPlugin } from '@nuxt/kit';
import type { NuxtPage, AppConfig } from '@nuxt/schema';
import tailwindPlugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

export default defineNuxtModule({
  async setup(options, nuxt) {
    /**
     * Some inline JS before Nuxt app loads (for 1- or 2-column layout)
     */
    nuxt.options.app.head ||= {}
    nuxt.options.app.head.script ||= []

    nuxt.options.app.head.script.push({
      type: 'text/javascript',
      innerHTML: `
        (function() {
          try {
            if (localStorage.getItem('singleColumn')) {
              document.documentElement.classList.add('single-column');
            }
          } catch (e) {
            // localStorage might be disabled, ignore error 
          }
        })();
        (function(){
          const breakpoints = {
            xxs:320, xs:380, sm:640, md:768, lg:1024, xl:1280, '2xl':1440, '3xl':1640, '4xl':1840
          };
          const width = window.innerWidth;
          let bp = 'xxs';
          for (const key of Object.keys(breakpoints).reverse()) {
            if (width >= breakpoints[key]) { bp = key; break; }
          }
          // store in global window and data-attribute
          window.__INITIAL_WIDTH__ = width;
          window.__INITIAL_BREAKPOINT__ = bp;
          document.documentElement.dataset.viewport = bp;
        })();

        const initialBreakpoint = document.documentElement.dataset.viewport;
        console.log('Initial breakpoint:', initialBreakpoint);
      `,
    });

    // Add custom fonts
    nuxt.options.app.head = nuxt.options.app.head || {};
    nuxt.options.app.head.link = nuxt.options.app.head.link || [];
    nuxt.options.app.head.link.push(
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Libre+Bodoni:ital,wght@0,400..700;1,400..700&display=swap'
      }
    );

    /**
     * register components
     */
    const {resolve} = createResolver(import.meta.url);

    const components = [
      {
        name: 'BhFinder',
        path: 'BhFinder/BhFinder.vue',
        global: false,
      },
      {
        name: 'BannerSlider',
        path: 'BannerSlider/BannerSlider.vue',
        global: false,
      },
      {
        name: 'CollectionSlider',
        path: 'CollectionSlider/CollectionSlider.vue',
        global: false,
      },
      {
        name: 'CategoryGrid',
        path: 'CategoryGrid/CategoryGrid.vue',
        global: false,
      },
      {
        name: 'TrustedShops',
        path: 'TrustedShops/TrustedShops.vue',
        global: false,
      },
      {
        name: 'SeoTextHome',
        path: 'SeoTextHome/SeoTextHome.vue',
        global: false,
      },
      {
        name: 'NewsletterCyt',
        path: 'Newsletter/NewsletterCyt.vue',
        global: true,
      },
      {
        name: 'NavChildren',
        path: 'NavChildren/NavChildren.vue',
        global: true,
      },
      {
        name: 'SelectedFilters',
        path: 'Filter/SelectedFilters.vue',
        global: false,
      },
      {
        name: 'SelectedFilter',
        path: 'Filter/SelectedFilter.vue',
        global: false,
      },
      {
        name: 'CrossSellingItemsSimilarCyt',
        path: 'CrossSelling/CrossSellingItemsSimilarCyt.vue',
        global: false,
      },
    ];

    for (const { name, path, global } of components) {
      await addComponent({
        name,
        filePath: resolve(`./runtime/components/${path}`),
        ...(global === false ? { global: false } : {}),
      });
    }


    // customJS (not needed at the moment)
    // addPlugin(resolve('./runtime/plugins/customJS'));

    /**
     * override components
     */
    nuxt.hook('components:extend', (components) => {
      // Header
      const Header = components.find((c) => c.pascalName === 'UiHeader');
      if (Header) {
        Header.filePath = resolve('./runtime/components/ui/Header/HeaderCyt.vue');
      }
      // SimplifiedHeader
      const SimplifiedHeader = components.find((c) => c.pascalName === 'UiSimplifiedHeader');
      if (SimplifiedHeader) {
        SimplifiedHeader.filePath = resolve('./runtime/components/ui/SimplifiedHeaderCyt.vue');
      }
      // Button
      const Button = components.find((c) => c.pascalName === 'UiButton');
      if (Button) {
        Button.filePath = resolve('./runtime/components/ui/Button/ButtonCyt.vue');
      }
      // CategoryPageContent
      const CategoryPageContent = components.find((c) => c.pascalName === 'CategoryPageContent');
      if (CategoryPageContent) {
        CategoryPageContent.filePath = resolve('./runtime/components/CategoryPageContent/CategoryPageContentCyt.vue');
      }
      // NarrowContainer
      const NarrowContainer = components.find((c) => c.pascalName === 'NarrowContainer');
      if (NarrowContainer) {
        NarrowContainer.filePath = resolve('./runtime/components/NarrowContainer/NarrowContainerCyt.vue');
      }
      // Gallery
      const Gallery = components.find((c) => c.pascalName === 'Gallery');
      if (Gallery) {
        Gallery.filePath = resolve('./runtime/components/Gallery/GalleryCyt.vue');
      }
      // ZoomableImage
      const ZoomableImage = components.find((c) => c.pascalName === 'ZoomableImage');
      if (ZoomableImage) {
        ZoomableImage.filePath = resolve('./runtime/components/ZoomableImage/ZoomableImageCyt.vue');
      }
      // Drift
      const Drift = components.find((c) => c.pascalName === 'Drift');
      if (Drift) {
        Drift.filePath = resolve('./runtime/components/Drift/DriftCyt.vue');
      }
      // PurchaseCard
      const PurchaseCard = components.find((c) => c.pascalName === 'UiPurchaseCard');
      if (PurchaseCard) {
        PurchaseCard.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCardCyt.vue');
      }
      // Price
      const Price = components.find((c) => c.pascalName === 'Price');
      if (Price) {
        Price.filePath = resolve('./runtime/components/Price/PriceCyt.vue');
      }
      // ProductCard
      const ProductCard = components.find((c) => c.pascalName === 'UiProductCard');
      if (ProductCard) {
        ProductCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCyt.vue');
      }
      // ProductAttributes
      const ProductAttributes = components.find((c) => c.pascalName === 'ProductAttributes');
      if (ProductAttributes) {
        ProductAttributes.filePath = resolve('./runtime/components/ProductAttributes/ProductAttributesCyt.vue');
      }
      // AttributeBox
      const AttributeBox = components.find((c) => c.pascalName === 'AttributeBox');
      if (AttributeBox) {
        AttributeBox.filePath = resolve('./runtime/components/ProductAttributes/AttributeBox/AttributeBoxCyt.vue');
      }
      // AttributeImage
      const AttributeImage = components.find((c) => c.pascalName === 'AttributeImage');
      if (AttributeImage) {
        AttributeImage.filePath = resolve('./runtime/components/ProductAttributes/AttributeImage/AttributeImageCyt.vue');
      }
      // QuantitySelector
      const QuantitySelector = components.find((c) => c.pascalName === 'UiQuantitySelector');
      if (QuantitySelector) {
        QuantitySelector.filePath = resolve('./runtime/components/ui/QuantitySelector/QuantitySelectorCyt.vue');
      }
      // ReviewsAccordion
      const ReviewsAccordion = components.find((c) => c.pascalName === 'ReviewsAccordion');
      if (ReviewsAccordion) {
        ReviewsAccordion.filePath = resolve('./runtime/components/ReviewsAccordion/ReviewsAccordionCyt.vue');
      }
      // ReviewStatistics
      const ReviewStatistics = components.find((c) => c.pascalName === 'UiReviewStatistics');
      if (ReviewStatistics) {
        ReviewStatistics.filePath = resolve('./runtime/components/ui/ReviewStatistics/ReviewStatisticsCyt.vue');
      }
      // Review
      const Review = components.find((c) => c.pascalName === 'UiReview');
      if (Review) {
        Review.filePath = resolve('./runtime/components/ui/Review/ReviewCyt.vue');
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
      // WishlistPageContent
      const WishlistPageContent = components.find((c) => c.pascalName === 'WishlistPageContent');
      if (WishlistPageContent) {
        WishlistPageContent.filePath = resolve('./runtime/components/WishlistPageContent/WishlistPageContentCyt.vue');
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
      if (config?.theme?.extend) {
        // Set Inter as the default font
        config.theme.extend.fontFamily = {
          ...config.theme.extend.fontFamily,
          sans: ['Inter', ...defaultTheme.fontFamily.sans],
          body: ['Inter', ...defaultTheme.fontFamily.sans],
        };
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
      // auth
      app.layouts['auth'] = {
        name: 'auth',
        file: resolve('./runtime/layouts/authCyt.vue'),
      };
      // simplifiedHeaderAndFooter
      app.layouts['simplified-header-and-footer'] = {
        name: 'simplified-header-and-footer',
        file: resolve('./runtime/layouts/simplifiedHeaderAndFooterCyt.vue'),
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

      // Contentpages
      const customPages = [
        { name: 'careInstructions', file: 'WaschAnleitung.vue', path: '/waschanleitung' },
        { name: 'aboutUs', file: 'AboutUs.vue', path: '/ueber-uns' },
      ];
      customPages.forEach(({ name, file, path }) => {
        pages.push({
          name,
          file: resolve(`./runtime/pages/contentpages/${file}`),
          path,
        });
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