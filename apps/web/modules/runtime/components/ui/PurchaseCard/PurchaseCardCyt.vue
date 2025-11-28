<template>
    <form class="max-w-[900px] mx-auto"
      data-testid="purchase-card"
      @submit.prevent="handleAddToCart()"
    >
      <div class="flex items-center gap-[10px]">
        <div v-if="collection" class="mr-auto">
          <SfTooltip
            show-arrow
            placement="top"
            :label="t('Product.moreItemsOfThisCollection')"
            class="text-[14px] xl:text-[18px] cursor-pointer"
          >
            <a :href="collection.link" class="underline font-semibold">{{ collection.name }}</a>
          </SfTooltip>
        </div>

        <SfTooltip v-if="reviewGetters.getTotalReviews(reviewAverage) > 0"
          @click="scrollToReviews"
          show-arrow
          placement="top"
          :label="reviewGetters.getTotalReviews(reviewAverage) > 1 ? t('showAllReviews') : t('Product.oneReview')"
          class="flex items-center gap-[10px] cursor-pointer"
        >
          <div class="flex items-center gap-[10px]">
            <div class="flex flex-col w-[calc(12*5px+4px)] xl:w-[calc(15*5px+4px)]">
              <div class="inline-flex gap-[1px] h-[12px] xl:h-[15px]">
                <svg v-for="i in 5" :key="i" class="w-[12px] h-[12px] xl:w-[15px] xl:h-[15px] fill-[#999] flex-shrink-0" viewBox="0 0 15 15">
                  <use href="#svg_star"></use>
                </svg>
              </div>
              <div
                class="inline-flex gap-[1px] overflow-hidden h-[12px] xl:h-[15px] mt-[-12px] xl:mt-[-15px]"
                :style="'width:' + reviewGetters.getAverageRating(reviewAverage, 'half') * 20 + '%'"
              >
                <svg v-for="i in 5" :key="i" class="w-[12px] h-[12px] xl:w-[15px] xl:h-[15px] fill-[#FCC72F] flex-shrink-0" viewBox="0 0 15 15">
                  <use href="#svg_star"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="text-[12px] underline xl:text-[14px]">
            {{ reviewGetters.getTotalReviews(reviewAverage) }}
            {{ reviewGetters.getTotalReviews(reviewAverage) === 1 ? t('Product.review') : t('Product.reviews') }}
          </div>
        </SfTooltip>

        <svg class="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="svg_star">
            <path d="M753.991,71.8a.664.664,0,0,1-.353-.118l-3.682-2.338a.742.742,0,0,0-.665,0l-3.683,2.338a.49.49,0,0,1-.689-.048.623.623,0,0,1-.077-.535l.983-4.394a.8.8,0,0,0-.206-.664l-3.259-2.949a.564.564,0,0,1-.218-.6.528.528,0,0,1,.511-.348l4.29-.378a.743.743,0,0,0,.538-.41l1.668-4.16c.145-.362.38-.4.473-.4s.328.039.473.4l1.668,4.16a.743.743,0,0,0,.538.41l4.29.378a.528.528,0,0,1,.511.348.564.564,0,0,1-.218.6l-3.259,2.949a.8.8,0,0,0-.205.664L754.4,71.1a.626.626,0,0,1-.077.535A.414.414,0,0,1,753.991,71.8Z" transform="translate(-742.123 -56.796)"/>
          </g>
        </svg>
      </div>

      <h1 class="text-[18px] xl:text-[24px] leading-[1.25] font-light" :class="{'pt-[20px]': reviewGetters.getTotalReviews(reviewAverage) > 0}" data-testid="product-name">{{ productGetters.getName(product) }}</h1>

      <div class="grid grid-cols-[auto_55px] pt-[15px] xl:grid-cols-[auto_80px]">
        <div class="prices-badge">
          <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
          <div class="text-[12px]">
            <span>{{ showNetPrices ? t('itemExclVAT') : t('itemInclVAT') }}&nbsp;</span>
            <i18n-t keypath="excludedShipping" scope="global">
              <template #shipping>
                <SfLink :href="localePath(paths.shipping)" target="_blank" class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded">{{ $t('delivery') }}</SfLink>
              </template>
            </i18n-t>
          </div>
          <div :class="['text-[12px] font-bold av' + productGetters.getAvailabilityId(product), productGetters.getAvailabilityId(product) == 1 ? 'text-[#2AC678]' : 'text-[black]']">
            {{ productGetters.getAvailabilityName(product) }}
          </div>
        </div>

        <div v-if="oekotex" class="flex items-center justify-center">
          <svg class="w-[55px] h-auto xl:w-[80px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 120"><g transform="translate(-0.4)"><path d="M46.324,34.642h-.165a.737.737,0,0,1-.12.015v1.264h.24a.909.909,0,0,0,.512-.151.682.682,0,0,0,.195-.527.58.58,0,0,0-.165-.465.836.836,0,0,0-.5-.136" transform="translate(15.746 11.547)" fill="#00a687"/><path d="M44.829,0C30.319,0,21.056,4.436,16.124,7.731A39.029,39.029,0,0,0,.26,35.224,40.233,40.233,0,0,0,40.212,80c11.113,0,22.315-4.5,29.277-12.5S80,49.437,80,35.179V0ZM42.152,24.019a7.766,7.766,0,0,1,1.053-.12c1.293,0,1.94.587,1.94,1.715v5.34a2.829,2.829,0,0,1,.24-.9,5.515,5.515,0,0,1,.647-1.023L49.009,25.1a3.127,3.127,0,0,1,.963-.9,2.022,2.022,0,0,1,1.1-.287,3.06,3.06,0,0,1,.992.165,2.181,2.181,0,0,1,.767.5l-4.8,6.452L53.445,38.4a3.246,3.246,0,0,1-1.715.512A2.808,2.808,0,0,1,49.4,37.767l-3.2-4.152a4.4,4.4,0,0,1-1.068-2.391v7.429H42.152Zm-11.533-.044h9.068a4.358,4.358,0,0,1,.06.812,1.428,1.428,0,0,1-.436,1.188,2.238,2.238,0,0,1-1.429.361H33.612v3.609h4.6v2.331h-4.6v4.047h4.645a1.975,1.975,0,0,1,1.339.421,1.435,1.435,0,0,1,.467,1.143c0,.165-.016.3-.016.421a3.244,3.244,0,0,0,0,.36H30.619V23.975ZM15.583,35.389a10.209,10.209,0,0,1-.752-4.105,9.465,9.465,0,0,1,.827-4.061,6.244,6.244,0,0,1,2.331-2.632,6.718,6.718,0,0,1,3.535-.9,5.913,5.913,0,0,1,4.8,2,8.427,8.427,0,0,1,1.7,5.6,8.707,8.707,0,0,1-1.728,5.7,6.115,6.115,0,0,1-4.933,2.045,6.437,6.437,0,0,1-3.579-.948,5.756,5.756,0,0,1-2.195-2.692M32.048,46.039a1.9,1.9,0,0,1-1.324.421H27.973V58.672H24.965V46.46H20.409a5.5,5.5,0,0,1-.06-.888,1.394,1.394,0,0,1,.511-1.143,2.061,2.061,0,0,1,1.353-.436h10.24a6.248,6.248,0,0,1,.06.947,1.39,1.39,0,0,1-.465,1.113ZM43.761,58.311a3.261,3.261,0,0,1-.045.361H34.288V43.993h9.067a6.114,6.114,0,0,1,.061.812,1.434,1.434,0,0,1-.436,1.188,2.24,2.24,0,0,1-1.429.361H37.265v3.609h4.6v2.331h-4.6v4.047h4.647a2.176,2.176,0,0,1,1.4.421,1.43,1.43,0,0,1,.465,1.143c0,.165-.015.3-.015.421Zm11.713.6a2.57,2.57,0,0,1-1.263-.3,2.751,2.751,0,0,1-.917-1.037l-2.24-3.745-2.783,4.843H45.024l4.3-7.324-3.82-6.964a5.04,5.04,0,0,1,1.895-.5,1.8,1.8,0,0,1,1.744,1.068l2.105,3.971L53.4,45.2a3.01,3.01,0,0,1,.887-1.037,2.05,2.05,0,0,1,1.143-.287,3.382,3.382,0,0,1,1.579.437l-4.075,6.917,4.256,7.34a5.265,5.265,0,0,1-1.715.316Zm6.24-7.6A3.7,3.7,0,1,1,65.4,47.6v.015a3.69,3.69,0,0,1-3.68,3.7h0m3.5-14.333a6.069,6.069,0,0,1-4.932,2.045,6.434,6.434,0,0,1-3.579-.948,5.766,5.766,0,0,1-2.2-2.692,10.185,10.185,0,0,1-.751-4.105,9.425,9.425,0,0,1,.827-4.061,6.235,6.235,0,0,1,2.331-2.632,6.714,6.714,0,0,1,3.533-.9,5.918,5.918,0,0,1,4.8,2,8.6,8.6,0,0,1,1.7,5.6,8.661,8.661,0,0,1-1.729,5.7" transform="translate(0.4)" fill="#00a687"/><path d="M47.023,33.581a2.843,2.843,0,1,0,2.827,2.857v-.015a2.837,2.837,0,0,0-2.827-2.843m1.368,4.6c-.091,0-.151.015-.225.015a.83.83,0,0,1-.347-.089.793.793,0,0,1-.24-.287l-.616-1.052h-.3v1.368H45.91V34.529c.165-.015.347-.015.512-.045a2.314,2.314,0,0,1,.451-.015,1.909,1.909,0,0,1,1.143.271.969.969,0,0,1,.361.812,1.025,1.025,0,0,1-.06.391,1.181,1.181,0,0,1-.151.3,1.636,1.636,0,0,1-.225.225.677.677,0,0,1-.241.136l.9,1.5A1.465,1.465,0,0,1,48.391,38.184Z" transform="translate(15.122 11.194)" fill="#00a687"/><path d="M19.585,28.71a7.19,7.19,0,0,0,.9-3.925,6.959,6.959,0,0,0-.888-3.836A2.87,2.87,0,0,0,17.044,19.6a3.016,3.016,0,0,0-2.676,1.353,6.717,6.717,0,0,0-.917,3.836,7.284,7.284,0,0,0,.917,3.925,3.112,3.112,0,0,0,5.217,0" transform="translate(4.879 6.53)" fill="#00a687"/><path d="M46.23,19.6a3.016,3.016,0,0,0-2.676,1.353,6.717,6.717,0,0,0-.917,3.836,7.284,7.284,0,0,0,.917,3.925,2.937,2.937,0,0,0,2.616,1.413,2.9,2.9,0,0,0,2.6-1.413,7.3,7.3,0,0,0,.9-3.925,6.993,6.993,0,0,0-.888-3.836A2.87,2.87,0,0,0,46.23,19.6" transform="translate(14.608 6.53)" fill="#00a687"/><path d="M.649,78.856a4.434,4.434,0,0,0,1.256.745,3.557,3.557,0,0,0,1.213.225,1.983,1.983,0,0,0,1.215-.352,1.187,1.187,0,0,0,.465-.984,1.359,1.359,0,0,0-.283-.829,2.078,2.078,0,0,0-.705-.505,6.071,6.071,0,0,0-.973-.365c-.325-.112-.636-.211-.96-.352a3.936,3.936,0,0,1-.889-.505,2.171,2.171,0,0,1-.636-.815A2.887,2.887,0,0,1,.1,73.909a2.616,2.616,0,0,1,.465-1.56,3.068,3.068,0,0,1,1.271-1A4.706,4.706,0,0,1,3.655,71a6.2,6.2,0,0,1,1.525.2,3.531,3.531,0,0,1,1.1.477.749.749,0,0,1,.424.675,1.209,1.209,0,0,1-.155.492,2.2,2.2,0,0,1-.439.576,3.933,3.933,0,0,0-1.059-.6,3.251,3.251,0,0,0-1.171-.225,2.152,2.152,0,0,0-1.172.295.983.983,0,0,0-.437.844,1.176,1.176,0,0,0,.141.535,1.04,1.04,0,0,0,.48.435,6.7,6.7,0,0,0,1.213.535c.325.127.636.253.975.393a3.829,3.829,0,0,1,.9.535,2.2,2.2,0,0,1,.649.815,2.4,2.4,0,0,1,.255,1.208,2.991,2.991,0,0,1-1,2.389,4.064,4.064,0,0,1-2.739.857,7.409,7.409,0,0,1-1.524-.155,5.338,5.338,0,0,1-1.2-.435A.808.808,0,0,1,0,80.192a2.645,2.645,0,0,1,.649-1.279Zm10.98-6.015H8.483a2.629,2.629,0,0,1-.057-.6.954.954,0,0,1,.339-.773,1.378,1.378,0,0,1,.932-.3h7.029a3.161,3.161,0,0,1,.056.633.978.978,0,0,1-.324.759,1.334,1.334,0,0,1-.9.281H13.663v8.32H11.6v-8.32h.028Zm12.717,8.32L23.5,78.716H20.041l-.832,2.445H17.176l3.473-9.824a3,3,0,0,1,1.2-.211,1.338,1.338,0,0,1,1.412.928l3.217,9.107H24.347m-2.555-8.18-1.355,4.231h2.681l-1.327-4.231m15.116,8.18H35.172L30.924,74.6v6.563H28.961V71.211a4.431,4.431,0,0,1,.919-.084,1.667,1.667,0,0,1,.705.14,1.342,1.342,0,0,1,.508.535l3.867,6.283V71.225a3.743,3.743,0,0,1,.677-.071c.861,0,1.285.393,1.285,1.167v8.855h-.015ZM48.58,75.989A6.217,6.217,0,0,1,48,78.744a4.12,4.12,0,0,1-1.665,1.8,5,5,0,0,1-2.54.619H40.62v-9.88a20.822,20.822,0,0,1,2.809-.183,5.378,5.378,0,0,1,3.853,1.236,4.823,4.823,0,0,1,1.312,3.655Zm-2.1.043a3.892,3.892,0,0,0-.72-2.531,2.749,2.749,0,0,0-2.187-.829,7.064,7.064,0,0,0-.9.057v6.859H43.5a2.805,2.805,0,0,0,2.257-.844,4.059,4.059,0,0,0,.72-2.712M57.4,81.161l-.847-2.445H53.1l-.833,2.445H50.232L53.7,71.337a3,3,0,0,1,1.2-.211,1.336,1.336,0,0,1,1.411.928l3.219,9.107H57.4m-2.553-8.18-1.356,4.231h2.683l-1.327-4.231m13.916,1.055a3.142,3.142,0,0,1-.495,1.813,2.875,2.875,0,0,1-1.4,1.1l2.471,4.117a2.8,2.8,0,0,1-1.2.253,1.644,1.644,0,0,1-.932-.253,2.207,2.207,0,0,1-.691-.772l-1.693-2.881h-.833v3.739H61.932V71.225a20.545,20.545,0,0,1,2.655-.141,5.7,5.7,0,0,1,3.161.717,2.54,2.54,0,0,1,1.031,2.235Zm-2.16.2a1.679,1.679,0,0,0-.437-1.279,1.978,1.978,0,0,0-1.4-.421c-.155,0-.311,0-.465.013a2.045,2.045,0,0,0-.339.043v3.444h.705a2,2,0,0,0,1.425-.464,1.758,1.758,0,0,0,.495-1.336Zm13.367,1.757a6.235,6.235,0,0,1-.579,2.755,4.04,4.04,0,0,1-1.665,1.8,5,5,0,0,1-2.541.619H72.011v-9.88a20.817,20.817,0,0,1,2.808-.183,5.378,5.378,0,0,1,3.853,1.236,4.71,4.71,0,0,1,1.312,3.655Zm-2.089.043a3.892,3.892,0,0,0-.72-2.531,2.749,2.749,0,0,0-2.187-.829,7.064,7.064,0,0,0-.9.057v6.859H74.9a2.805,2.805,0,0,0,2.257-.844A4.13,4.13,0,0,0,77.881,76.032Zm-47.3,20.084V88.6l-1.963.984A2.518,2.518,0,0,1,28,88.372a.747.747,0,0,1,.48-.675L30.6,86.587a4.122,4.122,0,0,1,.579-.267,1.569,1.569,0,0,1,.579-.113,1.416,1.416,0,0,1,.833.253v9.669H30.571Zm12.66-4.877a6.56,6.56,0,0,1-.932,3.809,3.159,3.159,0,0,1-2.752,1.279,3.285,3.285,0,0,1-2.795-1.265,6.473,6.473,0,0,1-.917-3.837,6.227,6.227,0,0,1,.975-3.795,3.211,3.211,0,0,1,2.795-1.335,3.109,3.109,0,0,1,2.724,1.265,6.52,6.52,0,0,1,.917,3.864Zm-2.032,0a6.7,6.7,0,0,0-.4-2.671,1.358,1.358,0,0,0-2.525,0,6.61,6.61,0,0,0-.409,2.671,6.519,6.519,0,0,0,.409,2.643,1.363,1.363,0,0,0,2.525.013,6.58,6.58,0,0,0,.4-2.656m12.025,0a6.56,6.56,0,0,1-.932,3.809,3.16,3.16,0,0,1-2.752,1.279,3.281,3.281,0,0,1-2.795-1.265,6.473,6.473,0,0,1-.917-3.837,6.235,6.235,0,0,1,.973-3.795,3.213,3.213,0,0,1,2.795-1.335,3.106,3.106,0,0,1,2.724,1.265,6.5,6.5,0,0,1,.917,3.864Zm-2.019,0a6.72,6.72,0,0,0-.395-2.671,1.321,1.321,0,0,0-1.257-.857,1.335,1.335,0,0,0-1.269.857,6.633,6.633,0,0,0-.409,2.671,6.519,6.519,0,0,0,.409,2.643,1.364,1.364,0,0,0,2.527.013,6.6,6.6,0,0,0,.395-2.656" transform="translate(0.4 23.667)" fill="#050505"/></g></svg>
        </div>
      </div>

      <ProductAttributes :product="product" />
      <BundleOrderItems v-if="product.bundleComponents" :product="product" />
      <OrderProperties :product="product" />
      <GraduatedPriceList :product="product" :count="quantitySelectorValue" />

      <div class="flex flex-wrap gap-4 pt-[35px]">
        <UiQuantitySelector
          :min-value="productGetters.getMinimumOrderQuantity(product)"
          :value="quantitySelectorValue"
          class="min-w-[100px] flex-grow-0 flex-shrink-0 basis-0"
          @change-quantity="changeQuantity"
        />
        <SfTooltip
          show-arrow
          placement="top"
          :label="isNotValidVariation || isSalableText"
          class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
        >
          <UiButton
            type="submit"
            data-testid="add-to-cart"
            size="lg"
            class="w-full h-full bg-black"
            :disabled="loading || !productGetters.isSalable(product)"
          >
            <template #prefix>
              <div v-if="!loading" class="flex row items-center gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-auto xl:w-[22px]" viewBox="0 0 18 16"><g transform="translate(-1749.5 -84.5)"><g transform="translate(1750 85)"><path d="M10.5,7.25A3.5,3.5,0,0,1,7,3.75v-.5H8v.5a2.5,2.5,0,0,0,5,0v-.5h1v.5A3.5,3.5,0,0,1,10.5,7.25Z" transform="translate(-2 -1.313)" fill="#fff"/><path d="M15.182,16H2.818A2.788,2.788,0,0,1,0,13.25V.5A.5.5,0,0,1,.5,0h17a.5.5,0,0,1,.5.5V13.25A2.788,2.788,0,0,1,15.182,16ZM1,1V13.25A1.787,1.787,0,0,0,2.818,15H15.182A1.787,1.787,0,0,0,17,13.25V1Z" transform="translate(-0.5 -0.5)" fill="#fff"/></g></g></svg>
                {{ t('addToCart') }}
              </div>
              <div v-else>
                <SfLoaderCircular size="sm" />
              </div>
            </template>
          </UiButton>
        </SfTooltip>
      </div>

      <div v-if="!showPayPalButtons" class="pt-[20px] xl:pt-[30px] flex flex-col gap-[10px] xl:gap-[20px]">
        <p class="text-[12px] xl:text-[14px] m-0">{{ t('Product.xcheckoutInfo') }}</p>
        <div>
          <PayPalExpressButton type="SingleItem" class="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-[10px]" @validation-callback="paypalHandleAddToCart" />
          <!-- <PayPalPayLaterBanner placement="product" :amount="priceWithProperties * quantitySelectorValue" /> -->
        </div>
      </div>

      <div class="grid grid-cols-[auto_1fr] gap-[10px] pt-[35px] xl:pt-[50px]">
        <svg class="h-auto w-[49px] xl:w-[66px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.371 30.032"><defs><clipPath id="a"><rect width="49" height="30" transform="translate(0 0)" fill="none" stroke="#000" stroke-width="1"/></clipPath></defs><g transform="translate(0 0.016)"><g transform="translate(19.839 0.484)"><path d="M35.016,0a.5.5,0,0,1,.239.061L49.772,7.979a.5.5,0,0,1,0,.878L35.256,16.775a.5.5,0,0,1-.479,0L20.261,8.857a.5.5,0,0,1,0-.878L34.777.061A.5.5,0,0,1,35.016,0ZM48.488,8.418,35.016,1.069,21.544,8.418l13.472,7.349Z" transform="translate(-20.5 -0.5)"/><path d="M35.016,30.3a.5.5,0,0,1-.239-.061L20.261,22.317A.5.5,0,0,1,20,21.878V8.682a.5.5,0,0,1,1,0v12.9l14.016,7.645,14.016-7.645V8.682a.5.5,0,0,1,1,0v13.2a.5.5,0,0,1-.261.439L35.256,30.235A.5.5,0,0,1,35.016,30.3Z" transform="translate(-20.5 -0.764)"/><path d="M0,13.7a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V13.2A.5.5,0,0,1,0,13.7Z" transform="translate(14.516 15.836)"/></g><path d="M14.516,8.418a.5.5,0,0,1-.239-.061L-.239.439a.5.5,0,0,1-.2-.678.5.5,0,0,1,.678-.2L14.756,7.479a.5.5,0,0,1-.24.939Z" transform="translate(27.097 4.443)"/><path d="M10.645.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H10.645a.5.5,0,0,1,.5.5A.5.5,0,0,1,10.645.5Z" transform="translate(6.29 4.3)"/><path d="M10.645.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H10.645a.5.5,0,0,1,.5.5A.5.5,0,0,1,10.645.5Z" transform="translate(3.387 21.719)"/><g clip-path="url(#a)"><path d="M10.645.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H10.645a.5.5,0,0,1,.5.5A.5.5,0,0,1,10.645.5Z" transform="translate(0.484 13.977)"/></g></g></svg>
        <div class="text-[12px] xl:text-[14px]">
          <div class="font-bold">{{ t('Product.xcheckoutInfo2') }}</div>
          <div>{{ t('Product.xcheckoutInfo3') }}</div>
        </div>
      </div>

      <ul class="pt-[20px] text-[12px] xl:text-[14px]">
        <li><span class="font-bold">{{ t('content') }}:</span> {{ product.unit.content }} {{ product.unit.names.name }}</li>
        <li><span class="font-bold">{{ t('Product.itemNo') }}:</span> {{ product.variation.model }}</li>
      </ul>

      <div class="pt-[35px]">
        <details v-if="productGetters.getDescription(product)" class="group border-t border-b mt-[-1px] border-black py-[12px] xl:py-[15px]">
          <summary class="flex justify-between items-center cursor-pointer text-[14px] list-none transition group-open:font-semibold">
            {{ t('Product.description') }}
            <span class="transition-transform group-open:rotate-45 text-lg xl:text-xl leading-none">+</span>
          </summary>
          <div class="mt-4 leading-relaxed text-[14px]">
            <div
              class="typography-whitespace-pre-line break-words flex flex-col gap-[5px]"
              data-testid="product-description"
              v-html="productGetters.getDescription(product)"
              />
          </div>
        </details>
        <details v-if="material" class="group border-t border-b mt-[-1px] border-black py-[12px] xl:py-[15px]">
          <summary class="flex justify-between items-center cursor-pointer text-[14px] list-none transition group-open:font-semibold">
            {{ t('Product.material') }}
            <span class="transition-transform group-open:rotate-45 text-lg xl:text-xl leading-none">+</span>
          </summary>
          <div v-html="material" class="mt-4 leading-relaxed text-[14px]"/>
        </details>
        <details v-if="careInstructions" class="group border-t border-b mt-[-1px] border-black py-[12px] xl:py-[15px] border-black">
          <summary class="flex justify-between items-center cursor-pointer text-[14px] list-none transition group-open:font-semibold">
            {{ t('Product.careInstructions') }}
            <span class="transition-transform group-open:rotate-45 text-lg xl:text-xl leading-none">+</span>
          </summary>
          <div v-html="careInstructions" class="mt-4 leading-relaxed text-[14px]"/>
        </details>
      </div>
    </form>
  </template>
  
