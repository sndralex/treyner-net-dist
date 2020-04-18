module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
