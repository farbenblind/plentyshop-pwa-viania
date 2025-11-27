<template>
  <div v-if="attributes.length > 0" data-testid="product-attributes" class="flex flex-col gap-[20px] pt-[30px]">
    <template v-for="(attribute, index) in attributes" :key="index">
      <Component
        :is="componentsMapper[productAttributeGetters.getAttributeType(attribute)]"
        v-if="componentsMapper[productAttributeGetters.getAttributeType(attribute)]"
        :attribute="attribute"
      />
    </template>

    <div class="flex flex-col gap-[5px] text-[12px] xl:text-[14px] 2xl:grid 2xl:grid-cols-[1fr_auto] xl:gap-[10px]">
      <span>{{ t('Product.sizetable') }}</span>
      <a class="flex items-center gap-[5px]" :href="t('Product.sizetableLink')" target="_blank">
        <svg class="w-[18px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 21"><g transform="translate(-661.5 -1069)"><g transform="translate(-1162 173)"><g transform="translate(932 -1099)"><g transform="translate(891.5 1995)"><path d="M9.2-.5a13.585,13.585,0,0,1,6.758,1.646c1.9,1.11,2.942,2.616,2.942,4.239s-1.045,3.129-2.942,4.239A13.585,13.585,0,0,1,9.2,11.27,13.585,13.585,0,0,1,2.442,9.624C.545,8.514-.5,7.008-.5,5.385S.545,2.256,2.442,1.146A13.585,13.585,0,0,1,9.2-.5Zm0,10.77a12.578,12.578,0,0,0,6.253-1.509C17.031,7.838,17.9,6.639,17.9,5.385s-.869-2.453-2.447-3.376A12.578,12.578,0,0,0,9.2.5,12.578,12.578,0,0,0,2.947,2.009C1.369,2.932.5,4.131.5,5.385s.869,2.453,2.447,3.376A12.578,12.578,0,0,0,9.2,10.27Z" transform="translate(0.5 0.5)" fill="#1d1d1b"/><path d="M4.6-.5A7.93,7.93,0,0,1,8.077.229,2.471,2.471,0,0,1,9.7,2.308,2.471,2.471,0,0,1,8.077,4.387,7.93,7.93,0,0,1,4.6,5.116a7.93,7.93,0,0,1-3.477-.729A2.471,2.471,0,0,1-.5,2.308,2.471,2.471,0,0,1,1.123.229,7.93,7.93,0,0,1,4.6-.5Zm0,4.616c2.416,0,4.1-.953,4.1-1.808S7.016.5,4.6.5.5,1.453.5,2.308,2.184,4.116,4.6,4.116Z" transform="translate(5.1 3.577)" fill="#1d1d1b"/><path d="M9.7,21a13.585,13.585,0,0,1-6.758-1.646C1.045,18.244,0,16.738,0,15.115a.5.5,0,1,1,1,0c0,1.253.869,2.453,2.447,3.376A12.578,12.578,0,0,0,9.7,20a.5.5,0,1,1,0,1Z" fill="#1d1d1b"/><path d="M0,9.731a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V9.231A.5.5,0,0,1,0,9.731Z" transform="translate(0.5 5.884)" fill="#1d1d1b"/><path d="M0,5.885a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V5.385A.5.5,0,0,1,0,5.885Z" transform="translate(18.9 5.884)" fill="#1d1d1b"/><path d="M22.5,21H9.7a.5.5,0,0,1,0-1H22V11.769H9.7a.5.5,0,0,1,0-1H22.5a.5.5,0,0,1,.5.5V20.5A.5.5,0,0,1,22.5,21Z" fill="#1d1d1b"/><path d="M.5,4h-1V0h1Z" transform="translate(18.9 11)" fill="#1d1d1b"/><path d="M.5,4h-1V0h1Z" transform="translate(8.9 11)" fill="#1d1d1b"/><path d="M.5,3h-1V0h1Z" transform="translate(3.9 10)" fill="#1d1d1b"/><path d="M.5,4h-1V0h1Z" transform="translate(13.9 11)" fill="#1d1d1b"/></g></g></g></g></svg>
        <span class="underline">{{ t('Product.sizetable2') }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductAttributesProps, ComponentsMapper } from './types';
import AttributeDropdown from '../../../../app/components/ProductAttributes/AttributeDropdown/AttributeDropdown.vue';
import AttributeBox from './AttributeBox/AttributeBoxCyt.vue';
import AttributeImage from '../../../../app/components/ProductAttributes/AttributeImage/AttributeImage.vue';
import { productAttributeGetters } from '@plentymarkets/shop-api';

const componentsMapper: ComponentsMapper = {
  dropdown: AttributeDropdown,
  box: AttributeBox,
  image: AttributeImage,
};

const { attributes, setAttribute } = useProductAttributes();
const props = defineProps<ProductAttributesProps>();
const product = computed(() => props.product);
const route = useRoute();

const lastSegment = route.path.split('/').pop() ?? '';
const selectAttributes = ref(lastSegment.split('_').length > 2);

watch(
  selectAttributes,
  () => {
    setAttribute(product.value, selectAttributes.value);
  },
  { immediate: true },
);
watch(
  product,
  (newProduct) => {
    setAttribute(newProduct, selectAttributes.value);
  },
  { immediate: false },
);
</script>
