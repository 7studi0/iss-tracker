/** @type {import('next').NextConfig} */

const webpack = require('webpack');

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/cesium'),
        'process.env': {
          CECIUM_ACCESS_TOKEN: JSON.stringify(process.env.CECIUM_ACCESS_TOKEN),
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
