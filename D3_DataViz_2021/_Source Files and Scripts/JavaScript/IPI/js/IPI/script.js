let base;
let baseRef;

const changeSrc = (selectedIndex, value) => {
  if(selectedIndex!=0) {
    if (document.getElementsByTagName('div').length > 1) {
      document.location.href = `${base}?${selectedIndex}`;
    } 
    if (value.search(".js") > 0) {
      setBody(document.getElementById('app'), value);
    } else {
      document.location.href = value;
    }
    document.getElementById('sel').selectedIndex=0;
  } 
};

const getExamples = (path) => {
  let xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      const examples = document.createElement('select');
      examples.setAttribute('onchange', 'loadGroup(selectedIndex, value)');
      examples.id = 'group';
      examples.innerHTML = xmlhttp.responseText;
      const container = document.getElementsByClassName('container')[0];
      if(container.firstChild) {
        container.insertBefore(examples, container.firstChild);
      } else {
        container.appendChild(examples);
      }
    }
  };
  xmlhttp.open("GET", path, true);
  xmlhttp.send();
};

const loadGroup = (selectedIndex, value) => {
  if(selectedIndex != 0) {
    document.location.href = baseRef + value;
    document.getElementById('group').selectedIndex=0;
  }
}

const reload = (href) => {
  baseRef = href;
  let param = document.location.href.split('?');
  base = param[0];
  if (param.length > 1) {
    document.getElementById('app').src = 
      document.getElementById('sel').getElementsByTagName('option')[param[1]].value;
  }
  if (!document.getElementById('group')) {
    getExamples(`${href}examples.html`);
  }
};

const setBody = (el, value) => (
  el.src = value
);