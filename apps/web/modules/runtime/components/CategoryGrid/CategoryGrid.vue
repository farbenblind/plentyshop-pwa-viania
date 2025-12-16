<template>
<div class="pt-[60px] 4xl:pt-[120px]">
    <h3 class="font-bold pt-0 text-center lg:text-left text-[14px] sm:text-[18px]">
        <span class="relative pb-[13px] after:content-[''] after:absolute after:left-1/2 lg:after:left-[0] after:ml-[-25%] lg:after:ml-0 after:bottom-[0] after:w-1/2 after:h-[3px] after:bg-black">Beliebte Kategorien</span>
    </h3>
    <ul ref="categoriesRef" class="grid grid-cols-2 lg:grid-cols-4 gap-[10px] xl:gap-[20px] pt-[40px] xl:pt-[50px]">
        <li 
            v-for="(category, index) in categories" 
            :key="category.link"
            class="transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }"
        >
            <NuxtLink :to="category.link" class="relative block h-0 pb-[100%] rounded-[5px] xl:rounded-[10px] overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/5 group">
                <NuxtImg :src="category.image" class="absolute top-0 left-0 w-full h-full group-hover:scale-[1.05] origin-bottom transition-transform duration-[300ms]" loading="lazy" />
                <SfButton
                    class="absolute left-1/2 bottom-5 -translate-x-1/2 transition-transform duration-[300ms]
                        flex items-center justify-center min-h-[40px]
                        px-3 py-1.5 rounded-md
                        bg-white text-black font-light leading-tight whitespace-nowrap
                        text-sm lg:text-lg z-10
                        sm:text-[16px]
                        md:px-[20px] md:bottom-[40px]
                        lg:text-[18px] lg:min-h-[50px]
                        group-hover:bg-black group-hover:scale-[1.25] origin-bottom"
                ><span v-text="category.title" class="text-black block w-full font-light group-hover:text-white"></span></SfButton>
            </NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { SfButton } from "@storefront-ui/vue";

const cdnUrl = 'https://cdn02.plentymarkets.com/w73p32remdlq/frontend';

const categoriesRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Entering viewport - trigger animation
          isVisible.value = true;
        } else {
          // Leaving viewport - reset for next time
          isVisible.value = false;
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the categories grid is visible
  );

  if (categoriesRef.value) {
    observer.observe(categoriesRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const categories = [
    {
        title: "Brasilianos",
        image: cdnUrl + "/pwa/categories/1.jpg",
        link: "/unterteile/strings-brasilianos"
    },
    {
        title: "BH-Hemden",
        image: cdnUrl + "/pwa/categories/2.jpg",
        link: "/bh-hemden"
    },
    {
        title: "Strings",
        image: cdnUrl + "/pwa/categories/3.jpg",
        link: "/unterteile/strings"
    },
    {
        title: "Sport-Bhs",
        image: cdnUrl + "/pwa/categories/4.jpg",
        link: "/bhs/sport"
    },
    {
        title: "Dirndl-Bhs",
        image: cdnUrl + "/pwa/categories/5.jpg",
        link: "/bhs/dirndl-bhs"
    },
    {
        title: "Mieder-Slips",
        image: cdnUrl + "/pwa/categories/6.jpg",
        link: "/miederslips"
    },
    {
        title: "Bügel-Bhs",
        image: cdnUrl + "/pwa/categories/7.jpg",
        link: "/bhs/buegel-bhs"
    },
    {
        title: "Bikini-Slips",
        image: cdnUrl + "/pwa/categories/8.jpg",
        link: "/unterteile/slips"
    }
]
</script>