<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import { SfCounter, SfRating, SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      tags: true,
      availability: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: true,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'itemName',
      'price',
      'tags',
      'availability',
      'starRating',
      'variationProperties',
      'orderProperties',
      'previewText',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'addToWishlist',
      'quantityAndAddToCart',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: true,
    borders: true,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
});

const { currentProduct } = useProducts();

const { data: productReviews } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));
const reviewAverage = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { showNetPrices } = useCart();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const { t } = useI18n();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(props?.product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(props?.product)));
const localePath = useLocalePath();

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('errorMessages.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('errorMessages.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('productAttributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(props?.product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('addedToCart'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('productAttributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// Get variationProperty group ID 4 once
const additionalInfoGroup = computed(() => {
  const vp = props?.product?.variationProperties;
  if (!vp) return null;
  const group = vp.find(v => v.id === 4);
  return group?.properties ?? null;
});

// Helper to get a property value by id
const getPropertyValue = (propertyId: number): string | null => {
  const properties = additionalInfoGroup.value;
  if (!properties) return null;
  
  const prop = properties.find(p => p.id === propertyId);
  if (!prop?.values) return null;
  
  const value = prop.values.value ?? prop.values;
  return (typeof value === "string") ? value : null;
};

// Helper to check if a property exists
const propertyExists = (propertyId: number): boolean => {
  return additionalInfoGroup.value?.some(p => p.id === propertyId) ?? false;
};

// computed properties:
const oekotex = computed(() => propertyExists(46));
const material = computed(() => getPropertyValue(48));
const careInstructions = computed(() => getPropertyValue(49));
const collection = computed(() => {
  const raw = getPropertyValue(47);
  if (!raw) return null;
  
  const [name, link] = raw.split(",").map(s => s.trim());
  return (name && link) ? { name, link } : null;
});


</script>
  