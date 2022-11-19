let base;
let baseRef;
const topMargin = 45;
const srcDataJs = '../_Source Files and Scripts/SourceFiles/js/';
const examples = [
  {value: '', label: 'Select Dataset Examples', data: ''},
  {value: 'canvas', label: 'Canvas'},
  {value: 'cars', label: 'Cars'},
  {value: 'charts', label: 'Plots and Charts'},
  {value: 'legends', label: 'Colour and Size Legends'},
  {value: 'map', label: 'Maps'},
  {value: 'shapes', label: 'Shapes'},
  {value: 'tree', label: 'Tree Visualisation'}
];

const changeSrc = (selectedIndex, value) => {
  if(selectedIndex!=0) {
    document.getElementById('code').innerHTML = "";
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

const linesToObject = (data, sep) => {
  sep = sep ? sep : ',';
  let results = [];

  const format = d => {
    if(d.length > 0) {
      if(d.search('"') >= 0 && sep !== '\t') {
        let i = 0, conv = '';
        for(let c of d) {
          c === '"' && i++
          if(c !== '"') {
            conv += i == 1 && c === ',' ? '¬' : c;
          }
          i = i > 1 ? 0 : i;
        }
        results.push(conv.split(sep).map(d => d.replace(/¬/g, ',')))
      } else {
        results.push(d.split(sep))
      }
    }
  }
  data
    .split('\n')
    .forEach(format);
  const keys = results[0];
  results.splice(0,1);
  return results.map(r => 
    Object.fromEntries(keys.map((d, i) => [d, r[i]]))
  )
};

const loadData = (location, scripts, extend) => new Promise(resolve => { 
  if(!extend) {
    extend = 1;
  }
  // dataSources = examples.filter(
  //   d => d.value === location.href.split('/').filter(d => d.length > 0).pop(0)
  // )[0].data;
  // if(dataSources) {
  //   loadData(dataSources)
  // }
  let ret; 
  let idx = 0;
  for(let file of scripts) {
    const id = file + 'App';
    if(!document.getElementById(id)) {
      if(idx == 0) {
        document.getElementById('data').innerHTML = "";
        idx++;
      }
      ret = true;
      const script = document.createElement('script');
      script.id = id;
      script.src = `${location + file}.js`;
      document.getElementById('data').appendChild(script);
    }
  }
  loadWait(resolve, ret, scripts, extend);
  return ret;
});

const loadGroup = (selectedIndex, value) => {
  if(selectedIndex != 0) {
    document.location.href = baseRef + value + '/index.html';
    document.getElementById('group').selectedIndex=0;
  }
}

const loadScripts = (location, scripts, extend) => new Promise(resolve => { 
  let ret;
  if(!extend) {
    extend = 1;
  }
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
  loadWait(resolve, ret, scripts, extend);
});

const loadWait = (resolve, ret, scripts, extend) => {
  let waitTime = numWait => new Promise(resolve => {
    const message = `Loading: ${scripts}`;
    setTimeout(() => resolve(message), numWait * 50 * extend);
  })
  
  App = async () => {
    await waitTime(scripts.length)
      .then(message => console.log(message));
      resolve(ret);
  };
  App();
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