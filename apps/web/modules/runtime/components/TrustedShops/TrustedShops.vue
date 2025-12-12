<template>
<div class="pt-[60px] 4xl:pt-[120px] xl:grid xl:grid-cols-[auto_430px] gap-[40px] 3xl:gap-[80px] xl:max-w-[90%] xl:mx-auto">
    <div v-if="data && data.reviews" class="xl:min-w-0">
        <div class="relative">
            <Carousel v-bind="carouselConfig"
              class="text-center"
              ref="carousel"
              v-model="currentSlide">
                <Slide v-for="(review, index) in data.reviews" :key="index">
                    <div class="p-4 xl:p-0 flex flex-col gap-[10px] h-full">
                        <div class="inline-flex items-center justify-between truncate mx-auto">
                            <div class="flex gap-[0] text-[#FCC72F]">
                                <svg v-for="star in 5" :key="star" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]" viewBox="0 0 24 24">
                                    <defs>
                                        <linearGradient :id="`star-${star}`">
                                        <stop offset="50%" stop-color="currentColor"/>
                                        <stop offset="50%" stop-color="#fff"/>
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"
                                        :fill="star <= review.rating ? 'currentColor' : (star - 0.5 <= review.rating ? `url(#star-${star})` : '#fff')"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-[18px] xl:text-[24px] leading-[1.35] px-[20px] sm:px-[40px] 3xl:px-[60px] my-auto">{{ viewport.isLessOrEquals('sm') ? truncateText(review.comment, 20) : truncateText(review.comment, 30) }}</p>
                        <p class="text-[12px] xl:text-[14px]">{{ review.name.trim() }}, {{ formatDate(review.submittedAt) }}</p>
                    </div>
                </Slide>
            </Carousel>
            <!-- custom arrows -->
            <button @click="carousel?.prev()" :class="carouselArrowClasses + ' left-[-20px]'">
              <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
            <button @click="carousel?.next()" :class="carouselArrowClasses + ' right-[-20px] rotate-180'">
              <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
            </button>
        </div>
    </div>

    <div class="bg-[#F8F8F8] mx-[-20px] mt-[40px] xl:mx-0 xl:mt-0 xl:rounded-[10px]" v-if="data">
        <div class="px-[20px] py-[30px] xl:px-[30px] grid grid-cols-[auto_100px] max-w-[400px] mx-auto xl:max-w-[inherit] xl:h-full">
            <div class="text-[12px] xl:text-[14px] my-auto">
                <div class="flex align-center gap-[10px]">
                    <span class="font-semibold text-[18px] xl:text-[24px]">{{ data?.rating365.toString().replace('.',',') }}</span>

                    <div class="inline-flex align-center truncate self-center">
                        <div class="flex gap-[0] text-[#FCC72F]">
                          <svg v-for="star in 5" :key="star" class="w-[17px] h-[17px] xl:w-[22px] xl:h-[22px]" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <defs>
                              <clipPath :id="`half-clip-${star}`" clipPathUnits="objectBoundingBox">
                                <!-- clip left half; rect x,y,width,height in objectBoundingBox (0..1) -->
                                <rect x="0" y="0" width="0.5" height="1" />
                              </clipPath>
                            </defs>

                            <!-- base grey star -->
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              :fill="star - 0.5 <= data?.rating365 ? '#cccccc' : '#cccccc'"
                            />

                            <!-- yellow overlay only when half or full required -->
                            <path
                              v-if="star - 0.5 <= data?.rating365"
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              fill="#FCC72F"
                              :clip-path="star <= data?.rating365 ? '' : `url(#half-clip-${star})`"
                            />
                          </svg>
                        </div>
                    </div>
                </div>
                <div class="pt-[10px]">{{ data.count365 }} Bewertungen (letzte 12 Monate)</div>
                <div class="font-semibold">{{ data.overallCount }} Bewertungen (gesamt)</div>
                <div class="text-[10px] pt-[5px] font-normal">Stand: {{ formatDate(data.calculatedAt) }}</div>
            </div>
            <NuxtLink to="https://www.trustedshops.de/bewertung/info_XC6D0E273FECA9A8F9DF2ADD8B4DAD48C.html" target="_blank" class="flex m-auto">
                <NuxtImg src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/ts-badge.png" loading="lazy" />
            </NuxtLink>
        </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
      <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
    </svg>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import 'vue3-carousel/dist/carousel.css';
import type { CarouselExposed } from 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';

const viewport = useViewport();

const carousel = ref<CarouselExposed>();
const carouselArrowClasses = 'absolute z-10 top-0 bottom-0 p-4 bg-white hover:scale-110 transition-transform duration-300';

interface Review {
  name: string;
  title: string;
  comment: string;
  rating: number;
  submittedAt: string;
}

interface RatingData {
  rating365: number;
  count365: number;
  overallCount: number;
  calculatedAt: string;
  reviews: Review[];
}

const data = ref<RatingData | null>(null)
const dataLoaded = ref(false)

