<template>
<div class="flex flex-col items-center lg:items-start pt-[60px] 4xl:pt-[120px] text-center lg:text-left">
    <h1 class="inline-flex items-center font-bold pt-0 text-[14px] sm:text-[18px]">
        <span class="relative pb-[13px]
            after:content-['']
            after:absolute after:left-1/2
            lg:after:left-[0]
            after:ml-[-25%]
            lg:after:ml-0
            after:bottom-[0]
            after:w-1/2
            after:h-[3px]
            after:bg-black">
                Mit Viania fühlst du dich wohl und feminin – den ganzen Tag lang
        </span>
    </h1>
    <div class="flex flex-col gap-[20px] pt-[30px] text-[14px] xl:text-[16px] [&_a]:underline [&_a]:font-semibold">
        <p>Viania ist eine deutsche Traditionsmarke mit Sitz in Mössingen, die seit 1991 Frauen weltweit mit hochwertiger und femininer Wäsche und Dessous versorgt. Die Marke hat sich ausschließlich auf Damen-Unterwäsche spezialisiert, wodurch Sie 
            beim Kauf eines <NuxtLink to="/bhs">BHs</NuxtLink> von unserem langjährigen Know-how profitieren. Jedes Modell wird von unserem Designteam sorgfältig entwickelt und erst wenn unsere eigene Schnittabteilung mit dem Schnitt rundum zufrieden ist, wird das Modell für die 
            Produktion freigegeben. Hochwertige Materialien und eine sorgfältige Verarbeitung runden jedes Produkt ideal ab. Es entspricht unserem Selbstverständnis, dass unsere Modelle dem Öko-Tex100 Standard genügen und wir unsere 
            Produktionsstätten regelmäßig auf die Einhaltung sozialer Standards überprüfen lassen.</p>
                
        <p v-if="!viewport.isLessThan('md') || isExpanded" class="sm:inline-block">
            In unserem Shop finden Sie eine Vielzahl an <NuxtLink to="/bhs">Viania BHs</NuxtLink>. Auch und gerade in großen <NuxtLink to="/bhs?facets=5,6,7">Cup-Größen</NuxtLink>. Je nach Modell bieten wir die Artikel bis Cup G und Unterbrustgröße 110cm an. Atmungsaktive Spacer-Qualitäten finden Sie ebenso wie Schalen- 
            und genähte Spitzen-BH's für unterschiedlichste Zwecke und Anlässe. Das Sortiment von Viania bietet Ihnen geeignete Modelle aus den Bereichen Fashion, Basic und Sport. Im modischen Sektor finden Sie raffinierte und verführerische BHs aus 
            Spitze, in aktuellen modischen Farben sowie Unterwäsche mit Prints oder mit hochwertigen Accessoires, wie z.B. applizierte Strass-Steine. Sie suchen nach einem perfekt sitzenden BH für den Alltag? Wählen Sie ein Modell aus dem Basic-
            Sortiment, das für Sie BHs in neutralen Farben und Designs für den alltäglichen Gebrauch bereithält. Sport-BHs von Viania legen den Fokus auf optimale Unterstützung und Funktionalität. So sind bspw. die meisten Sport-BHs mit einem 
            angenehmen Frottee-Besatz im Unterbrustbereich ausgestattet. So haben Sie auch bei sportlicher Höchstleistung immer ein angenehmes und trockenes Tragegefühl.
        </p>

        <button
            v-if="viewport.isLessThan('md')"
            @click="isExpanded = !isExpanded"
            class="text-center underline hover:no-underline"
            >
            {{ isExpanded ? 'Weniger anzeigen' : 'mehr lesen' }}
        </button>
    </div>

    <ul ref="listRef" class="grid grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-[40px] w-full text-center pt-[40px] xl:pt-[60px] 3xl:pt-[100px]">
        <li 
            v-for="(usp, index) in usps" 
            :key="index"
            class="flex flex-col items-center justify-center gap-[10px] leading-[1.25] xl:leading-[1.5] transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }"
        >
            <div v-html="usp.svg"
                class="w-[100px] h-[100px] bg-[#F5EFEF] flex items-center justify-center rounded-full
                    xl:w-[200px] xl:h-[200px] [&_svg]:xl:w-[100px] [&_svg]:xl:h-[100px]
                    3xl:w-[350px] 3xl:h-[350px] [&_svg]:3xl:w-[150px] [&_svg]:3xl:h-[150px]"
            ></div>
            <h2 v-html="usp.title" class="text-[18px] font-semibold pt-[10px] xl:text-[24px] 3xl:pt-[40px] 3xl:text-[36px] leading-[1.25] 3xl:leading-[1.2]"></h2>
            <p v-html="usp.text" class="text-[14px] mb-auto xl:text-[16px] 3xl:text-[18px] 3xl:pt-[10px]"></p>
        </li>
    </ul>

    <NuxtLink to="#" class="flex justify-center w-full pt-[40px] 3xl:pt-[70px]">
        <SfButton class="3xl:min-h-[50px] 3xl:px-[40px] hover:bg-secondary-600">
            <span class="font-light">Mehr über Viania erfahren</span>
        </SfButton>
    </NuxtLink>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SfButton } from "@storefront-ui/vue";

