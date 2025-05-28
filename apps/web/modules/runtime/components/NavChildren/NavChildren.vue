<template>
    <ul class="flex scroll-smooth overflow-x-scroll scrollbar-hidden gap-[10px] ml-[-20px] pl-[20px] mr-[-20px] pr-[20px] pt-[15px] lg:pt-[20px] xl:pt-[40px] xl:flex-wrap xl:overflow-x-auto xl:gap-[20px]">
        <template v-for="(category) in categoryTree" :key="category.id">
            <template v-if="category.id === currentCategoryId && category.childCount > 0">
                <li v-for="childCategory in category.children" :key="childCategory.id">
                    <NuxtLink :to="localePath(generateCategoryLink(childCategory))" class="flex bg-white rounded-[5px] whitespace-nowrap h-[40px] xl:h-[50px] items-center px-[20px] text-[14px] xl:text-[16px]">{{ childCategory.details[0].name }}</NuxtLink>
                </li>
            </template>
            <template v-else-if="category.id === parentCategoryId && !!category.childCount">
                <li v-for="childCategory in category.children" :key="childCategory.id" :class="{'order-first': childCategory.id === currentCategoryId}">
                    <NuxtLink :to="localePath(generateCategoryLink(childCategory))" :class="{'!bg-black text-white': childCategory.id === currentCategoryId}" class="flex bg-white rounded-[5px] whitespace-nowrap h-[40px] xl:h-[50px] items-center px-[20px] text-[14px] xl:text-[16px]">{{ childCategory.details[0].name }}</NuxtLink>
                </li>
            </template>
        </template>
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

const generateCategoryLink = (category: CategoryTreeItem) => {
    return buildCategoryMenuLink(category, categoryTree.value);
};

const currentCategoryId = computed(() => {
    return productsCatalog.value.category?.id;
});

const parentCategoryId = computed(() => {
    return productsCatalog.value.category?.parentCategoryId;
});
</script>