const fakeData = {
  "rating365": 4.81,
  "count365": 145,
  "overallCount": 335,
  "calculatedAt": "2025-12-12T10:00:00.000Z",
  "reviews": [
    {
      "name": "Community-Mitglied",
      "title": "Sehr schnelle Lieferung",
      "comment": "Sehr schnelle Lieferung. Eine Größe passt bei jedem Modell. Sehr bequem. Gerne wieder.",
      "rating": 5,
      "submittedAt": "2025-11-30T00:00:00.000Z"
    },
    {
      "name": "Eva B.",
      "title": "Diesmal 5 Sterne",
      "comment": "Diesmal 5 Sterne, weil alles super abgewickelt wurde, vor allem die problemlose Retoure. Habe die Artikel sofort in der richtigen Größe nachbestellt. Kundenservice top!",
      "rating": 5,
      "submittedAt": "2025-09-27T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Schnelle Lieferung und Erstattung",
      "comment": "Schnelle Lieferung und im Fall von Rücksendung sehr schnelle Erstattung",
      "rating": 5,
      "submittedAt": "2025-12-05T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Sehr schnelle Lieferung",
      "comment": "Sehr schnelle Lieferung, heute bestellt am nächsten Tag bekommen. Kundenbetreuung, einfach super. Sofortige Antwort bei Anfragen, und Reklamation. Würde bei Viania jederzeit wieder bestellen.",
      "rating": 5,
      "submittedAt": "2025-08-17T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Superschneller Versand",
      "comment": "Superschneller Versand - top Qualität - alles bestens - gerne wieder - vielen Dank !!!",
      "rating": 5,
      "submittedAt": "2025-11-06T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Superschneller Versand",
      "comment": "Superschneller Versand - top Qualität - alles bestens - gerne wieder - vielen Dank !!!",
      "rating": 5,
      "submittedAt": "2025-11-03T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Einfach super",
      "comment": "Wahre Bestellt und innerhalb von 3 Tag ist sie bei mir gewesen. Alles passt, trotzdem wurde vorsorglich schon ein Returenschein ausgestellt falls benötigt.",
      "rating": 5,
      "submittedAt": "2025-09-03T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Superschneller Versand",
      "comment": "Superschneller Versand - top Qualität - alles bestens - gerne wieder - vielen Dank !!!",
      "rating": 5,
      "submittedAt": "2025-10-29T00:00:00.000Z"
    },
    {
      "name": "Beate K.",
      "title": "Gute Auswahlmöglichkeiten",
      "comment": "Gute Auswahlmöglichkeiten und schnelle Lieferung. Bei der Lieferung auf Rechnung, fände ich es gut, wenn vorher ein Hinweis auf den Rechnungsdienstleister erfolgen würde",
      "rating": 5,
      "submittedAt": "2025-09-21T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Die schnelle Lieferung und die Passgenauigkeit",
      "comment": "Die schnelle Lieferung und die Passgenauigkeit.",
      "rating": 5,
      "submittedAt": "2025-11-03T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Schnelle Lieferung",
      "comment": "Schnelle Lieferung, gute Qualität!",
      "rating": 5,
      "submittedAt": "2025-11-12T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Schnelle Lieferung",
      "comment": "schnelle Lieferung, Top Artikel",
      "rating": 5,
      "submittedAt": "2025-11-11T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Sehr schnelle Lieferung",
      "comment": "Sehr schnelle Lieferung\nSuper Passform",
      "rating": 5,
      "submittedAt": "2025-10-26T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Toller Shop - leider Versand mit GLS",
      "comment": "Die Produkte sind toll und der Shop zuverlässig. Ein BH war leider verschnitten (richtig falsch, abweichend vom Modell in anderen Farben), aber man will prüfen, ob das die gesamte Charge so ist und mir bescheid geben, ob ich einen neuen ohne Fehler bestellen kann.\nEigentlich müsste man 1 Punkt abziehen, weil mit GLS geliefert wird. Das macht die Retoure kompliziert. Aber ich warte erst einmal, ob ich eine Nachricht zum Produktmangel bekomme. Bislang belohne ich erst einmal die Freundlichkeit.",
      "rating": 5,
      "submittedAt": "2025-07-22T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Tolle passform",
      "comment": "Leider habe ich falsche Größe bestellt somit musste ich meine Bestellung wieder zurücksenden, aber ich habe somit erfahren das es in Mössingen ein Outlet von euch gibt , da bin ich hingefahren und habe dort die richtige Größe gefunden und gekauft",
      "rating": 5,
      "submittedAt": "2025-09-13T00:00:00.000Z"
    },
    {
      "name": "Community-Mitglied",
      "title": "Gute Qualität",
      "comment": "Gute Qualität. Die Bh's und Slips trage ich sehr gerne. Die Passform bei 36 F ist sehr gut.\nNur die Verpackung beim Versand sollte besser werden. Die Pakete sind schon mal kaputt, in das letzte konnte man reinschauen weil es nicht richtig zu geklebt war.",
      "rating": 4,
      "submittedAt": "2025-07-31T00:00:00.000Z"
    }
  ]
};

const carouselConfig = {
  itemsToShow: 1,
  autoplay: 5000,
  pauseAutoplayOnHover: true,
  transition: 500,
  wrapAround: true,
};

const currentSlide = ref(0);

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  })
}

const truncateText = (text: string, maxWords: number = 30): string => {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

onMounted(async () => {
  try {
    const response = await fetch('https://www.vianiashop.com/rest/cytTrustedShops/ratings')
    data.value = await response.json() as RatingData
    dataLoaded.value = true
  } catch (error) {
    console.error('Failed to load ratings:', error)
    data.value = fakeData as unknown as RatingData
    dataLoaded.value = true
    console.log('Fake Data loaded')
  }
})
</script>