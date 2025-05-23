<template>
    <ul class="flex">
        <template v-for="(category) in categoryTree" :key="category.id">
            <template v-if="category.id === currentCategoryId && category.childCount > 0">
                <li v-for="childCategory in category.children" :key="childCategory.id" class="bg-white p-3 mr-2 mt-3 border">
                    <NuxtLink :to="localePath(generateCategoryLink(childCategory))">{{ childCategory.details[0].name }}</NuxtLink>
                </li>
            </template>
        </template>
        
    </ul>
</template>

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


</script>
