<template>
    <ul>
        <li v-for="(category, index) in categoryTree" :key="category.id">
            <NuxtLink :to="localePath(generateCategoryLink(category))">{{ category.details[0].name }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { data: categoryTree } = useCategoryTree();
const { getCategoryName, getCategoryId } = useCategoryIdHelper();
const { buildCategoryMenuLink } = useLocalization();

const generateCategoryLink = (category: CategoryTreeItem) => {
    return buildCategoryMenuLink(category, categoryTree.value);
};
console.log(getCategoryId.value)
console.log(getCategoryName.value)
</script>
