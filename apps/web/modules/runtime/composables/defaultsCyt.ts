import { defaults as baseDefaults } from '../../../app/composables/defaults';

const DEFAULT_ITEMS_PER_PAGE = 24;
const DEFAULT_FEEDBACK_ITEMS_PER_PAGE = 6;
const PER_PAGE_STEPS: number[] = [24, 48, 72];

export const defaults = {
  ...baseDefaults,
  DEFAULT_ITEMS_PER_PAGE,
  PER_PAGE_STEPS,
  DEFAULT_FEEDBACK_ITEMS_PER_PAGE,
};