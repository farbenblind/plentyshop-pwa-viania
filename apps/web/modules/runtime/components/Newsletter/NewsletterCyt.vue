<template>
    <div
      class="text-center xl:text-left"
      :style="{ backgroundColor: props.content.text?.bgColor ?? '#f5f5f5' }"
      data-testid="newsletter-block"
    >
      <div
        v-if="props.index === 0"
        class="font-semibold xl:text-[18px]"
        data-testid="newsletter-title"
        v-html="props.content.text?.title ?? t('newsletter.heading')"
      />
      <div
        v-if="props.index !== 0"
        class="font-semibold xl:text-[18px]"
        data-testid="newsletter-title"
        v-html="props.content.text?.title ?? t('newsletter.heading')"
      />
      <div
        class="text-[12px] pt-[15px] xl:text-[14px]"
        data-testid="newsletter-description"
        v-html="props.content.text?.htmlDescription ?? t('newsletter.info')"
      />
  
      <form class="mx-auto max-w-[550px] pt-[20px] xl:max-w-none" novalidate @submit.prevent="onSubmit">
        <div
          v-if="props.content.input?.displayNameInput"
          class="grid grid-cols-1 sm:grid-cols-2"
          data-testid="newsletter-display-name"
        >
          <div class="sm:mr-[1rem]">
            <label for="newsletter-first-name">
              <UiFormLabel class="text-start">{{ t('newsletter.firstName') }}</UiFormLabel>
              <SfInput
                v-bind="firstNameAttributes"
                id="newsletter-first-name"
                v-model="firstName"
                :invalid="Boolean(errors['firstName'])"
                :placeholder="`${t('newsletter.firstName')} ${props.content.input?.nameIsRequired ? '**' : ''}`"
                :wrapper-class="wrapperClass"
                type="text"
                name="firstName"
              />
            </label>
            <div>
              <ErrorMessage as="div" name="firstName" class="text-negative-700 text-left text-sm py-[10px]" />
            </div>
          </div>
  
          <div class="sm:ml-[1rem]">
            <label for="newsletter-last-name">
              <UiFormLabel class="text-start">{{ t('newsletter.lastName') }}</UiFormLabel>
              <SfInput
                v-bind="lastNameAttributes"
                id="newsletter-last-name"
                v-model="lastName"
                :invalid="Boolean(errors['lastName'])"
                :placeholder="`${t('newsletter.lastName')} ${props.content.input?.nameIsRequired ? '**' : ''}`"
                :wrapper-class="wrapperClass"
                type="text"
                name="lastName"
              />
            </label>
            <div>
              <ErrorMessage as="div" name="lastName" class="text-negative-700 text-left text-sm py-[10px]" />
            </div>
          </div>
        </div>
        
        <div class="sm:flex sm:gap-[10px]">
          <div class="grid grid-cols-1 i-footer sm:grow">
            <SfInput
              v-bind="emailAttributes"
              id="newsletter-email"
              v-model="email"
              :invalid="Boolean(errors['email'])"
              :placeholder="`${t('Footer.newsletter4')}`"
              :wrapper-class="wrapperClass"
              type="email"
              name="email"
              autocomplete="email"
            />
          </div>
    
          <div class="flex flex-col pt-[10px] sm:pt-0">
            <UiButton type="submit" size="sm" class="h-[40px] bg-secondary-900 !font-light" :disabled="loading" data-testid="newsletter-button">
              <SfLoaderCircular v-if="loading" class="flex justify-center items-center" size="base" />
              <template v-else>{{ props.content.button?.label ?? t('newsletter.subscribe') }}</template>
            </UiButton>
    
            <NuxtTurnstile
              v-if="turnstileSiteKey"
              v-bind="turnstileAttributes"
              ref="turnstileElement"
              v-model="turnstile"
              :options="{ theme: 'light' }"
              class="mt-4"
            />
    
            <ErrorMessage as="div" name="turnstile" class="text-negative-700 text-left text-sm py-[10px]" />
          </div>
        </div>

        <div class="pt-[20px]">
          <div class="flex justify-center items-center xl:justify-start">
            <SfCheckbox
              v-bind="privacyPolicyAttributes"
              id="terms-checkbox"
              v-model="privacyPolicy"
              :invalid="Boolean(errors['privacyPolicy'])"
              class="inline-block mr-2 min-w-[20px] min-h-[20px] !rounded-[10px] border-black bg-white"
              data-testid="checkout-terms-checkbox"
            />
            <label for="terms-checkbox" class="text-xs text-left leading-2 select-none">
              <i18n-t keypath="newsletter.policy" scope="global">
                <template #privacyPolicy>
                  <SfLink
                    :href="localePath(paths.privacyPolicy)"
                    target="_blank"
                    class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                  >
                    {{ t('privacyPolicy') }}
                  </SfLink>
                </template>
              </i18n-t>
            </label>
          </div>
          <div>
            <ErrorMessage as="div" name="privacyPolicy" class="text-negative-700 text-left text-sm py-[10px]" />
          </div>
        </div>
      </form>
    </div>
  </template>

  <style>
    .i-footer {
      > span {
        border-radius: 5px !important;
        border: 1px solid #E5E5E5 !important;
      }

      #newsletter-email {
        text-align: center !important;
        background-color: #fff !important;

        @media (min-width: 640px) {
          text-align: left !important;
        }

        &::placeholder {
          text-align: center !important;
          font-size: 14px !important;
          opacity: 1 !important;
          color: #000 !important;

          @media (min-width: 640px) {
            text-align: left !important;
          } 
        }
      }
    }
  </style>
  
  <script lang="ts" setup>
  import { SfCheckbox, SfInput, SfLink, SfLoaderCircular } from '@storefront-ui/vue';
  import { useForm, ErrorMessage } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/yup';
  import { object, string, boolean } from 'yup';
  import { paths } from '~/utils/paths';
  import type { NewsletterSubscribeProps } from '../../../../components/blocks/NewsletterSubscribe/types';
  
  const runtimeConfig = useRuntimeConfig();
  const { subscribe, loading } = useNewsletter();
  const { send } = useNotification();
  const localePath = useLocalePath();
  const { t } = useI18n();
  const props = defineProps<NewsletterSubscribeProps>();
  
  const turnstileSiteKey = runtimeConfig.public?.turnstileSiteKey ?? '';
  const turnstileElement = ref();
  const wrapperClass = 'focus-within:outline focus-within:outline-offset';
  
  const validationSchema = toTypedSchema(
    object({
      firstName: props.content.input?.nameIsRequired
        ? string().required(t('errorMessages.newsletter.firstNameRequired')).default('')
        : string().optional().default(''),
      lastName: props.content.input?.nameIsRequired
        ? string().required(t('errorMessages.newsletter.lastNameRequired')).default('')
        : string().optional().default(''),
      email: string().email(t('errorMessages.email.valid')).required(t('errorMessages.email.required')).default(''),
      privacyPolicy: boolean().oneOf([true], t('errorMessages.newsletter.termsRequired')).default(false),
      turnstile:
        turnstileSiteKey.length > 0
          ? string().required(t('errorMessages.newsletter.turnstileRequired')).default('')
          : string().optional().default(''),
    }),
  );
  
  const { errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: validationSchema,
  });
  
  const [firstName, firstNameAttributes] = defineField('firstName');
  const [lastName, lastNameAttributes] = defineField('lastName');
  const [email, emailAttributes] = defineField('email');
  const [turnstile, turnstileAttributes] = defineField('turnstile');
  const [privacyPolicy, privacyPolicyAttributes] = defineField('privacyPolicy');
  
  const subscribeNewsletter = async () => {
    if (!meta.value.valid || !turnstile.value) {
      return;
    }
  
    const response = await subscribe({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value || '',
      emailFolder: 1,
      'cf-turnstile-response': turnstile.value,
    });
  
    if (response) {
      send({
        type: 'positive',
        message: t('newsletter.success'),
      });
      resetForm();
    }
  
    turnstile.value = '';
    turnstileElement.value?.reset();
  };
  
  const onSubmit = handleSubmit(() => subscribeNewsletter());
  </script>
  