// eslint-disable-next-line custom-rules/file-organization-types
type CookieScripts = {
  [key: string]: () => void;
};

// eslint-disable-next-line custom-rules/file-organization-types
type MatomoWindow = Window & { _mtm?: Record<string, unknown>[] };

const MATOMO_CONTAINER_URL = 'https://cdn.matomo.cloud/trigger01.matomo.cloud/container_6WxfOZMG.js';

const cookieScripts: CookieScripts = {
  loadExampleScript: () => {
    // Implementation of loadExampleScript
  },
  /**
   * Matomo Tag Manager (Matomo Cloud). Runs only after the user accepted the Matomo cookie
   * in the cookie group "Statistik" (see cookie.config.ts).
   */
  matomoTagManager: () => {
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
  },
  // Add other scripts if needed
};

export default cookieScripts;