const viewport = useViewport();
const isExpanded = ref(false);

const listRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.1 }
  );

  if (listRef.value) {
    observer.observe(listRef.value);
  }
});

const usps = [
    {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="51.001" height="51" viewBox="0 0 51.001 51"><g transform="translate(0.501 0.5)"><path d="M43.094,51.843a.517.517,0,0,1-.367-.152L38.23,47.2a.5.5,0,0,1,.707-.707l4.158,4.155,6.792-6.787a.5.5,0,1,1,.707.707l-7.132,7.127A.517.517,0,0,1,43.094,51.843Z" transform="translate(-19.792 -22.605)" fill="#0a0a0a"/><path d="M32.059.5a2.7,2.7,0,0,1,.7.089c1.349.359,2.159,1.723,2.941,3.042a6.583,6.583,0,0,0,1.831,2.314,6.789,6.789,0,0,0,3.031.448c1.5.016,3.054.032,4,.977.963.961.982,2.528,1,4.044a6.7,6.7,0,0,0,.444,2.985,6.7,6.7,0,0,0,2.37,1.867c1.306.769,2.657,1.564,3.013,2.878.35,1.291-.407,2.647-1.139,3.958a6.787,6.787,0,0,0-1.117,2.853,6.585,6.585,0,0,0,1.1,2.738c.756,1.335,1.538,2.715,1.18,4.063S49.689,34.914,48.37,35.7a6.583,6.583,0,0,0-2.314,1.831,6.791,6.791,0,0,0-.448,3.032c-.016,1.5-.032,3.054-.977,4-.961.963-2.528.982-4.043,1A6.7,6.7,0,0,0,37.6,46a6.7,6.7,0,0,0-1.867,2.37c-.769,1.306-1.564,2.657-2.877,3.013a2.59,2.59,0,0,1-.677.088A7.319,7.319,0,0,1,28.9,50.249a6.8,6.8,0,0,0-2.851-1.117,6.578,6.578,0,0,0-2.742,1.1A7.37,7.37,0,0,1,19.942,51.5a2.714,2.714,0,0,1-.7-.089c-1.349-.358-2.158-1.722-2.941-3.042a6.583,6.583,0,0,0-1.831-2.314,6.788,6.788,0,0,0-3.031-.447c-1.5-.016-3.055-.032-4-.977-.963-.961-.982-2.528-1-4.043A6.7,6.7,0,0,0,6,37.6a6.7,6.7,0,0,0-2.37-1.868C2.319,34.965.968,34.17.612,32.857c-.35-1.291.407-2.647,1.139-3.958a6.79,6.79,0,0,0,1.117-2.854,6.582,6.582,0,0,0-1.1-2.738C1.013,21.973.231,20.593.59,19.244S2.312,17.085,3.632,16.3a6.586,6.586,0,0,0,2.314-1.831,6.79,6.79,0,0,0,.447-3.031c.016-1.5.032-3.055.977-4,.961-.963,2.528-.982,4.044-1A6.7,6.7,0,0,0,14.4,5.994a6.7,6.7,0,0,0,1.868-2.37C17.035,2.318,17.83.967,19.144.612a2.589,2.589,0,0,1,.677-.088A7.319,7.319,0,0,1,23.1,1.751a6.8,6.8,0,0,0,2.851,1.117,6.581,6.581,0,0,0,2.741-1.1A7.371,7.371,0,0,1,32.059.5Zm.122,49.976a1.569,1.569,0,0,0,.415-.053c.92-.249,1.61-1.422,2.277-2.555A7.3,7.3,0,0,1,37.1,45.14a7.3,7.3,0,0,1,3.475-.579c1.315-.016,2.675-.033,3.348-.707.657-.658.67-1.944.685-3.305a7.4,7.4,0,0,1,.58-3.519,7.174,7.174,0,0,1,2.671-2.193c1.146-.68,2.332-1.384,2.586-2.338s-.426-2.154-1.083-3.313a7.175,7.175,0,0,1-1.23-3.23,7.4,7.4,0,0,1,1.244-3.342c.664-1.189,1.29-2.311,1.047-3.209-.249-.92-1.421-1.61-2.555-2.277A7.3,7.3,0,0,1,45.14,14.9a7.3,7.3,0,0,1-.578-3.474c-.016-1.315-.033-2.676-.708-3.349-.658-.657-1.944-.67-3.305-.685a7.4,7.4,0,0,1-3.519-.58,7.174,7.174,0,0,1-2.193-2.671c-.68-1.146-1.384-2.332-2.338-2.586a1.716,1.716,0,0,0-.44-.055,6.753,6.753,0,0,0-2.873,1.139,7.175,7.175,0,0,1-3.23,1.23,7.409,7.409,0,0,1-3.342-1.244,6.72,6.72,0,0,0-2.793-1.1,1.568,1.568,0,0,0-.416.053c-.92.249-1.61,1.421-2.277,2.555A7.3,7.3,0,0,1,14.9,6.859a7.3,7.3,0,0,1-3.474.579c-1.315.016-2.675.033-3.348.708-.657.658-.67,1.944-.685,3.305a7.4,7.4,0,0,1-.58,3.518,7.176,7.176,0,0,1-2.671,2.193C3,17.843,1.81,18.546,1.556,19.5s.426,2.154,1.083,3.313a7.172,7.172,0,0,1,1.229,3.23,7.4,7.4,0,0,1-1.244,3.342C1.961,30.575,1.334,31.7,1.577,32.6c.249.919,1.421,1.609,2.555,2.277A7.3,7.3,0,0,1,6.86,37.1a7.3,7.3,0,0,1,.579,3.475c.016,1.315.033,2.675.707,3.348.658.657,1.944.67,3.306.685a7.4,7.4,0,0,1,3.518.58,7.174,7.174,0,0,1,2.193,2.671c.68,1.146,1.384,2.332,2.338,2.585a1.714,1.714,0,0,0,.44.055,6.753,6.753,0,0,0,2.873-1.138,7.173,7.173,0,0,1,3.231-1.229,7.407,7.407,0,0,1,3.342,1.244A6.72,6.72,0,0,0,32.181,50.476Z" transform="translate(-1.001 -1)" fill="#0a0a0a"/><path d="M13.182-.5a13.67,13.67,0,0,1,9.674,23.34,13.688,13.688,0,0,1-19.348,0A13.672,13.672,0,0,1,13.182-.5Zm0,26.344A12.67,12.67,0,0,0,22.149,4.212a12.688,12.688,0,0,0-17.935,0,12.672,12.672,0,0,0,8.967,21.632Z" transform="translate(11.818 11.828)" fill="#0a0a0a"/></g></svg>',
        title: 'Entwickelt<br>in Deutschland',
        text: 'Viania ist eine deutsche Traditionsmarke mit Sitz in Mössingen.'
    },{
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51"><g transform="translate(0.5 0.5)"><path d="M35.581,76.979a3.884,3.884,0,0,1-2.787-1.173L9.569,52.2l.713-.7L33.506,75.1a2.9,2.9,0,0,0,4.149,0,3.036,3.036,0,0,0,0-4.24l-.009-.009-13.1-14.026.731-.683,13.1,14.022a4.04,4.04,0,0,1,0,5.638A3.884,3.884,0,0,1,35.581,76.979Z" transform="translate(-5.638 -26.604)"/><path d="M60.552,71.861a3.546,3.546,0,0,1-2.565-1l-.351-.356.713-.7.351.356a2.559,2.559,0,0,0,1.853.7,3.881,3.881,0,0,0,2.685-1.092,3.036,3.036,0,0,0,0-4.24L50.231,52.2l.716-.7,13,13.327a4.04,4.04,0,0,1,0,5.641A4.915,4.915,0,0,1,60.552,71.861Z" transform="translate(-25.969 -26.604)"/><path d="M71.471,61.387a3.577,3.577,0,0,1-2.658-.9l-.349-.358.715-.7.349.358a2.648,2.648,0,0,0,1.943.6,3.883,3.883,0,0,0,2.685-1.1,3.04,3.04,0,0,0,0-4.24l-12.8-12.913.71-.7,12.8,12.915a4.045,4.045,0,0,1,0,5.644A4.917,4.917,0,0,1,71.471,61.387Z" transform="translate(-31.532 -21.57)"/><path d="M20.315,42.358,4.873,26.665a15.357,15.357,0,0,1,0-21.465,14.787,14.787,0,0,1,21.148,0l.627.628-.708.706-.629-.63a13.787,13.787,0,0,0-19.725,0,14.367,14.367,0,0,0,0,20.062l.408.415L21.027,41.657Z" transform="translate(-1 -1.124)"/><path d="M76.868,45.984h0a3.531,3.531,0,0,1-2.555-.989l-.351-.356.713-.7.351.356a2.545,2.545,0,0,0,1.842.691h0a3.918,3.918,0,0,0,2.711-1.1,3.034,3.034,0,0,0,.006-4.233l-8.429-7.927-.014-.014L61.78,22.193l.713-.7L71.848,31l8.429,7.927.014.014a4.034,4.034,0,0,1,0,5.642A4.952,4.952,0,0,1,76.868,45.984Z" transform="translate(-31.743 -11.599)"/><path d="M4.685,60.423A3.884,3.884,0,0,1,1.9,59.251a4.033,4.033,0,0,1,0-5.642L5.16,50.292l.713.7L2.61,54.31a3.033,3.033,0,0,0,0,4.24,2.9,2.9,0,0,0,4.149,0l.009-.009,3.3-3.185.694.72-3.3,3.181A3.882,3.882,0,0,1,4.685,60.423Z" transform="translate(-1.123 -25.999)"/><path d="M14.972,73.661a3.885,3.885,0,0,1-2.787-1.172,5.067,5.067,0,0,1-1.365-3.442,3.653,3.653,0,0,1,.976-2.6l.351-.356.713.7-.351.356a2.665,2.665,0,0,0-.688,1.894A4.032,4.032,0,0,0,12.9,71.788a2.9,2.9,0,0,0,4.149,0l2.79-2.812.71.7-2.789,2.811A3.883,3.883,0,0,1,14.972,73.661Z" transform="translate(-6.16 -33.901)"/><path d="M25.678,84.455a3.873,3.873,0,0,1-2.786-1.172,5.069,5.069,0,0,1-1.369-3.442,3.687,3.687,0,0,1,.894-2.689.5.5,0,1,1,.71.7,2.89,2.89,0,0,0-.6,1.985,4.033,4.033,0,0,0,1.082,2.741,2.9,2.9,0,0,0,4.149,0l2.417-2.474a.5.5,0,0,1,.715.7l-2.418,2.475A3.893,3.893,0,0,1,25.678,84.455Z" transform="translate(-11.512 -39.252)"/><path d="M59.772,26.774l-.713-.7.35-.357a14.356,14.356,0,0,0,0-20.068,13.787,13.787,0,0,0-19.717,0L27.817,17.717a1.132,1.132,0,0,0-.1,1.463,5.86,5.86,0,0,0,2.447,2.064,4.076,4.076,0,0,0,3.961-.756,84.186,84.186,0,0,0,10.257-9.234l.344-.362.725.689-.344.362A83.276,83.276,0,0,1,34.7,21.3a5.013,5.013,0,0,1-4.9.872,6.842,6.842,0,0,1-2.893-2.41,2.129,2.129,0,0,1,.2-2.75L38.979,4.948a14.787,14.787,0,0,1,21.143,0,15.356,15.356,0,0,1,0,21.47Z" transform="translate(-13.998 -1)"/><path d="M36.378,95.125a3.884,3.884,0,0,1-2.787-1.172l-.014-.015a5.019,5.019,0,0,1-1.336-2.962,3.748,3.748,0,0,1,.946-3.077l.351-.356.713.7L33.9,88.6c-1.156,1.175-.724,3.5.4,4.65l.012.013a2.9,2.9,0,0,0,4.131-.006l3.009-3.28.737.676L39.177,93.94l-.012.013A3.884,3.884,0,0,1,36.378,95.125Z" transform="translate(-16.858 -44.625)"/></g></svg>',
        title: 'Faire<br>Produktion',
        text: 'Seit über 30 Jahren vertrauen wir unseren langjährigen Produktionspartnern.'
    },{
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51"><g transform="translate(0.5 0.5)"><path d="M27.47,56.27A25.163,25.163,0,0,1,5.4,43.629,35.87,35.87,0,0,1,1.892,35.3,33.447,33.447,0,0,1,.645,22.581a35.3,35.3,0,0,1,1.645-7.89.5.5,0,0,1,.457-.342c.455-.016.914-.024,1.365-.024a37.633,37.633,0,0,1,18.093,4.6,39.609,39.609,0,0,1,7.1,4.76A28.075,28.075,0,0,1,36.8,33.76,30.315,30.315,0,0,1,37.97,54.1a.5.5,0,0,1-.3.329A29.205,29.205,0,0,1,27.47,56.27ZM3.131,15.337a34.32,34.32,0,0,0-1.49,7.335A32.452,32.452,0,0,0,2.85,35.008,34.955,34.955,0,0,0,6.26,43.119,24.163,24.163,0,0,0,27.47,55.27a28.727,28.727,0,0,0,9.607-1.684,29.272,29.272,0,0,0-1.193-19.425c-3.777-8.634-10.791-12.5-14.161-14.357a36.63,36.63,0,0,0-17.61-4.48C3.788,15.324,3.46,15.328,3.131,15.337Z" transform="translate(-1 -7.912)"/><path d="M64.556,75.118a.5.5,0,0,1-.154-.024c-.312-.1-.714-.218-1.2-.348a45.476,45.476,0,0,1-29.8-25.536c-.14-.316-.254-.56-.35-.744a.5.5,0,0,1,.888-.46c.1.2.228.464.376.8A44.555,44.555,0,0,0,63.468,73.781c.5.134.914.256,1.242.361a.5.5,0,0,1-.153.976Z" transform="translate(-17.253 -24.618)"/><path d="M66,37.488a.5.5,0,0,1-.21-.954,20.491,20.491,0,0,0,8.3-6.823c4.029-5.7,3.816-11.675,3.714-14.547a27.827,27.827,0,0,0-4.158-13.6,24.823,24.823,0,0,0-5.1,1.79,23.614,23.614,0,0,0-7.332,5.436,23.773,23.773,0,0,0-5.05,8,.5.5,0,1,1-.942-.335,24.71,24.71,0,0,1,5.253-8.339,24.608,24.608,0,0,1,7.641-5.666A25.805,25.805,0,0,1,73.778.511a.5.5,0,0,1,.528.221,28.86,28.86,0,0,1,4.5,14.4,30.491,30.491,0,0,1-.326,6.43,20.987,20.987,0,0,1-7.917,13.255,22.633,22.633,0,0,1-4.354,2.628A.5.5,0,0,1,66,37.488Z" transform="translate(-28.346 -1)"/><path d="M70.847,42.358a.5.5,0,0,1-.476-.654,33.931,33.931,0,0,1,4.5-9.03c.123-.174.237-.345.339-.508a.5.5,0,0,1,.847.532c-.112.178-.235.363-.368.551a32.931,32.931,0,0,0-4.371,8.763A.5.5,0,0,1,70.847,42.358Z" transform="translate(-35.924 -16.716)"/></g></svg>',
        title: 'Gesunde<br>Materialien',
        text: 'Unsere Produkte sind aus zertifizierten Materialien und frei von Schadstoffen.'
    },{
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="51.001" height="51" viewBox="0 0 51.001 51"><g transform="translate(0.5 0.5)"><path d="M46.13,38.079a18.775,18.775,0,1,1,16.413-9.633l2.089,8.742a.5.5,0,0,1-.6.6L55.292,35.7l-.115.062a18.825,18.825,0,0,1-9.044,2.315Zm0-36.579A17.79,17.79,0,0,0,33.553,31.869a17.673,17.673,0,0,0,12.578,5.21h0A17.826,17.826,0,0,0,54.7,34.886l.287-.155a.5.5,0,0,1,.354-.046l8.133,1.944L61.527,28.5a.5.5,0,0,1,.031-.322l.026-.056q.01-.021.021-.041A17.793,17.793,0,0,0,46.131,1.5Z" transform="translate(-14.421 -1)" fill="#1d1d1b"/><path d="M19.287,65.495a18.8,18.8,0,0,1-9.046-2.317l-.112-.061L1.39,65.206a.5.5,0,0,1-.6-.6l2.09-8.741A18.8,18.8,0,0,1,14.609,28.5a.5.5,0,0,1,.248.969A17.8,17.8,0,0,0,3.816,55.492q.011.019.02.038l.026.056a.5.5,0,0,1,.032.325L1.949,64.044,10.083,62.1a.5.5,0,0,1,.354.047l.283.153A17.8,17.8,0,0,0,36.564,50.964a.5.5,0,1,1,.971.238A18.788,18.788,0,0,1,19.287,65.495Z" transform="translate(-1 -14.995)" fill="#1d1d1b"/></g></svg>',
        title: 'Echte<br>Beratung',
        text: 'Persönliche Beratung wird bei VIANIA in den Shops großgeschrieben.'
    }
]
</script>