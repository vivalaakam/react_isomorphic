import fs from 'fs';
import path from 'path';

const PROJECT_SRC = path.resolve(__dirname, '../src');

const babelrc = fs.readFileSync(path.join('.babelrc'));
let babelLoaderQuery = {};

try {
  babelLoaderQuery = JSON.parse(babelrc);
} catch (err) {
  console.error('Error parsing .babelrc.');
  console.error(err);
}
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
babelLoaderQuery.plugins.push('react-transform');
babelLoaderQuery.extra = babelLoaderQuery.extra || {};
babelLoaderQuery.extra['react-transform'] = {
  transforms: [{
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  }]
};

export default {
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      query: babelLoaderQuery,
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  },
  resolve: {
    alias: {
    },
    extensions: ['', '.js']
  }
};
