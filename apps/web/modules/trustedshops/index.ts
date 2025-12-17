import { defineNuxtModule, createResolver, addServerHandler, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'trustedshops',
    configKey: 'trustedshops',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add server API route - ADD .ts extension
    addServerHandler({
      route: '/api/trustedshops-ratings',
      handler: resolver.resolve('./runtime/server/api/trustedshops-ratings.ts'),
    })
  },
})