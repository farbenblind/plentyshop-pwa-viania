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
                        <p class="text-[12px] xl:text-[14px]">{{ review.name }}, {{ formatDate(review.submittedAt) }}</p>
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
                    <span class="font-semibold text-[18px] xl:text-[24px]">{{ data?.rating365 }}</span>

                    <div class="inline-flex align-center truncate self-center">
                        <div class="flex gap-[0] text-[#FCC72F]">
                            <svg v-for="star in 5" :key="star" class="w-[17px] h-[17px] xl:w-[22px] xl:h-[22px]" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient :id="`star-${star}`">
                                    <stop offset="50%" stop-color="currentColor"/>
                                    <stop offset="50%" stop-color="#fff"/>
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="none"
                                    :fill="star <= data?.rating365 ? 'currentColor' : (star - 0.5 <= data?.rating365 ? `url(#star-${star})` : '#ccc')"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="pt-[10px]">{{ data.count365 }} Bewertungen (letzte 12 Monate)</div>
                <div class="font-semibold">{{ data.overallCount }} Bewertungen (gesamt)</div>
                <div>Stand: {{ formatDate(data.calculatedAt) }}</div>
            </div>
            <div class="flex m-auto">
                <NuxtImg src="https://cdn02.plentymarkets.com/w73p32remdlq/frontend/ts-badge.png" loading="lazy" />
            </div>
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
const carouselArrowClasses = 'absolute z-10 mt-1/2 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300';

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

