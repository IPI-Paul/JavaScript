import jsx from '/usr/lib/node_modules/rollup-plugin-jsx';

const iPath = './';
const dPath = './religion & population/';

export default {
  input: `${iPath}index.js`,
  output: {
    file: `${dPath}bundle.js`,
    format: 'iife',
    name: 'D3_DataViz',
    exports: 'named', 
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      useState: 'React.useState',
      useCallBack: 'React.useCallback'
    }
  },
  plugins: [
    jsx({factory: 'React.createElement'})
  ]
};