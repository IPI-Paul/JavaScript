import vega from 'vega';
import vegaLite from 'vega-lite';
import vl from 'vega-lite-api';
import { Handler } from 'vega-tooltip';
import { config } from './config';
import { getData } from '../../_data/religion/getData';
import { viz } from './religion & population/viz';

vl.register(vega, vegaLite, {
  view: { renderer: 'svg' }, 
  init: view => { view.tooltip(new Handler().call); }
});

const run = async () => {
  const marks = viz
    .data(await getData())
    .width(window.innerWidth)
    .height(window.innerHeight - 20)
    .autosize({ type: 'fit', contains: 'padding' })
    .config(config)

    document.body.appendChild(await marks.render());
};
run();