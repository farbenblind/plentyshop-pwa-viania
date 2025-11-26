<template>
  <div>
    <label for="attribute-box" class="block leading-[1] text-[12px] font-semibold">
      {{ productAttributeGetters.getAttributeName(attribute) }}
    </label>

    <div class="flex gap-[10px] flex-wrap pt-[10px]">
      <div :id="'attribute-box' + attribute.attributeId"
        v-for="item in productAttributeGetters.getAttributeValues(attribute)"
        :key="productAttributeGetters.getAttributeValueId(item)"
        class="min-h-[32px] min-w-[32px] flex items-center justify-center border-[1px] border-solid border-[#E5E5E5] rounded-[5px] bg-white cursor-pointer transition-all duration-[400ms]"
        :class="{
          'text-zinc-400 border-dashed border-primary-500': productAttributeGetters.isAttributeValueDisabled(item),
          '!bg-black text-white': value === productAttributeGetters.getAttributeValueId(item),
          '!ring-negative-700 !border-negative-700 ring-1 bg-white': Boolean(errors['selectedValue']),
        }"
        @click="doUpdateValue(productAttributeGetters.getAttributeValueId(item))"
      >
        <SfTooltip :label="getLabel(item)" strategy="absolute" :show-arrow="true" placement="top" :class="'flex items-center'">
          <span class="text-[12px] leading-1 flex items-center justify-center">
            {{ productAttributeGetters.getAttributeValueName(item) }}
          </span>
        </SfTooltip>
      </div>
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
const { t } = useI18n();

const getLabel = (item: VariationMapProductAttributeValue): string => {
  return productAttributeGetters.isAttributeValueDisabled(item) ? t('productAttributes.seeAvailableOptions') : '';
};

const validationSchema = toTypedSchema(
  object({
    selectedValue: number().required(t('errorMessages.requiredField')),
  }),
);

const { errors, defineField, validate, meta } = useForm({
  validationSchema: validationSchema,
});

registerValidator(validate);

const [selectedValue] = defineField('selectedValue');

const doUpdateValue = (value: number) => {
  updateValue(props.attribute.attributeId, value);
  selectedValue.value = getValue(props.attribute.attributeId);
};

const setValue = (value: number | undefined) => {
  selectedValue.value = value;
};

watch(
  value,
  (newVal) => {
    if (newVal) {
      setValue(newVal);
    }
  },
  { immediate: true },
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