const fakeData = {"rating365":4.39,"count365":481,"overallCount":24363,"calculatedAt":"2025-12-11T04:07:51.861Z","reviews":[{"name":"Tina","title":"Schneller Versand trotz Black Friday und Vorweihnachtszeit","comment":"Super schneller Versand, Schuhe (Dr. Martens Sinclair) waren wie auf der Website abgebildet und kamen ohne M\u00e4ngel und gut verpackt bei mir an. Zum super schnapper Preis am Black Friday! Vielen Dank!","rating":5,"submittedAt":"2025-12-10T21:01:06.000Z"},{"name":"Hubert","title":"gut","comment":"Produkt , Preis und Leistung - alles OK","rating":5,"submittedAt":"2025-12-10T11:34:44.000Z"},{"name":"Sindy","title":"Alles bestens \u2764\ufe0f","comment":"Alles bestens , tolle Schuhe !!!","rating":5,"submittedAt":"2025-12-09T16:17:42.000Z"},{"name":"Kerrin ","title":"Empfehlenswert ","comment":"Tolle Schuhauswahl, schneller Versand, gute Retourenregelung ","rating":5,"submittedAt":"2025-12-09T05:26:17.000Z"},{"name":"Sabine","title":"Retouren Abwicklung","comment":"Die Auswahl sowie die schnelle Lieferung verdienen 5 Sterne, email werden z\u00fcgig beantwortet und sehr freundlich dazu. Warum ich trotz dieser wirklich postiven Bewertung nur drei Sterne gebe h\u00e4ngt mit der Abwicklung der Retouren zusammen. Nach der Retoure erh\u00e4lt man erst drei Wochen sp\u00e4ter sein Geld zur\u00fcck, dies ist absolut unakzeptabel und unfair.","rating":3,"submittedAt":"2025-12-08T15:39:38.000Z"},{"name":"Patrick ","title":"Toller Onlineshop","comment":"Tolles Warenangebot, fixe Lieferung und eine gute Kommunikation!\nIch empfehle diesen Shop uneingeschr\u00e4nkt und liebend gerne weiter!","rating":5,"submittedAt":"2025-12-08T12:50:58.000Z"},{"name":"Joachim","title":"Perfekte Beschreibung und Passform.","comment":"Schnelle Lieferung, gute Verpackung. Sehr sch\u00f6ne liebevolle Verpackung im Schuhkarton selbst. Schuhe wie beschrieben, sehr angenehm zu tragen, Gr\u00f6\u00dfe perfekt! Jederzeit wieder!","rating":5,"submittedAt":"2025-12-07T21:15:57.000Z"},{"name":"Daniel","title":"Herrenstiefel ","comment":"Ich bin sehr zufrieden mit der Qualit\u00e4t des Produkts und der Kommunikation mit Ihrem Assistenten ","rating":5,"submittedAt":"2025-12-07T15:51:08.000Z"},{"name":"Jutta ","title":"Empfehlenswerter Anbieter ","comment":"Gute Website, schnelle Abwicklung, gute Verpackung und \u2026 tolle Schuhe!","rating":5,"submittedAt":"2025-12-06T18:21:19.000Z"},{"name":"Thorsten","title":"Zum ersten Mal hier bestellt und mehr als zufrieden","comment":"Ich habe im Schuhhaus M\u00fcller einen passenden und bequemen Schuh gefunden. Dieser war gegen\u00fcber anderen Anbietern weit aus g\u00fcnstiger. Von der Bestllung bis hin zur Lieferung hat alles sehr gut geklappt. Nun freue ich mich \u00fcber meine neuen Schuhe. ","rating":5,"submittedAt":"2025-12-06T15:59:08.000Z"},{"name":"Katja","title":"Hervorragend ","comment":"Schnell, einfach, beste Preise","rating":5,"submittedAt":"2025-12-06T09:02:27.000Z"},{"name":"Katharina ","title":"Bearbeitung Retouren viel zu lange ","comment":"Versand war schnell, leider dauert die Bearbeitung von Retouren 14 Tage. Das bedeutet man bezahlt bei Rechnungskauf Schuhe, die man l\u00e4ngst zur\u00fcckgesendet hat. Das ist absolut nicht mehr zeitgem\u00e4\u00df. Eine weitere Retoure ist noch nicht best\u00e4tigt, obwohl sie bereits l\u00e4nger angekommen ist. ","rating":3,"submittedAt":"2025-12-06T07:19:59.000Z"},{"name":"Angelika","title":"Schnelle korrekte Lieferung bezahlen\u2026","comment":"Schnelle korrekte Lieferung bezahlen mit Rechnung super Preis\/ Leistung ","rating":5,"submittedAt":"2025-12-05T18:47:10.000Z"},{"name":"Gabriele","title":"Ich habe mir sehr warme Winterschuhe\u2026","comment":"Ich habe mir sehr warme Winterschuhe der Firma Uggs bestellt, die f\u00fcr Temperaturen bis -30 Grad geeignet sein sollen. Die Empfehlung des Schuhhauses, eine Nummer gr\u00f6\u00dfer zu w\u00e4hlen, war absolut perfekt. Die Schuhe wirken sehr hochwertig, f\u00fchlen sich sofort angenehm an und machen einen robusten Eindruck. ","rating":5,"submittedAt":"2025-12-03T20:37:11.000Z"},{"name":"Marion","title":"Leider waren die Schuhe in der sonst\u2026","comment":"Leider waren die Schuhe in der sonst \u00fcblichen Gr\u00f6\u00dfe viel zu gro\u00df.\nPreis und Lieferzeit waren super!","rating":4,"submittedAt":"2025-12-01T17:38:01.000Z"},{"name":"EDYTA ","title":"Die Schuhe sind sehr leicht und\u2026","comment":"Die Schuhe sind sehr leicht und bequem.sitzen gut am Fu\u00df..Der Service und Lieferung waren schnell.Sehr zu emfehlen.Danke","rating":5,"submittedAt":"2025-12-01T15:13:46.000Z"},{"name":"Maximilian","title":"Wie immer alles bestens","comment":"Wie immer alles bestens. Vielen Dank ","rating":5,"submittedAt":"2025-11-30T18:55:56.000Z"},{"name":"K. ","title":"Erste Bestellung - alles in Ordnung","comment":"Das war meine erste Bestellung bei diesem H\u00e4ndler. Hat einwandfrei geklappt. \u00dcber - aus meiner Sicht unbedeutende - Lieferverz\u00f6gerung aufgrund einer gro\u00dfen Zahl an Bestellungen wurde ich informiert. Also guter Service","rating":5,"submittedAt":"2025-11-29T15:19:38.000Z"},{"name":"Uschi","title":"Sehr sch\u00f6ne Schuhe","comment":"Sehr sch\u00f6ne Schuhe. Die Lieferzeit war etwas l\u00e4nger, aber das Warten hat sich gelohnt.","rating":5,"submittedAt":"2025-11-29T10:35:06.000Z"},{"name":"Uschi","title":"Sehr sch\u00f6ne Schuhe!","comment":"Sehr sch\u00f6ne Schuhe!","rating":5,"submittedAt":"2025-11-26T20:35:53.000Z"}]}

const carouselConfig = {
  itemsToShow: 1,
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