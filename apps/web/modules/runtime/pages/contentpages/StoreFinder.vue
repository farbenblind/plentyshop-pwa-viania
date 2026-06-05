<template>
  <div class="max-w-screen-3xl mx-auto px-[20px]">
    <div class="mb-10">
      <h1 class="font-bold text-3xl mb-4">Unsere Ladengeschäfte</h1>
      <p class="text-gray-700 leading-relaxed max-w-3xl">
        Machen Sie Ihre Shoppingtour zum Genuss! In unseren zahlreichen Filialen bundesweit erwarten Sie jede Menge tolle Produkte und unser freundliches Team, das Sie kompetent berät. Schauen Sie vorbei und entdecken Sie Ihre Favoriten – wir freuen uns auf Sie!
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="(store, index) in stores"
        :key="index"
        :href="store.url"
        class="group block bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
      >
        <h2 class="font-semibold text-xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {{ store.name }}
        </h2>
        
        <div class="space-y-1 text-gray-600 text-sm mb-4">
          <p>{{ store.address }}</p>
          <p>{{ store.city }}</p>
        </div>

        <div class="inline-flex items-center gap-2 text-gray-900 font-medium text-sm group-hover:gap-3 transition-all duration-200">
          Zum Store
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Store {
    name: string;
    address: string;
    city: string;
    url: string;
  }

  const stores: Store[] = [
    {
      name: 'Albstadt-Ebingen',
      address: 'Bahnhofstr. 28',
      city: '72458 Albstadt',
      url: 'https://viania.com/de/shop/albstadt-ebingen',
    },
    {
      name: 'Bad Füssing',
      address: 'Kurallee 22',
      city: '94072 Bad Füssing',
      url: 'https://viania.com/de/shop/bad-fuessing',
    },
    {
      name: 'Bad Münstereifel',
      address: 'Orchheimer Str. 40',
      city: '53902 Bad Münstereifel',
      url: 'https://viania.com/de/shop/bad-muenstereifel',
    },
    {
      name: 'Bad Waldsee',
      address: 'Entenmoos 3',
      city: '88339 Bad Waldsee',
      url: 'https://viania.com/de/shop/bad-waldsee',
    },
    {
      name: 'Bernau am Chiemsee',
      address: 'Chiemseestraße 88',
      city: '83233 Bernau am Chiemsee',
      url: 'https://viania.com/de/shop/bernau',
    },
    {
      name: 'Geislingen',
      address: 'Fabrikstraße 40',
      city: '73312 Geislingen an der Steige',
      url: 'https://viania.com/de/shop/geislingen',
    },
    {
      name: 'Limbach-Oberfrohna',
      address: 'Chemnitzer Str. 52',
      city: '09212 Limbach-Oberfrohna',
      url: 'https://viania.com/de/shop/limbach-oberfrohna',
    },
    {
      name: 'Marl',
      address: 'Marler Stern 28-29',
      city: '45768 Marl',
      url: 'https://viania.com/de/shop/marl',
    },
    {
      name: 'Mettlach',
      address: 'Freiherr-vom-Stein-Straße 20',
      city: '66693 Mettlach',
      url: 'https://viania.com/de/shop/mettlach',
    },
    {
      name: 'Mössingen',
      address: 'Christophstraße 20',
      city: '72116 Mössingen',
      url: 'https://viania.com/de/shop/moessingen',
    },
    {
      name: 'Oberstaufen',
      address: 'Bahnhostraße 8',
      city: '87534 Oberstaufen',
      url: 'https://viania.com/de/shop/oberstaufen',
    },
    {
      name: 'Pfronten',
      address: 'Allgäuerstr. 26',
      city: '87459 Pfronten',
      url: 'https://viania.com/de/shop/pfronten',
    },
    {
      name: 'Rostock',
      address: 'Am Handelspark 3',
      city: '18184 Broderstorf',
      url: 'https://viania.com/de/shop/rostock',
    },
    {
      name: 'Selb',
      address: 'Vielitzer Str. 30',
      city: '95100 Selb',
      url: 'https://viania.com/de/shop/selb',
    },
    {
      name: 'Torgau',
      address: 'Hafenstraße 4',
      city: '04860 Torgau',
      url: 'https://viania.com/de/shop/torgau',
    },
    {
      name: 'Tönisvorst',
      address: 'Maysweg 3',
      city: '47918 Tönisvorst',
      url: 'https://viania.com/de/shop/tönisvorst',
    },
    {
      name: 'Wadgassen',
      address: 'Saarstraße 20',
      city: '66787 Wadgassen',
      url: 'https://viania.com/de/shop/wadgassen',
    },
    {
      name: 'Zwiesel',
      address: 'Dr. Schott Str. 23',
      city: '94227 Zwiesel',
      url: 'https://viania.com/de/shop/zwiesel',
    },
  ];
</script>