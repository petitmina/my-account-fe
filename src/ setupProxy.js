const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://mina-my-account.netlify.app',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' 
            }
        })
    );
};