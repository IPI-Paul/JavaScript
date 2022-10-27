import jsx from '/usr/lib/node_modules/rollup-plugin-jsx';

const path = './mouse/js/getPosition/';

export default {
  input: `${path}index.js`,
  output: {
    file: `${path}bundle.js`,
    format: 'iife',
    name: 'D3_DataViz',
    exports: 'named', 
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    jsx({factory: 'React.createElement'})
  ]
};