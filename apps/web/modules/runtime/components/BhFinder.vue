<template>
    <div class="group max-w-screen-3xl mx-auto lg:px-10 px-4 md:px-6 my-5">
      <div class="bg-secondary-500 px-10 pt-4 pb-8">
        <h3 class="font-bold mb-4 pt-0">Finde deinen BH</h3>
        <div class="flex flex-row gap-4 font-body">
          <template v-for="facet in facets" :key="facet.id">
            <div v-if="facet && facet.id == 1" class="w-1/4">
              <SfSelect :key="facet.name" v-model="cup" :placeholder="facet.name">
                <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
                  {{ name }}
                </option>
              </SfSelect>
            </div>
            <div v-if="facet && facet.id == 2 " class="w-1/4">
              <SfSelect :key="facet.name" v-model="size" :placeholder="facet.name">
                <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
                  {{ name }}
                </option>
              </SfSelect>
            </div>
            <div v-if="facet && facet.id == 4" class="w-1/4">
              <SfSelect :key="facet.name" v-model="cupColor" :placeholder="facet.name">
                <option v-for="{ id, name } in facet.values" :key="id" :value="id + ''">
                  {{ name }}
                </option>
              </SfSelect>
            </div>
          </template>
          <div class="w-1/4">
            <UiButton class="w-full" @click="findCup()">Finden</UiButton>
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