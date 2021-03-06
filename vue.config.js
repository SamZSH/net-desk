module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/web/xlmc',
                // target: 'http://demo.itlike.com/web/xlmc',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/pay': {
                target: 'http://47.98.157.152/WXPayProject/pay',
                changeOrigin: true,
                pathRewrite: {
                    '^/pay': ''
                }
            },
        }
    }
};