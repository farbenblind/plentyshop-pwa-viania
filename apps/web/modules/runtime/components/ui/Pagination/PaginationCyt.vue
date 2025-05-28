<template>
  <nav
    class="flex justify-between items-end pt-[30px]"
    role="navigation"
    :aria-label="t('pagination')"
    data-testid="pagination"
  >
    <UiButton
      size="lg"
      :aria-label="t('prevAriaLabel')"
      :disabled="pagination.selectedPage <= 1 || disabled"
      variant="tertiary"
      class="gap-3"
      data-testid="pagination-previous"
      @click="previousPage"
    >
      <template #prefix>
        <SfIconChevronLeft />
      </template>
      <span class="hidden sm:inline-flex">{{ t('prev') }}</span>
    </UiButton>
    <ul class="flex justify-center gap-[10px]">
      <li v-if="!pagination.pages.includes(1)">
        <div
          :class="[
            'flex',
            { 'font-medium border-t-4 !border-primary-500': pagination.selectedPage === 1 },
          ]"
        >
          <button
            type="button"
            :class="[
              'px-4 py-3 md:w-12 rounded-md text-neutral-500',
              {
                'hover:bg-black hover:text-primary-800 active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.selectedPage === 1 || disabled"
            :aria-label="getAriaLabel(pagination.selectedPage === 1 || disabled, 1)"
            @click="setPage(1)"
          >
            1
          </button>
        </div>
      </li>
      <li v-if="pagination.startPage > 2">
        <div class="flex">
          <button type="button" disabled aria-hidden="true" class="px-4 py-3 md:w-12 rounded-md">
            ...
          </button>
        </div>
      </li>
      <li v-if="shouldDisplayPreviousLink">
        <div class="flex">
          <button
            type="button"
            :class="[
              'px-4 py-3 md:w-12 rounded-md',
              {
                'hover:bg-black hover:text-primary-800 active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.endPage - 1 === pagination.selectedPage"
            :aria-label="getAriaLabel(pagination.endPage - 1 === pagination.selectedPage, pagination.endPage - 1)"
            :disabled="disabled"
            @click="setPage(pagination.endPage - 1)"
          >
            {{ pagination.endPage - 1 }}
          </button>
        </div>
      </li>
      <li v-for="page in pagination.pages" :key="`page-${page}`">
        <div
          :class="[
            'flex border-transparent',
            { 'font-medium !border-primary-500': pagination.selectedPage === page },
          ]"
        >
          <button
            type="button"
            :class="[
              'px-4 py-3 md:w-12 rounded-md border border-[#E5E5E5]',
              {
                'hover:bg-black hover:!text-white active:bg-black active:text-white': !disabled,
              },
              {
                '!bg-black !text-white hover:!text-white active:!text-white': pagination.selectedPage === page,
              },
            ]"
            :aria-current="pagination.selectedPage === page"
            :aria-label="getAriaLabel(pagination.selectedPage === page, page)"
            :disabled="disabled"
            @click="setPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </li>
      <li v-if="shouldDisplayNextLink">
        <div class="flex">
          <button
            type="button"
            :class="[
              'px-4 py-3 md:w-12 rounded-md',
              {
                'hover:bg-black hover:text-white active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-label="t('goToPage', { page: 2 })"
            :disabled="disabled"
            @click="setPage(2)"
          >
            2
          </button>
        </div>
      </li>
      <li v-if="pagination.endPage < pagination.totalPages - 1">
        <div class="flex">
          <button type="button" disabled aria-hidden="true" class="px-4 py-3 md:w-12 rounded-md">
            ...
          </button>
        </div>
      </li>
      <li v-if="!pagination.pages.includes(pagination.totalPages)">
        <div
          :class="[
            'flex',
            { 'font-medium border-t-4 !border-primary-500': pagination.selectedPage === pagination.totalPages },
          ]"
        >
          <button
            type="button"
            :class="[
              'px-4 py-3 md:w-12 rounded-md text-neutral-500',
              {
                'hover:bg-black hover:text-primary-800 active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.totalPages === pagination.selectedPage"
            :aria-label="getAriaLabel(pagination.totalPages === pagination.selectedPage, pagination.selectedPage)"
            :disabled="disabled"
            @click="setPage(pagination.totalPages)"
          >
            {{ pagination.totalPages }}
          </button>
        </div>
      </li>
    </ul>
    <UiButton
      size="lg"
      :aria-label="t('nextAriaLabel')"
      :disabled="pagination.selectedPage >= pagination.totalPages || disabled"
      variant="tertiary"
      class="gap-3"
      data-testid="pagination-next"
      @click="nextPage"
    >
      <span class="hidden sm:inline-flex">{{ t('next') }}</span>
      <template #suffix>
        <SfIconChevronRight />
      </template>
    </UiButton>
  </nav>
</template>

<script setup lang="ts">
import { SfIconChevronLeft, SfIconChevronRight, usePagination } from '@storefront-ui/vue';
import type { PaginationProps } from '~/components/ui/Pagination/types';

const { updatePage } = useCategoryFilter();
const { t } = useI18n();

const {
  currentPage,
  currentPageName = 'page',
  pageSize,
  totalItems,
  maxVisiblePages: maxVisiblePagesProperty,
  disabled = false,
} = defineProps<PaginationProps>();

const pagination = computed(() =>
  reactive(
    usePagination({
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      maxPages: maxVisiblePagesProperty,
    }),
  ),
);

const getAriaLabel = (isCurrent: boolean, page: number) => {
  return t(isCurrent ? 'currentPage' : 'goToPage', { page });
};

const setPage = (page: number) => {
  updatePage(page.toString(), currentPageName);
  pagination.value.setPage(page);
};

const previousPage = () => {
  setPage(pagination.value.selectedPage - 1);
};

const nextPage = () => {
  setPage(pagination.value.selectedPage + 1);
};

const shouldDisplayPreviousLink: boolean =
  maxVisiblePagesProperty === 1 &&
  pagination.value.totalPages > 1 &&
  pagination.value.selectedPage === pagination.value.totalPages;

const shouldDisplayNextLink: boolean =
  maxVisiblePagesProperty === 1 && pagination.value.totalPages > 1 && pagination.value.selectedPage === 1;
</script>
