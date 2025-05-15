import { defineNuxtModule, addComponent, createResolver, extendPages } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';

export default defineNuxtModule({
    async setup(options, nuxt) {
      const {resolve} = createResolver(import.meta.url);
      await addComponent({
        name: 'BhFinder',
        filePath: resolve('./runtime/components/BhFinder.vue'),
      });
      await addComponent({
        name: 'Newsletter',
        filePath: resolve('./runtime/components/Newsletter.vue'),
      });
      nuxt.hook('components:extend', (components) => {
        const comp = components.find((c) => c.pascalName === 'UiPurchaseCard');
        if (comp) {
          comp.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCard.vue');
        }
      });
      extendPages((pages: NuxtPage[]) => {
            pages.push({
                name: 'ihab',
                file: resolve('./runtime/pages/ihab.vue'),
                path: '/ihab',
            });
        });
      extendPages((pages: NuxtPage[]) => {
        const overridePage = pages.find((p) => p.name === 'product-slug');
        if (overridePage) {
          overridePage.file = resolve('./runtime/pages/product/[slug].vue');
        }
      });
    },
  });