module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,svg,woff2,woff,eot,ttf}',
  ],
  swDest: 'dist/sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
      },
    },
    {
      urlPattern: /https:\/\/fonts\.googleapis\.com\/(.*)/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts',
      },
    },
    {
      urlPattern: /https:\/\/cdn\.example\.com\/(.*)/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'external-api',
      },
    },
  ],
};
