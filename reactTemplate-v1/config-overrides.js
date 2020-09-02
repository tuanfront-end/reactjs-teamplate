const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CreateLazyComponent = require('./webpack-plugins/CreateLazyComponent');

const configuration = {
  jsOutput: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  cssOutput: {
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css',
  },
  vendor: {
    filename: 'static/js/vendors/vendor-[name].js',
  },
};

function rewireProduction(config, type) {
  return {
    ...config,
    devtool: false,
    output: {
      ...config.output,
      filename: configuration.jsOutput.filename,
      chunkFilename: configuration.jsOutput.chunkFilename,
    },
    plugins: [
      ...config.plugins.map((item, index) => {
        if (!(item.options && item.options.filename && item.options.filename.includes('.css'))) {
          return item;
        }
        return new MiniCssExtractPlugin({
          filename: configuration.cssOutput.filename,
          chunkFilename: configuration.cssOutput.chunkFilename,
        });
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        maxInitialRequests: Infinity,
        minSize: 10000,
        chunks(chunk) {
          return !chunk.name.includes('Lazy');
        },
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: configuration.vendor.filename,
            chunks(chunk) {
              return chunk.name === 'main';
            },
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight(item => item);
              const allChunksNames = chunks.map(item => item.name).join('~');
              // check import module in styles
              if (module.context.includes('src/styles')) {
                return '_vendors';
              }
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return type === 'function' ? `${cacheGroupKey}-${allChunksNames}-${moduleFileName}` : packageName.replace('@', '');
            },
          },
        },
      },
    },
  };
}

function rewireDevelopment(config) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new CreateLazyComponent({
        input: 'src/components',
        output: 'src/lazy',
        autoDeleteFileEnabled: true,
      }),
    ],
  };
}

module.exports = function override(config, env) {
  const isDev = env === 'development';
  if (isDev) {
    return rewireDevelopment(config);
  }
  return rewireProduction(config);
};
