const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      'react/jsx-runtime': path.resolve(__dirname, './src/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './src/jsx-dev-runtime'),
    }
  },
};
