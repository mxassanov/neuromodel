// use named JS bundles
mix.config.webpackConfig.output = {
  chunkFilename: 'js/[name].bundle.js',
  publicPath: '/',
};

// alias the ~/resources folder
mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': `${__dirname}/resources`,
    },
  },
});
