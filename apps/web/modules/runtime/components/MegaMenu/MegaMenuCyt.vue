<template>
  <header ref="referenceRef" class="flex flex-col align-center relative w-full bg-white p-[20px] lg:py-[40px] max-w-screen-3xl mx-auto" :class="headerClass">
    <div class="flex items-center text-[12px] lg:text-[14px] lg:items-start font-light">
      <div class="flex items-center gap-[30px] min-w-[320px]" v-if="viewport.isGreaterOrEquals('lg')">
        <NuxtLink
          to="/store-finder"
          :aria-label="t('Header.Store Finder')"
          class="flex items-center gap-[10px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="21" viewBox="0 0 17 21"><defs><clipPath id="a"><rect width="17" height="21" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M12.054,8.681A3.6,3.6,0,0,1,8.5,12.321a3.637,3.637,0,0,1-.008-7.272A3.6,3.6,0,0,1,12.054,8.681Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M.5,8.681A8.1,8.1,0,0,1,8.5.5a8.1,8.1,0,0,1,8,8.181c0,5.228-4.445,8.4-8,11.819C4.949,17.081.5,13.909.5,8.681Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>
          {{ t('Header.Store Finder') }}
        </NuxtLink>

        <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
          <template #trigger>
            <UiButton
              variant="tertiary"
              class="!flex !font-light !text-black p-0 !text-[14px] !p-0 hover:bg-white active:bg-white gap-[10px]"
              data-testid="account-dropdown-button"
              @click="accountDropdownToggle()"
            >
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><path d="M15.167,5.162A4.667,4.667,0,1,1,10.5.5h.009A4.666,4.666,0,0,1,15.167,5.162Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M.5,20.5c0-5.025,2.655-7.758,8.182-7.758h3.636c5.527,0,8.182,2.733,8.182,7.758Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></svg>
              </template>
              {{ user?.firstName }}
            </UiButton>
          </template>
          <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
            <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
              <template v-if="label === t('account.logout')">
                <UiDivider class="my-2" />
                <SfListItem tag="button" class="text-left" data-testid="account-dropdown-logout-item" @click="logOut()">
                  {{ label }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-neutral-200': route.path === link }"
                data-testid="account-dropdown-list-item"
              >
                {{ label }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>      
        <NuxtLink
          v-else
          class="flex items-center gap-[10px] cursor-pointer"
          :aria-label="t('auth.login.openLoginForm')"
          @click="navigateToLogin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><path d="M15.167,5.162A4.667,4.667,0,1,1,10.5.5h.009A4.666,4.666,0,0,1,15.167,5.162Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M.5,20.5c0-5.025,2.655-7.758,8.182-7.758h3.636c5.527,0,8.182,2.733,8.182,7.758Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></svg>
          {{ t('Header.Mein Viania') }}
        </NuxtLink>
      </div>
      <NuxtLink
        :to="localePath(paths.home)"
        :aria-label="t('goToHomepage')"
        class="logo flex mr-auto lg:ml-auto"
        >
        <svg class="sm:w-[120px] sm:h-auto xl:w-[185px]" xmlns="http://www.w3.org/2000/svg" width="88.8" height="24" viewBox="0 0 88.8 24"><g transform="translate(-222.354 -77.548)"><path d="M180.778,121.441c0,.971-.009,1.86,0,2.749.013,1.019.047,2.037.066,3.056.048,2.565.082,5.13.142,7.695.04,1.7.114,3.409.173,5.113.016.461-.04.516-.5.525-.721.014-1.442.037-2.163.057-.418.012-.506-.077-.5-.487.022-3.093.06-6.186.057-9.279,0-2.394-.04-4.788-.087-7.181-.04-2.072-.114-4.143-.172-6.214,0-.092,0-.184,0-.275-.027-.309.111-.429.421-.429.859,0,1.719-.013,2.578-.025a5.011,5.011,0,0,0,.651-.035.611.611,0,0,1,.7.411q4.56,9.1,9.133,18.2c.049.1.1.195.2.371,0-.664.01-1.24,0-1.815-.041-1.923-.094-3.846-.133-5.77-.057-2.839-.1-5.679-.161-8.519-.016-.778-.067-1.555-.1-2.333-.016-.387.068-.474.438-.484.721-.02,1.442-.044,2.163-.067.481-.015.524.048.514.512q-.036,1.649-.036,3.3c0,3.128-.007,6.257.023,9.385.028,2.954.1,5.908.153,8.863q.013.7.045,1.407c.012.276-.107.393-.383.4-1.087.017-2.175.037-3.262.07a.625.625,0,0,1-.633-.416q-3.224-6.518-6.459-13.03l-2.667-5.377-.19-.377" transform="translate(88.481 -39.094)"/><path d="M130.333,133.283h-2.776c-1.306,0-2.613,0-3.919,0a.31.31,0,0,0-.368.287c-.516,2.168-1.049,4.331-1.571,6.5-.109.454-.175.518-.639.522-.859.007-1.718.018-2.577.026-.352,0-.433-.1-.338-.434q3.266-11.435,6.532-22.87c.139-.485.177-.51.689-.518q1.717-.026,3.434-.064c.45-.01.537.049.654.472q2.728,9.878,5.461,19.755c.29,1.046.618,2.081.925,3.121.107.363.058.436-.311.449-.984.034-1.968.065-2.952.087-.476.011-.515-.037-.621-.493q-.755-3.238-1.517-6.475c-.026-.11-.063-.217-.105-.36m-6.394-2.645h5.714L126.821,119.6l-2.882,11.039" transform="translate(128.39 -39.11)"/><path d="M268.123,116.711c.733,0,1.465.009,2.2,0a.5.5,0,0,1,.557.426q2.772,10.045,5.56,20.085c.266.958.564,1.906.844,2.86.1.338.047.421-.294.433-1.007.034-2.014.054-3.02.093a.481.481,0,0,1-.564-.446c-.491-2.15-1.012-4.294-1.5-6.446-.084-.373-.239-.451-.594-.448q-3.094.026-6.188,0a.37.37,0,0,0-.436.337c-.523,2.189-1.059,4.376-1.58,6.566a.443.443,0,0,1-.487.409c-.9,0-1.809.017-2.714.024-.349,0-.419-.1-.32-.443q2.7-9.354,5.388-18.708c.4-1.384.763-2.776,1.145-4.163.13-.472.177-.506.659-.506h1.341c0-.023,0-.045,0-.068m2.976,13.935L268.29,119.7l-.06.013-2.854,10.936Z" transform="translate(33.827 -39.098)"/><path d="M53.7,136.666q.208-.841.415-1.682c1.033-4.217,2.082-8.431,3.092-12.653.42-1.756.763-3.53,1.128-5.3a.417.417,0,0,1,.472-.38c.825-.006,1.649-.019,2.474-.026.37,0,.429.079.334.429Q59,126.7,56.389,136.338c-.325,1.2-.614,2.414-.919,3.621-.114.448-.175.491-.63.5-1,.016-1.992.031-2.987.063a.508.508,0,0,1-.582-.443q-2.316-8.924-4.642-17.846-.665-2.554-1.333-5.107c-.085-.324-.025-.392.325-.412.971-.057,1.942-.113,2.911-.188.31-.024.477.082.531.385.742,4.108,1.759,8.153,2.745,12.206q.9,3.7,1.79,7.4c.012.05.026.1.04.149l.062,0" transform="translate(177.092 -38.974)"/><path d="M100.746,131.409c0-2.509.025-5.02-.008-7.529-.028-2.163-.122-4.326-.188-6.488-.017-.575,0-.593.581-.6.939-.015,1.877-.039,2.816-.063.406-.01.454.035.452.449-.02,3.861-.066,7.722-.052,11.583.01,2.943.093,5.885.151,8.828.017.846.066,1.692.093,2.539.013.389-.063.453-.454.461q-1.459.029-2.919.067c-.444.011-.525-.1-.51-.549.03-.858.042-1.717.044-2.576.006-2.04,0-4.08,0-6.119h-.009" transform="translate(140.096 -39.111)"/><path d="M245.864,133.981c.06,2.071.116,4.143.184,6.214.009.288-.11.4-.373.4q-1.528.034-3.056.068c-.361.008-.448-.083-.447-.434.017-4.961.058-9.921.039-14.882-.01-2.667-.124-5.333-.192-8-.013-.521.009-.539.53-.547.916-.014,1.831-.035,2.747-.057.562-.013.572,0,.567.606-.024,3.093-.055,6.186-.066,9.279-.006,1.8.057,7.353.068,7.353" transform="translate(45.426 -39.121)"/></g></svg>
      </NuxtLink>

      <div class="links flex align-center text-[12px] flex gap-[20px] lg:gap-[30px] lg:text-[14px] lg:min-w-[320px] justify-end">
        <NuxtLink v-if="viewport.isLessThan('lg')"
          class="flex items-center gap-[10px] cursor-pointer"
          :aria-label="t('auth.login.openLoginForm')"
          :to="isAuthorized ? localePath(paths.account) : localePath(paths.authLogin)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-auto" width="21" height="21" viewBox="0 0 21 21"><path d="M15.167,5.162A4.667,4.667,0,1,1,10.5.5h.009A4.666,4.666,0,0,1,15.167,5.162Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M.5,20.5c0-5.025,2.655-7.758,8.182-7.758h3.636c5.527,0,8.182,2.733,8.182,7.758Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></svg>
        </NuxtLink>
        <NuxtLink
          class="wl flex items-center gap-[5px] lg:gap-[10px]"
          :class="{ 'active': wishlistItemIds.length > 0 }"
          :to="localePath(paths.wishlist)"
          :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
          data-testid="wishlist-page-navigation"
        >
          <svg class="lg:w-[22px] lg:h-auto" xmlns="http://www.w3.org/2000/svg" width="18" height="16.099" viewBox="0 0 18 16.099"><g transform="translate(0.5 0.5)"><path d="M18,5.459A4.358,4.358,0,0,0,13.75,1,4.652,4.652,0,0,0,9.5,3.838,4.652,4.652,0,0,0,5.25,1,4.358,4.358,0,0,0,1,5.459C1,9.412,5.588,13.415,9.5,16,13.412,13.415,18,9.412,18,5.459Z" transform="translate(-1 -1)" fill="none" stroke="#000" stroke-linecap="square" stroke-width="1"/></g></svg>
          <span class="badge font-semibold" data-testid="wishlist-badge" v-if="viewport.isLessThan('lg')">{{ wishlistItemIds.length }}</span>
          <span class="badge" data-testid="wishlist-badge" v-else>{{t('Header.Merkliste')}}<template v-if="wishlistItemIds.length"> ({{ wishlistItemIds.length }})</template></span>
        </NuxtLink>
        <NuxtLink
          class="wl b flex items-center gap-[5px] lg:gap-[10px]"
          :class="{ 'active': cartItemsCount > 0 }"
          :to="localePath(paths.cart)"
          :aria-label="t('numberInCart', { count: cartItemsCount })"
          data-testid="wishlist-page-navigation"
        >
          <svg class="lg:w-[22px] lg:h-auto" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"><g transform="translate(0.5 0.5)"><path d="M13.5,3.75a3,3,0,0,1-6,0" transform="translate(-2 -1.313)" fill="none" stroke="#000" stroke-linecap="square" stroke-linejoin="round" stroke-width="1"/><path d="M15.182,15.5H2.818A2.285,2.285,0,0,1,.5,13.25V.5h17V13.25A2.285,2.285,0,0,1,15.182,15.5Z" transform="translate(-0.5 -0.5)" fill="none" stroke="#000" stroke-linecap="square" stroke-linejoin="round" stroke-width="1"/></g></svg>
          <span class="badge font-semibold" data-testid="cart-badge" v-if="viewport.isLessThan('lg')">{{ cartItemsCount }}</span>
          <span class="badge" data-testid="cart-badge" v-else>{{ t('cart') }}<template v-if="cartItemsCount"> ({{ cartItemsCount }})</template></span>
        </NuxtLink>
        <button
          v-if="viewport.isLessThan('lg')"
          :aria-label="t('openSearchModalButtonLabel')"
          @click="toggleSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16.208" height="16.207" viewBox="0 0 16.208 16.207"><g transform="translate(0.707 0.5)"><path d="M3.884,2.787a6.951,6.951,0,1,0,9.831,0,6.951,6.951,0,0,0-9.831,0Z" transform="translate(-0.75 -0.75)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="3.113" y2="3.113" transform="translate(0 11.887)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>
        </button>
        <button
          v-if="viewport.isLessThan('lg')"
          :aria-label="t('closeMenu')"
          @click="openMenu([])"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16"><g transform="translate(-1.999 0.5)"><line x1="20" transform="translate(2.499)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M20,0H0" transform="translate(2.499 7.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/><path d="M20,0H10" transform="translate(2.499 15)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/></g></svg>
        </button>
      </div>
    </div>

    <UiSearch class="pt-[20px] lg:order-1" v-if="isShow" />

    <nav ref="floatingRef">
      <ul class="flex text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] gap-[10px] lg:gap-[20px] xl:gap-[40px] motion-safe:scroll-smooth overflow-x-auto scrollbar-hidden mx-[-20px] lg:justify-center lg:mx-auto pt-[20px] lg:pt-[40px]">
        <li v-for="(menuNode, index) in categoryTree" :key="index">
          <NuxtLink :to="localePath(generateCategoryLink(menuNode))">
            <span
              class="font-light block whitespace-nowrap"
              :class="{'pl-[20px] lg:pl-0': index === 0, 'pr-[20px] lg:pr-0': index === categoryTree.length - 1, 'active': activeNode[index] === menuNode.id}"
              data-testid="category-button"
            >
              {{ categoryTreeGetters.getName(menuNode) }}
            </span>
          </NuxtLink>
        </li>
        <li v-if="viewport.isGreaterOrEquals('lg')" class="flex">
          <button
            :aria-label="t('openSearchModalButtonLabel')"
            @click="toggleSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16.208 16.207"><g transform="translate(0.707 0.5)"><path d="M3.884,2.787a6.951,6.951,0,1,0,9.831,0,6.951,6.951,0,0,0-9.831,0Z" transform="translate(-0.75 -0.75)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="3.113" y2="3.113" transform="translate(0 11.887)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>
          </button>
        </li>
      </ul>
    </nav>

    <div v-if="viewport.isGreaterThan('xl')" class="hidden">
      <nav ref="floatingRef">
        <ul
          class="flex flex-wrap px-6 py-2 bg-white border-b border-b-neutral-200 border-b-solid"
          @blur="
            (event: FocusEvent) => {
              if (!(event.currentTarget as Element).contains(event.relatedTarget as Element)) {
                close();
              }
            }
          "
        >
          <li v-if="categoryTree.length === 0" class="h-10" />

          <li v-for="(menuNode, index) in categoryTree" v-else :key="index">
            <NuxtLink :to="localePath(generateCategoryLink(menuNode))">
              <div
                ref="triggerReference"
                data-testid="category-button"
                class="inline-flex items-center justify-center gap-2 font-medium text-base rounded-md py-2 px-4 group mr-2 !text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-700 active:!bg-neutral-300 active:!text-neutral-900"
                @mouseenter="menuNode.childCount > 0 ? openMenu([menuNode.id]) : openMenu([])"
                @click="menuNode.childCount > 0 ? openMenu([menuNode.id]) : openMenu([])"
              >
                <span>{{ categoryTreeGetters.getName(menuNode) }}</span>
                <SfIconChevronRight
                  v-if="menuNode.childCount > 0"
                  class="rotate-90 text-neutral-500 group-hover:text-neutral-700 group-active:text-neutral-900"
                />
              </div>
            </NuxtLink>

            <div
              v-if="
                isOpen &&
                activeMenu &&
                activeNode.length === 1 &&
                activeNode[0] === menuNode.id &&
                menuNode.childCount > 0
              "
              :key="activeMenu.id"
              ref="megaMenuReference"
              :style="style"
              class="hidden md:grid gap-x-6 grid-cols-4 bg-white shadow-lg p-6 left-0 right-0 outline-none z-40"
              tabindex="0"
              @mouseleave="close()"
              @keydown.esc="focusTrigger(index)"
            >
              <template v-for="node in activeMenu.children" :key="node.id">
                <template v-if="node.childCount === 0">
                  <ul>
                    <SfListItem
                      :tag="NuxtLink"
                      size="sm"
                      :href="localePath(generateCategoryLink(node))"
                      class="typography-text-sm mb-2"
                    >
                      {{ categoryTreeGetters.getName(node) }}
                    </SfListItem>
                  </ul>
                </template>
                <div v-else>
                  <SfListItem
                    :tag="NuxtLink"
                    size="sm"
                    :href="localePath(generateCategoryLink(node))"
                    class="typography-text-base font-medium text-neutral-900 whitespace-nowrap px-4 py-1.5 border-b border-b-neutral-200 border-b-solid"
                  >
                    {{ categoryTreeGetters.getName(node) }}
                  </SfListItem>
                  <ul class="mt-2">
                    <li v-for="child in node.children" :key="child.id">
                      <SfListItem
                        v-if="categoryTreeGetters.getName(child)"
                        :tag="NuxtLink"
                        size="sm"
                        :href="localePath(generateCategoryLink(child))"
                        class="typography-text-sm py-1.5"
                      >
                        {{ categoryTreeGetters.getName(child) }}
                      </SfListItem>
                    </li>
                  </ul>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    
    <template v-else>
      <div v-if="isOpen" class="fixed z-[50] inset-0 bg-black bg-opacity-50" />
      <SfDrawer
        ref="drawerReference"
        v-model="isOpen"
        placement="right"
        class="min-w-[95%] sm:min-w-96 bg-white overflow-y-auto z-[1000]"
      >
        <nav>
          <div class="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid">
            <p class="typography-text-base font-medium">Browse products</p>
            <UiButton variant="tertiary" square :aria-label="t('closeMenu')" class="ml-2" @click="close()">
              <SfIconClose class="text-primary-500" />
            </UiButton>
          </div>
          <ul v-if="activeMenu">
            <li v-if="activeMenu.id !== 0">
              <SfListItem
                size="lg"
                tag="button"
                type="button"
                class="border-b border-b-neutral-200 border-b-solid hover:bg-primary-500 hover:bg-opacity-15 active:bg-primary-500 active:bg-opacity-15"
                @click="goBack()"
              >
                <div class="flex items-center">
                  <SfIconChevronLeft class="text-primary-500" />
                  <p class="ml-5 font-medium">{{ categoryTreeGetters.getName(activeMenu) }}</p>
                </div>
              </SfListItem>
            </li>
            <template v-for="node in activeMenu.children" :key="node.id">
              <li v-if="node.childCount === 0">
                <SfListItem size="lg" :tag="NuxtLink" :href="localePath(generateCategoryLink(node))" @click="close()" class="hover:bg-primary-500 hover:bg-opacity-15 active:bg-primary-500 active:bg-opacity-15">
                  <div class="flex items-center">
                    <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                    <SfCounter v-if="categoryTreeGetters.getCount(node) > 0" class="ml-2 text-xs text-primary-500">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                  </div>
                </SfListItem>
              </li>
              <li v-else>
                <SfListItem
                  size="lg"
                  tag="button"
                  type="button"
                  class="!p-0 hover:bg-primary-500 hover:bg-opacity-15 active:bg-primary-500 active:bg-opacity-15"
                >
                  <div class="flex items-center w-100">
                    <NuxtLink class="flex-1 m-0 p-4 pr-0" :to="localePath(generateCategoryLink(node))" @click="close()">
                      <div class="flex items-center">
                        <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                        <SfCounter v-if="categoryTreeGetters.getCount(node) > 0" class="ml-2 text-xs text-primary-500">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                      </div>
                    </NuxtLink>
                    <div class="flex justify-center items-center h-8 w-16" @click="goNext(node.id)">
                      <SfIconChevronRight class="text-primary-500" />
                    </div>
                  </div>
                </SfListItem>
              </li>
            </template>
          </ul>
        </nav>
      </SfDrawer>
    </template>
  </header>

  <UiModal
    v-if="viewport.isGreaterOrEquals('lg') && isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="h-full md:w-[500px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="t('closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent v-if="isLogin" :is-modal="true" @change-view="isLogin = false" @logged-in="closeAuthentication" />
    <Register v-else :is-modal="true" @change-view="isLogin = true" @registered="closeAuthentication" />
  </UiModal>

  <NuxtLazyHydrate when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton
          :aria-label="t('closeDialog')"
          square
          variant="tertiary"
          class="absolute right-4 top-2"
          @click="searchModalClose"
        >
          <SfIconClose class="text-neutral-500" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
</template>

<style scoped>
header {
  nav {
    .router-link-exact-active {
      > span {
        font-weight: 500;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import {
  SfDropdown,
  SfIconClose,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfCounter,
  SfIconChevronLeft,
  SfIconMenu,
  SfModal,
  useTrapFocus,
  useDropdown,
  useDisclosure,
  SfIconPerson,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import type { MegaMenuProps } from '~/components/MegaMenu/types';
import { paths } from '~/utils/paths';

const { t } = useI18n();
const viewport = useViewport();
const localePath = useLocalePath();
const { buildCategoryMenuLink } = useLocalization();
const { setDrawerOpen } = useDrawerState();
const NuxtLink = resolveComponent('NuxtLink');
const props = defineProps<MegaMenuProps>();
const { close, open, isOpen, activeNode, category, setCategory } = useMegaMenu();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [],
});
const categoryTree = ref(categoryTreeGetters.getTree(props.categories));

const route = useRoute();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
const { wishlistItemIds } = useWishlist();
const { data: cart } = useCart();
const cartItemsCount = ref(0);
const isLogin = ref(true);
const { user, isAuthorized, logout } = useCustomer();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();

onNuxtReady(() => {
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
  },
);

const findNode = (keys: number[], node: CategoryTreeItem): CategoryTreeItem => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(restKeys, node.children?.find((child) => child.id === currentKey) || node);
  } else {
    return node.children?.find((child) => child.id === keys[0]) || node;
  }
};

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};

const drawerReference = ref();
const megaMenuReference = ref();
const triggerReference = ref();

const activeMenu = computed(() => (category.value ? findNode(activeNode.value, category.value) : null));

const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
} as const;
useTrapFocus(
  computed(() => megaMenuReference.value?.[0]),
  trapFocusOptions,
);
useTrapFocus(drawerReference, trapFocusOptions);

const openMenu = (menuType: number[]) => {
  activeNode.value = menuType;
  open();
  setDrawerOpen(true);
};

const goBack = () => {
  activeNode.value = activeNode.value.slice(0, -1);
};

const goNext = (key: number) => {
  activeNode.value = [...activeNode.value, key];
};

const focusTrigger = (index: number) => {
  unrefElement(triggerReference.value[index]).focus();
};

setCategory(categoryTree.value);

watch(
  () => props.categories,
  async (categories: CategoryTreeItem[]) => {
    categoryTree.value = categoryTreeGetters.getTree(categories);
    setCategory(categoryTree.value);
  },
);

const logOut = async () => {
  accountDropdownToggle();
  await logout();
  navigateTo(localePath(paths.home));
};

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};

const headerClass = computed(() => ({
  'z-[10]': isOpen.value,
}));

const isShow = ref(false);

const toggleSearch = () => {
  isShow.value = !isShow.value;
};
</script>