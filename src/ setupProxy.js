const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://main--incandescent-taffy-74c839.netlify.app',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' 
            }
        })
    );
};