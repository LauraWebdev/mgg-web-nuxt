export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Discover & Share! ~ MyGarage.games',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'MyGarage.games ~ a free platform to discover and share creations made in Nintendo\'s Game Builder Garage.' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap' },
            { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/vuex-persist', ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/pwa',
        'nuxt-i18n'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    i18n: {
        detectBrowserLanguage: {
            alwaysRedirect: true,
            onlyOnRoot: true,
        },
        strategy: 'no_prefix',
        lazy:true,
        locales: [{
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js',
        }, {
            code: 'de',
            iso: 'de-DE',
            file: 'de-DE.js',
        }, {
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR.js',
        }, {
            code: 'nl',
            iso: 'nl-NL',
            file: 'nl-NL.js',
        }, {
            code: 'kr',
            iso: 'ko-KR',
            file: 'ko-KR.js',
        }],
        loadLanguagesAsync: true,
        langDir: 'lang/',
        defaultLocale: 'en',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        friendlyErrors: false,
    }
}
