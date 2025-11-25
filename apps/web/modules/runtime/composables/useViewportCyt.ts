// apps/web/modules/runtime/composables/useViewportCyt.ts
import { ref, onMounted, onUnmounted, computed } from 'vue';

const breakpoints = {
  xxs: 320,
  xs: 380,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1640,
  '4xl': 1840,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useViewport() {
  const width = ref(0);
  const isMounted = ref(false);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    isMounted.value = true;
    updateWidth();
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  const breakpoint = computed<Breakpoint>(() => {
    const currentWidth = width.value;
    if (currentWidth === 0) return 'xxs'; // Default during SSR

    // Find the largest breakpoint that's less than or equal to current width
    const matchingBreakpoint = (Object.entries(breakpoints) as [Breakpoint, number][])
      .sort((a, b) => b[1] - a[1])
      .find(([_, bpWidth]) => currentWidth >= bpWidth);

    return matchingBreakpoint ? matchingBreakpoint[0] : 'xxs';
  });

  const isReady = computed(() => isMounted.value && width.value > 0);

  return {
    width,
    breakpoint,
    isReady,
    isLessThan: (bp: Breakpoint) => width.value < breakpoints[bp],
    isGreaterThan: (bp: Breakpoint) => width.value > breakpoints[bp],
    isGreaterOrEquals: (bp: Breakpoint) => width.value >= breakpoints[bp]
  };
}

export default useViewport;