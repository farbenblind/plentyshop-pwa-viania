import { defineNuxtPlugin, useHead } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  if(import.meta.client) {
    useHead({
      script: [
        `
        if ( localStorage.getItem("singleColumn") == 'true' ) {
          document.body.classList.add( 'single-column' );
        }
        `
      ]
    });
  }
});