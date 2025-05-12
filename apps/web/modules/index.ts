import { defineNuxtModule, addComponent, createResolver, extendPages } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';

export default defineNuxtModule({
    async setup(options, nuxt) {
      const {resolve} = createResolver(import.meta.url);
      await addComponent({
        name: 'ModuleTest',
        filePath: resolve('./runtime/components/ModuleTest.vue'),
      });

      nuxt.hook('components:extend', (components) => {
        const Header = components.find((c) => c.pascalName === 'UiHeader');
        if (Header) {
          Header.filePath = resolve('./runtime/components/ui/Header/HeaderCyt.vue');
        }
        const PurchaseCard = components.find((c) => c.pascalName === 'UiPurchaseCard');
        if (PurchaseCard) {
          PurchaseCard.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCardCyt.vue');
        }
        const ProductCard = components.find((c) => c.pascalName === 'UiProductCard');
        if (ProductCard) {
          ProductCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCyt.vue');
        }

        const MegaMenu = components.find((c) => c.pascalName === 'MegaMenu');
        if (MegaMenu) {
          MegaMenu.filePath = resolve('./runtime/components/MegaMenu/MegaMenuCyt.vue');
        }
        const ProductSlider = components.find((c) => c.pascalName === 'ProductSlider');
        if (ProductSlider) {
          ProductSlider.filePath = resolve('./runtime/components/ProductSlider/ProductSliderCyt.vue');
        }
      });

      nuxt.hook('tailwindcss:config', (config) => {
        if (config?.theme?.extend?.colors) {
          (config.theme.extend.colors as any)['primary']['500'] = '#639';
          (config.theme.extend.colors as any)['secondary']['500'] = '#000';
        }
        
        if (config?.theme?.extend?.fontFamily) {
          (config.theme.extend.fontFamily as any).body = ['Inter', 'sans'];
        }
      });

      extendPages((pages: NuxtPage[]) => {
        const overridePage = pages.find((p) => p.name === 'product-slug');
        if (overridePage) {
          overridePage.file = resolve('./runtime/pages/product/[slug]Cyt.vue');
        }
      });
    },
  });