module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/placeholder-app/' : '/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
};