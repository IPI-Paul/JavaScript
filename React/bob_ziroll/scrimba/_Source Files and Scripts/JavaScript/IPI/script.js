let base;
let baseRef;
const topMargin = 25;
let ex;
const examples = [
  {value: '', label: 'Select Dataset Examples'},
  {value: 'React_Facts', label: 'React Facts'}
];

const changeSrc = (selectedIndex, value) => {
  if(selectedIndex!=0) {
    // document.getElementById('root').innerHTML = "";
    document.getElementById('outHTML').innerHTML = "";
    if (value.search("#") > 0) {
      ex = value.split('#')[1];
      ReApp();
    } else if (value.search(".js") > 0) {
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

  const loadGroup = (selectedIndex, value) => {
    if(selectedIndex != 0) {
      document.location.href = baseRef + value + '/index.html';
      document.getElementById('group').selectedIndex=0;
    }
  };

  const loadScripts = (location, scripts) => new Promise(resolve => { 
    let ret;
    for(let file of scripts) {
      const id = file + 'App';
      if(!document.getElementById(id)) {
        ret = true;
        const script = document.createElement('script');
        script.id = id;
        script.type = 'module';
        script.src = `${location + file}.js`;
        document.getElementById('outHTML').appendChild(script);
      }
    }
    loadWait(resolve, ret, scripts);
  });
  
  const loadWait = (resolve, ret, scripts) => {
    let waitTime = numWait => new Promise(resolve => {
      const message = `Loading: ${scripts}`
      setTimeout(() => resolve(message), numWait * 50)
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
  
  const setSource = async (el, value) => {
    app = document.createElement('script');
    app.id = 'app';
    app.src = value.split('#')[0];
    app.type = 'text/babel';
    app.setAttribute('data-presets', 'react');
    app.setAttribute('data-type', 'module');
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