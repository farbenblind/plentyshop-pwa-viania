<template>
  <div>
    <label
      :for="'attribute-' + productAttributeGetters.getAttributeId(attribute)"
      class="block leading-[1] text-[12px] font-semibold xl:text-[14px]"
    >
      <span>{{ productAttributeGetters.getAttributeName(attribute) }}</span>
      <span v-if="value">: {{ selectedAttributeValueName }}</span>
    </label>
    <div :id="'attribute-' + productAttributeGetters.getAttributeId(attribute)" class="flex gap-[10px] flex-wrap pt-[10px]">
      <SfTooltip
        v-for="item in productAttributeGetters.getAttributeValues(attribute)"
        :key="productAttributeGetters.getAttributeValueId(item)"
        :label="getLabel(item)"
        strategy="absolute"
        :show-arrow="true"
        placement="top"
      >
        <div
          class="h-0 pb-[38px] min-w-[40px] border border-zinc-300 rounded-[5px] cursor-pointer bg-white hover:border-primary-500 relative"
          :class="{
            'text-zinc-300 border-dashed': productAttributeGetters.isAttributeValueDisabled(item),
            '!border-primary-500 bg-zinc-100': value === productAttributeGetters.getAttributeValueId(item),
            '!ring-negative-700 !border-negative-700 ring-1': Boolean(errors['selectedValue']),
          }"
          @click="doUpdateValue(item)"
        >
          <span class="img absolute inset-[2px]">
            <NuxtImg
              class="rounded-[3px] w-full h-full object-cover text-white"
              :src="getImagePath(item)"
              :alt="productAttributeGetters.getAttributeValueName(item)"
              loading="lazy"
            />
          </span>
        </div>
      </SfTooltip>
    </div>
    <ErrorMessage as="span" name="selectedValue" class="flex text-negative-700 text-sm mt-2" />
  </div>
</template>

<script setup lang="ts">
import { SfTooltip } from '@storefront-ui/vue';
import type { AttributeSelectProps } from '../types';
import type { VariationMapProductAttributeValue } from '@plentymarkets/shop-api';
import { productAttributeGetters } from '@plentymarkets/shop-api';
import { object, number } from 'yup';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';

const { updateValue, getValue } = useProductAttributes();
const { registerValidator, registerInvalidFields } = useValidatorAggregator('attributes');
const props = defineProps<AttributeSelectProps>();
const value = computed(() => getValue(props.attribute.attributeId));
const selectedAttributeValueName = ref<string>('');
const runtimeConfig = useRuntimeConfig();
const domain = runtimeConfig.public?.domain ?? '';

const getLabel = (item: VariationMapProductAttributeValue): string => {
  return productAttributeGetters.isAttributeValueDisabled(item)
    ? t('product.attributes.seeAvailableOptions')
    : productAttributeGetters.getAttributeValueName(item);
};

const getImagePath = (item: VariationMapProductAttributeValue): string => {
  const path = productAttributeGetters.getAttributeValueImageUrl(item);
  return path.startsWith('http') ? path : domain + path;
};

const validationSchema = toTypedSchema(
  object({
    selectedValue: number().required(t('error.requiredField')),
  }),
);

const { errors, defineField, validate, meta } = useForm({
  validationSchema: validationSchema,
});

registerValidator(validate);

const [selectedValue] = defineField('selectedValue');

const doUpdateValue = (attribute: VariationMapProductAttributeValue) => {
  updateValue(
    productAttributeGetters.getAttributeId(props.attribute),
    productAttributeGetters.getAttributeValueId(attribute),
  );
  selectedValue.value = getValue(props.attribute.attributeId);
  selectedAttributeValueName.value = productAttributeGetters.getAttributeValueName(attribute);
};

const setValue = (value: number | undefined) => {
  const getAttributeValue = productAttributeGetters.getAttributeValueById(props.attribute, value || -1);
  selectedValue.value = value;
  selectedAttributeValueName.value = getAttributeValue
    ? productAttributeGetters.getAttributeValueName(getAttributeValue)
    : '';
};

setValue(value.value);

watch(
  () => value.value,
  () => {
    setValue(value.value);
  },
);

watch(
  () => meta.value,
  () => {
    registerInvalidFields(
      meta.value.valid,
      `prop-${productAttributeGetters.getAttributeId(props.attribute)}`,
      productAttributeGetters.getAttributeName(props.attribute),
    );
  },
);
</script>
