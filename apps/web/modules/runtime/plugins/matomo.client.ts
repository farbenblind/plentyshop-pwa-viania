import { MATOMO_CONTAINER_URL, MATOMO_COOKIE_NAME } from '../utils/matomo';
import type { MatomoWindow } from '../utils/types';

/**
 * Loads the Matomo Tag Manager (Matomo Cloud) only after the user accepted the Matomo cookie
 * in the cookie group "Statistik". Revoking consent reloads the page (cookie bar default),
 * so the script is never active without consent.
 */
const loadMatomoTagManager = () => {
  if (document.querySelector(`script[src="${MATOMO_CONTAINER_URL}"]`)) {
    return;
  }

  const matomoWindow = window as MatomoWindow;
  const _mtm = (matomoWindow._mtm = matomoWindow._mtm || []);
  _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });

  const script = document.createElement('script');
  script.async = true;
  script.src = MATOMO_CONTAINER_URL;
  document.head.appendChild(script);
};

export default defineNuxtPlugin(() => {
  const { consent } = useCookieConsent(MATOMO_COOKIE_NAME);

  watch(
    consent,
    (accepted) => {
      if (accepted) {
        loadMatomoTagManager();
      }
    },
    { immediate: true },
  );
});
