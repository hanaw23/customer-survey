// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Customer Survey",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "viewport-fit=cover, width=device-width, initial-scale=1",
      meta: [
        { hid: "og:title", name: "og:title", content: "Customer Survey" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  srcDir: "src",
  devtools: {
    enabled: false,
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  plugins: [{ src: "~/plugins/primevue.ts" }],
  build: {
    transpile: ["primevue"],
  },
  tailwindcss: {
    cssPath: "~/src/assets/css/main.css",
    exposeConfig: true,
    viewer: false,
  },
  css: ["primevue/resources/primevue.min.css", "primeicons/primeicons.css", "primevue/resources/themes/aura-light-blue/theme.css"],
});
