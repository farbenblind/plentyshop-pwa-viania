<template>
  <div :class="{ 'sticky top-0 bg-white z-[10] animate-slide-down is-slim-header border-b border-[#e5e5e5] [&_nav>ul]:pt-0 [&_nav>ul>li>a>span]:pb-[20px] [&_nav>a]:pb-[20px] [&_nav>span]:pb-[20px]': isSlimHeader }">
    <MegaMenu :categories="categoryTree" :isSlimHeader="isSlimHeader"></MegaMenu>
  </div>

  <UiModal
    v-if="viewport.isGreaterOrEquals('md') && isAuthenticationOpen"
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
</template>

<style>
.animate-slide-down {
  animation: slideDown 0.3s ease-in-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

#__nuxt {
  > div {
    width: 100% !important;
  }
}
</style>
  
<script setup lang="ts">
import {
  SfIconClose,
  useDisclosure,
} from '@storefront-ui/vue';

import { paths } from '~/utils/paths';

const isLogin = ref(true);
const NuxtLink = resolveComponent('NuxtLink');
const { t, localeCodes } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree } = useCategoryTree();
const { user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();

watch(
  () => isAuthenticationOpen.value,
  async () => {
    isLogin.value = true;
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

// sticky header
const isSlimHeader = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const isScrollingUp = currentScrollY < lastScrollY;
  
  // Show sticky header when scrolled > 250px AND scrolling up
  if (currentScrollY > 250 && isScrollingUp) {
    isSlimHeader.value = true;
  } else {
    isSlimHeader.value = false;
  }
  
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>