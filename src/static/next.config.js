const withSass = require('@zeit/next-sass')

module.exports = withSass({
  cssModules: true,
  module: {
    rules: [
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  postcssLoaderOptions: { autoprefixer: true },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
})
