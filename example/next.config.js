const path = require('node:path');

module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/react-menu',
  turbopack: {
    root: path.join(__dirname, '..')
  }
};
