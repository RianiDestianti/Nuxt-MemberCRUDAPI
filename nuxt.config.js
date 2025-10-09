export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { 
        rel: 'stylesheet', 
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' 
      },
      { 
        rel: 'stylesheet', 
        href: '/assets/style.css' 
      },
      { 
        rel: 'stylesheet', 
        href: '/assets/main.css' 
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
        defer: true
      },
      // {
      //   src: 'https://cdn.tailwindcss.com',
      //   defer: true
      // }
    ]
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [
    '~/plugins/api.js',
    '~/plugins/swal.js'
  ],

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:8080', 
  },

  build: {
    extend (config, ctx) {
    }
  }
}