// apps/web/modules/runtime/composables/useViewport.ts
import { ref, onMounted, onUnmounted, computed } from 'vue';

console.log('Custom useViewport composable loaded');

const breakpoints = {
  'not-loaded': 0,
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
  console.log('useViewport called');
  
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

  const updateWidth = () => {
    width.value = window.innerWidth;
    console.log('Viewport width updated:', width.value);
  };

  onMounted(() => {
    console.log('useViewport mounted');
    updateWidth();
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    console.log('useViewport unmounted');
    window.removeEventListener('resize', updateWidth);
  });

  const breakpoint = computed<Breakpoint>(() => {
    const currentWidth = width.value;
    
    // For debugging
    console.log('Current width:', currentWidth);
    
    if (currentWidth === 0) return 'not-loaded'; // Default during SSR
    
    if (currentWidth >= breakpoints['3xl']) return '4xl';
    if (currentWidth >= breakpoints['2xl']) return '3xl';
    if (currentWidth >= breakpoints.xl) return '2xl';
    if (currentWidth >= breakpoints.lg) return 'xl';
    if (currentWidth >= breakpoints.md) return 'lg';
    if (currentWidth >= breakpoints.sm) return 'md';
    if (currentWidth >= breakpoints.xs) return 'sm';
    if (currentWidth >= breakpoints.xxs) return 'xs';
    return 'xxs';
  });

  return {
    width,
    breakpoint,
    isLessThan: (bp: Breakpoint) => {
      const result = width.value < breakpoints[bp];
      return result;
    },
    isGreaterThan: (bp: Breakpoint) => {
      const result = width.value > breakpoints[bp];
      return result;
    },
    isGreaterOrEquals: (bp: Breakpoint) => {
      const result = width.value >= breakpoints[bp];
      return result;
    }
  };
}

export default useViewport;