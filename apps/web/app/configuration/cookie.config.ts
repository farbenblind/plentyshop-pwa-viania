import type { CookieGroupFromNuxtConfig } from '@plentymarkets/shop-core';

export default {
  configHash: '',
  barTitle: 'CookieBar.about.label',
  barDescription: 'CookieBar.about.description',
  groups: [
    {
      id: 0,
      name: 'CookieBar.essentials.label',
      accepted: true,
      showMore: false,
      description: 'CookieBar.essentials.description',
      cookies: [
        {
          name: 'CookieBar.essentials.cookies.payPal.name',
          Provider: 'CookieBar.essentials.cookies.payPal.provider',
          Status: 'CookieBar.essentials.cookies.payPal.status',
          PrivacyPolicy: '/PrivacyPolicy',
          Lifespan: 'Session',
          accepted: true,
        },
        {
          name: 'CookieBar.essentials.cookies.plentyId.name',
          Provider: 'CookieBar.essentials.cookies.plentyId.provider',
          Status: 'CookieBar.essentials.cookies.plentyId.status',
          PrivacyPolicy: '/PrivacyPolicy',
          Lifespan: 'Session',
          accepted: true,
        },
        {
          name: 'CookieBar.essentials.cookies.consentCookie.name',
          Provider: 'CookieBar.essentials.cookies.consentCookie.provider',
          Status: 'CookieBar.essentials.cookies.consentCookie.status',
          PrivacyPolicy: '/PrivacyPolicy',
          Lifespan: '100 days',
          accepted: true,
        },
        {
          name: 'CookieBar.essentials.cookies.cloudflareTurnstile.name',
          Provider: 'CookieBar.essentials.cookies.cloudflareTurnstile.provider',
          Status: 'CookieBar.essentials.cookies.cloudflareTurnstile.status',
          PrivacyPolicy: '/PrivacyPolicy',
          Lifespan: '100 days',
          accepted: true,
        },
      ],
    },
    {
      id: 1,
      name: 'CookieBar.externalMedia.label',
      showMore: false,
      description: 'CookieBar.externalMedia.description',
      cookies: [],
    },
    {
      id: 2,
      name: 'CookieBar.functional.label',
      showMore: false,
      description: 'CookieBar.functional.description',
      cookies: [],
    },
    {
      id: 3,
      name: 'CookieBar.statistics.label',
      showMore: false,
      description: 'CookieBar.statistics.description',
      cookies: [
        {
          name: 'CookieBar.statistics.cookies.matomo.name',
          Provider: 'CookieBar.statistics.cookies.matomo.provider',
          Status: 'CookieBar.statistics.cookies.matomo.status',
          PrivacyPolicy: 'https://matomo.org/matomo-cloud-privacy-policy/',
          Lifespan: 'CookieBar.statistics.cookies.matomo.lifespan',
          cookieNames: ['^_pk_id\\.', '^_pk_ses\\.', '^_pk_ref\\.'],
          script: ['matomoTagManager'],
        },
      ],
    },
    {
      id: 4,
      name: 'CookieBar.marketing.label',
      showMore: false,
      description: 'CookieBar.marketing.description',
      cookies: [],
    },
  ],
} as CookieGroupFromNuxtConfig;
