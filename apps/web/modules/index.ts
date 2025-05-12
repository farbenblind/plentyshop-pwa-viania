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
        const comp = components.find((c) => c.pascalName === 'UiPurchaseCard');
        if (comp) {
          comp.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCard.vue');
        }
      });
      extendPages((pages: NuxtPage[]) => {
        const overridePage = pages.find((p) => p.name === 'product-slug');
        if (overridePage) {
          overridePage.file = resolve('./runtime/pages/product/[slug].vue');
        }
      });
    },
  });