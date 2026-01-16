<template>
    <Swiper
      :modules="[Autoplay, EffectFade]"
      effect="fade"
      :slides-per-view="1"
      :autoplay="enableAutoplay && { delay: 8000, disableOnInteraction: false }"
      :loop="true"
      :speed="500"
    >
      <SwiperSlide>
        <div :class="swiperClasses">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="31" viewBox="0 0 51 31"><defs><clipPath id="a"><rect width="51" height="31" fill="none" stroke="#000" stroke-width="1"/></clipPath></defs><g transform="translate(0 0)"><path d="M35.5,0a.5.5,0,0,1,.239.061l15,8.182a.5.5,0,0,1,0,.878l-15,8.182a.5.5,0,0,1-.479,0l-15-8.182a.5.5,0,0,1,0-.878l15-8.182A.5.5,0,0,1,35.5,0ZM49.456,8.682,35.5,1.069,21.544,8.682,35.5,16.294Z"/><path d="M35.5,31a.5.5,0,0,1-.239-.061l-15-8.182A.5.5,0,0,1,20,22.318V8.682a.5.5,0,0,1,1,0V22.021L35.5,29.93,50,22.021V8.682a.5.5,0,0,1,1,0V22.318a.5.5,0,0,1-.261.439l-15,8.182A.5.5,0,0,1,35.5,31Z"/><path d="M0,14.136a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V13.636A.5.5,0,0,1,0,14.136Z" transform="translate(35.5 16.864)"/><path d="M15,8.682a.5.5,0,0,1-.239-.061L-.239.439a.5.5,0,0,1-.2-.678.5.5,0,0,1,.678-.2l15,8.182a.5.5,0,0,1-.24.939Z" transform="translate(28 4.591)"/><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(6.5 4.443)"/><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(3.5 22.443)"/><g clip-path="url(#a)"><path d="M11,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H11a.5.5,0,0,1,.5.5A.5.5,0,0,1,11,.5Z" transform="translate(0.5 14.443)"/></g></g></svg>
          <p :class="textClasses"><span class="font-semibold block md:inline">{{ t('Product.xcheckoutInfo2') }}</span> {{ t('Product.xcheckoutInfo3') }}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div :class="swiperClasses">
          <svg :class="isItemView ? 'h-auto w-[51px]' : 'h-[31px] w-auto'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="61" height="35" viewBox="0 0 61 35"><g data-name="Gruppe 37736"><g fill="none" stroke="#1d1d1b" stroke-linecap="round" data-name="Gruppe 37737" transform="translate(2)"><path d="M58.5 34.5h-60" data-name="Pfad 13853"/><ellipse cx="4.717" cy="4.727" stroke-linejoin="round" data-name="Ellipse 225" rx="4.717" ry="4.727" transform="translate(13.596 24.196)"/><ellipse cx="4.717" cy="4.727" stroke-linejoin="round" data-name="Ellipse 226" rx="4.717" ry="4.727" transform="translate(34.039 24.196)"/><path stroke-linejoin="round" d="M23.03 28.923h11.008" data-name="Linie 287"/><path stroke-linejoin="round" d="M33.6 16.869V.5H8.985v28.423h4.062" data-name="Pfad 13846"/><path stroke-linejoin="round" d="M33.915 6.191h8.7l5.4 11.073v11.66h-3.931" data-name="Pfad 13847"/><path stroke-linejoin="round" d="M48.015 17.264H9.084" data-name="Linie 288"/></g></g></svg>
          <p :class="textClasses"><span class="font-semibold block md:inline">{{ t('Product.xcheckoutInfo4') }}</span> {{ t('Product.xcheckoutInfo5') }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">
    import { Autoplay, EffectFade } from 'swiper/modules';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/effect-fade';

    const props = withDefaults(defineProps<{
        isItemView?: boolean
    }>(), {
        isItemView: false
    });

    const enableAutoplay = true
    const swiperClasses = props.isItemView ? 
        "flex w-full items-center gap-[10px] pt-[35px] xl:pt-[50px] bg-[#F5EFEF]" : 
        "flex w-full flex-col md:flex-row justify-center items-center gap-[20px] pt-[45px] xl:pt-[60px] bg-white"
    const textClasses = props.isItemView ? 
        "text-left text-[12px] flex flex-col" :
        "text-center text-[14px] sm:text-[18px]"
</script>