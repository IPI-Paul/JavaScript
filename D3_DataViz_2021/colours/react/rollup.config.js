import jsx from '/usr/lib/node_modules/rollup-plugin-jsx';

const path = './js/bar chart modular/stylized/';

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