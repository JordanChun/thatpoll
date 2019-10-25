const withCSS = require('@zeit/next-css');
function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  webpack(config) {
    HACK_removeMinimizeOptionFromCssLoaders(config);
    return config;
  },
});
/*
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
  /*
  webpack: (config, { isServer }) => {
    if (isServer) {
      const bootstrapStyles = /bootstrap\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(bootstrapStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: bootstrapStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})
*/
