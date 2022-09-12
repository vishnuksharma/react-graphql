const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log("Proxy calling")
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://api.sorare.com/',
      changeOrigin: true,
    })
  );
};