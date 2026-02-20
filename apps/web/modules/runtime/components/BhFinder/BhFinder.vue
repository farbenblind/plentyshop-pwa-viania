<template>
<div class="pt-[60px] xl:pt-[80px]">
  <div class="">
    <h3 class="font-bold pt-0 text-center lg:text-left text-[14px] sm:text-[18px]">
      <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">{{ t('BhFinder.title') }}</span>
    </h3>
    <div class="flex flex-col gap-[10px] lg:gap-[20px] font-body lg:flex-row pt-[30px] lg:pt-[40px]">
      <template v-for="facet in facets" :key="facet.id">
        <div v-if="facet && facet.id == 1" :class="selectWrapperClass">
          <SfSelect :key="facet.name" v-model="cup" :placeholder="facet.name" :class="selectClass">
            <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
              {{ name }}
            </option>
          </SfSelect>
        </div>
        <div v-if="facet && facet.id == 2 " :class="selectWrapperClass">
          <SfSelect :key="facet.name" v-model="size" :placeholder="facet.name" :class="selectClass">
            <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
              {{ name }}
            </option>
          </SfSelect>
        </div>
        <div v-if="facet && facet.id == 4" :class="selectWrapperClass">
          <SfSelect :key="facet.name" v-model="cupColor" :placeholder="facet.name" :class="selectClass">
            <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
              {{ name }}
            </option>
          </SfSelect>
        </div>
      </template>
      <div class="w-full lg:w-1/4">
        <UiButton class="w-full xl:min-h-[50px]" @click="findCup()">{{ t('BhFinder.callToAction') }}</UiButton>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { Facet } from '@plentymarkets/shop-api';
import { SfSelect } from '@storefront-ui/vue';

const cup = defineModel('cup', { type: String, default: '' });
const size = defineModel('size', { type: String, default: '' });
const cupColor = defineModel('cupColor', { type: String, default: '' });

const selectWrapperClass = 'w-full lg:w-1/4 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[5px] hover:border-black';
const selectClass = '!ring-0 xl:min-h-[50px]';

const getFacet = async () => {
  try {
    const { data } = await useAsyncData<{ data: Facet }>(() =>
      useSdk().plentysystems.getFacet({
        categoryId: '52',
        categorySlug: "bhs"
      }),
    );
    
    return data.value?.data.facets || [];
  } catch (error) {
    throw new Error(error as string);
  }
};

const facets = await getFacet();

const findCup = () => {
  const facetQuery: Array<string> = [];

  if (cup.value.length > 0) {
    facetQuery.push(cup.value);
  }
  if (size.value.length > 0) {
    facetQuery.push(size.value);
  }
  if (cupColor.value.length > 0) {
    facetQuery.push(cupColor.value);
  }

  if (facetQuery.length === 0) {
    return;
  }
  // Redirect to the BHS page with selected facets
  window.location.assign("/bhs?facets=" + facetQuery.join(','));
}
</script>