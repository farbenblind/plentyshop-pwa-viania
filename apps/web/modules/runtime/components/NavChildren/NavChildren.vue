<template>
    <ul class="flex scroll-smooth overflow-x-scroll scrollbar-hidden gap-[10px] ml-[-20px] pl-[20px] mr-[-20px] pr-[20px] pt-[15px] lg:pt-[20px] xl:pt-[40px] xl:flex-wrap xl:overflow-x-auto xl:gap-[20px]">
      <li
        v-for="childCategory in visibleChildren"
        :key="childCategory.id"
        :class="{
          'order-first': childCategory.id === currentCategoryId
        }"
      >
        <NuxtLink
          :to="localePath(generateCategoryLink(childCategory))"
          class="flex bg-white rounded-[5px] whitespace-nowrap h-[40px] xl:h-[50px] items-center px-[20px] text-[14px] xl:text-[16px]"
          :class="{
            '!bg-black text-white': childCategory.id === currentCategoryId
          }"
        >
          {{ childCategory.details?.[0]?.name || '' }}
        </NuxtLink>
      </li>
    </ul>
  </template>

<style scoped>
    ul {
        &:empty {
            display: none;
        }

        a {
            &:hover {
                background-color: black;
                color: white;
            }
        }
    }
</style>

<script setup lang="ts">
const localePath = useLocalePath();
const { data: categoryTree } = useCategoryTree();
const { data: productsCatalog } = useProducts();
const { buildCategoryMenuLink } = useLocalization();

const currentCategoryId = computed(() => productsCatalog.value.category?.id);
const parentCategoryId = computed(() => productsCatalog.value.category?.parentCategoryId);

// Pre-filter the relevant category and its children
const visibleChildren = computed(() => {
  const categories = categoryTree.value || [];
  const targetCategory = categories.find(
    (cat) =>
      cat.id === currentCategoryId.value || cat.id === parentCategoryId.value
  );
  return targetCategory?.children ?? [];
});

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};
</script>
