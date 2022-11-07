let base;
let baseRef;
const topMargin = 25;
const examples = [
  {value: '', label: 'Select Dataset Examples'},
  {value: 'svg', label: 'SVG'},
  {value: 'sol lewitt', label: 'Sol Lewitt'},
  {value: 'javascript arrays', label: 'JavaScript Arrays'},
  {value: 'd3 selection', label: 'D3 Selection Exploration'},
  {value: 'd3 plots', label: 'D3 Scatter Plot'}
];

const changeSrc = (selectedIndex, value) => {
  if(selectedIndex!=0) {
    document.getElementById('root').childNodes.forEach(child => child.remove());
    document.getElementById('root').innerHTML = "";
    document.getElementById('outHTML').innerHTML = "";
    if (value.search(".js") > 0) {
      setSource(document.getElementById('outHTML'), value);
    } else if (value.search(".html") > 0) {
      setHTML(document.getElementById('outHTML'), value);
    }
    document.getElementById('sel').selectedIndex=0;
    document.title =  
      document
        .getElementById('sel')
        .getElementsByTagName('option')[selectedIndex]
        .innerText;
  } 
};

const display = (obj, out) => {
  let newArray = [];
  eval(obj);
  if(!out) {
    out = eval(obj);
  }
  if(out && typeof(out) == 'string') {
    eval
  }
  let res = '';
  let ret = '';
  let func = '';
  if(newArray.length > 0) {
    newArray.forEach(d => {res += d + '<br>';});
    obj.split('\n').forEach(d => {
      func += d.search('newArray') > 0 ? '' : '\n' + d;
      if(obj.search('return') > 0) {
        ret += d.search('newArray') > 0 || d.search('console.log') > 0 ? 
          '' : d;     
      }
    });
    if(obj.search('return') > 0) {
      res += '\n' + eval(ret);
    }
    obj = func;  
  }
  document.getElementById('root').innerHTML = `
  <h3>Function or Method:</h3>
  <pre>${obj}</pre>
  ${!out ? '' : typeof(out) == 'string' ? (res ? '' : 
  '<h3>Output Caller:</h3>' + 
  '<pre>' + out + '</pre>') + '<h3>Output:</h3>' + (
    res ? res : jsonPretty(eval(out))) : '<h3>Output:</h3>' + jsonPretty(out)
  }`;
  if(out && out != 'newArray') {
    console.log(typeof(out) == 'string' ? eval(out) : out);
  }
};

const getExamples = () => {
    const group = document.createElement('select');
    group.setAttribute('onchange', 'loadGroup(selectedIndex, value)');
    group.id = 'group'; 
    for (example of examples) {
      opt = document.createElement('option');
      opt.value = example.value;
      opt.innerHTML = example.label;
      group.appendChild(opt);
    }
    const container = document.getElementsByClassName('container')[0];
    if(container.firstChild) {
      container.insertBefore(group, container.firstChild);
    } else {
      container.appendChild(group);
    }
  };

const jsonPretty = (obj) => {
  if((JSON.stringify(obj)).search('{') >= 0) {
    return '<pre>' + JSON.stringify(obj, null, 2) + '</pre>';
  }
  return JSON.stringify(obj);
};

const loadGroup = (selectedIndex, value) => {
  if(selectedIndex != 0) {
    let file = '/index.html';
    if(value === 'd3 plots' && window.location.href.startsWith('file')) {
      file = '/local.html';
    }
    document.location.href = baseRef + value + file;
    document.getElementById('group').selectedIndex=0;
  }
}

const loadScripts = (location, scripts) => { 
  let ret; 
  for(let file of scripts) {
    const id = file + 'App';
    if(!document.getElementById(id)) {
      ret = true;
      const script = document.createElement('script');
      script.id = id;
      script.src = `${location + file}.js`;
      document.getElementById('outHTML').appendChild(script);
    }
  }
  return ret;
};

const reload = (href) => {
  baseRef = href;
  if (!document.getElementById('group')) {
    getExamples();
  }
};

const run = () => (
  document
    .getElementById('outHTML')
    .firstChild.src
    .split('#')[1]
    .replace(/%20/g, ' ')
);

const scriptPath = (level=0) => ((
  line = (new Error()).stack.split('\n')[level + 1].split('@'). pop(),
  line.substr(0, line.lastIndexOf('/') + 1).replace(window.location.href, '')
));

const setHTML = (el, value) => (
  el.innerHTML = `
  <br>
    <iframe 
      width='100%' 
      height='${innerHeight - 52}' 
      src='${value}' 
      class='inHTML'
    ></iframe>`
);

const setSource = (el, value) => {
  app = document.createElement('script');
  app.id = 'app';
  app.src = value;
  el.appendChild(app);
};

String.prototype.toProperCase = function() {
  const words = this.replace('_', ' ').split(' ');
  let results = [];
  for(let word of words) {
    const letter = word.charAt(0).toUpperCase();
    results.push(letter + word.slice(1));
  }
  return results.join(' ');
};

const summarizePlot = (group, data, xAxis, yAxis) => {
  var wn = window.open('', '_blank', `height=300, width=300`);
  wn.document.write(`<pre>${
    JSON.stringify(
      Object.fromEntries(
        Object.entries(
          {
            Columns: data.columns,
            group: data
              .map(d => d[group])
              .filter(function(v, i, self) { 
                  return self.indexOf(v) === i;
                }
              ),
            xAxis,
            yAxis
          }
        ).map(([key, value]) => 
          [`${key == 'group' ? group.toProperCase() : key}`, value]
        )
    ), null, 2)
  }</pre>`);
  wn.document.close();
};
