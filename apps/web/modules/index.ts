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
        const comp1 = components.find((c) => c.pascalName === 'UiPurchaseCard');
        if (comp1) {
          comp1.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCardCyt.vue');
        }
        const comp2 = components.find((c) => c.pascalName === 'MegaMenu');
        if (comp2) {
          comp2.filePath = resolve('./runtime/components/MegaMenu/MegaMenuCyt.vue');
        }
        const comp3 = components.find((c) => c.pascalName === 'ProductSlider');
        if (comp3) {
          comp3.filePath = resolve('./runtime/components/ProductSlider/ProductSliderCyt.vue');
        }
        const comp4 = components.find((c) => c.pascalName === 'UiProductCard');
        if (comp4) {
          comp4.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCyt.vue');
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