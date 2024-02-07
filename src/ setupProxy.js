const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://my-account.ap-northeast-2.elasticbeanstalk.com ',
            changeOrigin: true,
        })
    );
};