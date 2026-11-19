import type { CookieGroup } from '@plentymarkets/shop-core';

export const MATOMO_CONTAINER_URL = 'https://cdn.matomo.cloud/trigger01.matomo.cloud/container_6WxfOZMG.js';

/** Cookie name in the cookie bar; also the key for useCookieConsent(). */
export const MATOMO_COOKIE_NAME = 'CookieBar.statistics.cookies.matomo.name';

/** The cookie bar group the statistics group is inserted before. */
export const MARKETING_COOKIE_GROUP_NAME = 'CookieBar.marketing.label';

/**
 * Cookie group "Statistik" with the Matomo entry. Added to the cookie bar by modules/index.ts,
 * the script itself is loaded by plugins/matomo.client.ts once the cookie is accepted.
 */
export const statisticsCookieGroup = {
  id: 0,
  name: 'CookieBar.statistics.label',
  showMore: false,
  description: 'CookieBar.statistics.description',
  cookies: [
    {
      name: MATOMO_COOKIE_NAME,
      Provider: 'CookieBar.statistics.cookies.matomo.provider',
      Status: 'CookieBar.statistics.cookies.matomo.status',
      PrivacyPolicy: 'https://matomo.org/matomo-cloud-privacy-policy/',
      Lifespan: 'CookieBar.statistics.cookies.matomo.lifespan',
      cookieNames: ['^_pk_id\\.', '^_pk_ses\\.', '^_pk_ref\\.'],
    },
  ],
} as CookieGroup;
