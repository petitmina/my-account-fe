const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://main--incandescent-taffy-74c839.netlify.app',
      changeOrigin: true,
    })
  );
};