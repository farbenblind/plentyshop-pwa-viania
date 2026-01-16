<template>
  <NarrowContainer class="max-w-screen-3xl mx-auto p-[20px] pt-0" data-testid="wishlist-layout">
    <h1 class="relative left-[calc(-1*(100vw-100%)/2)] w-screen bg-[#F5EFEF] leading-none">
      <span
        v-if="!loading"
        class="block max-w-screen-3xl mx-auto p-[20px] sm:py-[40px] xl:py-[50px] font-semibold text-[18px] sm:text-[20px] xl:text-[26px] 2xl:text-[36px]"
      >
        {{ products.length > 0 ? t('Header.Merkliste') + ' (' + products.length + ')' : t('Header.Merkliste') }}
      </span>
    </h1>

    <div
      v-if="products.length > 0"
      class="pt-[20px] sm:pt-[40px] xl:pt-[60px] 2xl:pt-[80px]"
      :class="{ 'pointer-events-none opacity-50': loading }"
      data-testid="wishlist-page-content"
    >
      <SfLoaderCircular v-if="loading" class="absolute left-0 right-0 top-1/3 mx-auto z-[99999]" size="2xl" />
      <section
        class="grid grid-cols-1 sm:grid-col-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        data-testid="wishlist-grid"
      >
        <NuxtLazyHydrate v-for="(product, index) in products" :key="productGetters.getId(product)" when-visible>
          <UiProductCard :product="product" is-from-wishlist :index="index">
            <template #wishlistButton>
              <WishlistButton discard 
                class="flex w-full items-center justify-center gap-[3px] lg:min-h-[40px] lg:mt-[20px] rounded-[5px] text-[12px] sm:text-[14px] border border-[#E5E5E5] p-[5px] after:content-[attr(data-title)] [&_svg]:hidden before:content-['+'] before:text-[16px] sm:before:text-[20px] before:rotate-45 hover:text-white hover:bg-black hover:border-black"
                :data-title="viewport.isGreaterOrEquals('lg') ? t('common.actions.removeFromWishlist') : t('coupon.remove')"
                :product="product"
              />
            </template>
          </UiProductCard>
        </NuxtLazyHydrate>
      </section>
    </div>

    <div
      v-else
      class="flex items-center justify-center flex-col py-24"
      :class="{ 'pointer-events-none opacity-50': loading }"
      data-testid="wishlist-page-content"
    >
      <SfLoaderCircular v-if="loading" class="absolute z-[99999]" size="2xl" />
      <h2 v-if="!loading" data-testid="empty-wishlist-text" class="typography-headline-3 font-bold">
        {{ t('cart.emptyWishlist') }}
      </h2>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular, SfLink } from '@storefront-ui/vue';
import type { WishlistPageContentProps } from '~/components/WishlistPageContent/types';
import { paths } from '~/utils/paths';

const { showNetPrices } = useCart();
const localePath = useLocalePath();

const viewport = useViewport();

const { withHeader = true } = defineProps<WishlistPageContentProps>();
const { fetchWishlist, data: products, loading } = useWishlist();

fetchWishlist();
</script>
