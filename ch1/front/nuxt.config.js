module.exports = {
  head: {
    title: 'NodeBird',
    meta: [{
      charset: 'utf-8',
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
    }, {
      'http-equiv':'X-UA-Compatible', content: 'IE=edge',
    }, {
      name: 'description', content: '강프루의 NodeBird SNS',
    }, {
      hid:'ogtitle', name: 'og:title', content: 'NodeBird',
    }, {
      hid:'ogdescription', name: 'og:description', content: '강프루의 NodeBird SNS',
    }, {
      property: 'og:type', content: 'website',
    }, {
      hid: 'ogimage', property: 'og:image', content: 'https://vue.nodebird.com/vue-nodebird.png'
    }, {
      hid: 'ogurl', property: 'og:url', content: 'https://vue.nodebird.com',
    }],
    link: [{ rel: 'shortcut icon', href: '/vue-nodebird.png' }],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['ko'],
  },
  build: {
    analyze: true,
    extend(config, { isServer, isClient, isDev}) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
    },
  },
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false,
  },
  server: {
    port: 3081,
  },
};
