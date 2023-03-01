let xmlHttp = createXmlHttpRequestObject();

// create object
function createXmlHttpRequestObject() {
  let xmlHttp;
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  return xmlHttp;
}

// called on load
function process() {
  if (xmlHttp) {
    try {
      xmlHttp.open(
        'GET'
        ,`xml/${fName}.xml`
        ,true
      );
      xmlHttp.onreadystatechange = handleStateChange;
      xmlHttp.send(null);
    } catch(e) {
      console.log(e.toString());
    }
  }
}

// when state changes
function handleStateChange() {
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200) {
      try {
        handleResponse();
      } catch(e) {
        console.log(e.toString());
      }
    } else {
      console.log(xmlHttp.statusText);
    }
  }
}

// handle the response from the server
function handleResponse() {
  let xmlresponse = xmlHttp.responseXML;
  let root = xmlresponse.documentElement;
  let names = root.getElementsByTagName('name');
  let ssns = root.getElementsByTagName('ssn');

  let stuff = '<table><tr><th>Name</th><th>SSN</th></tr>';
  for (let i = 0; i < Math.max(names.length, ssns.length); i++) {
    stuff += '<tr>';
    stuff += `<td>${names.item(i).firstChild.data}</td>`;
    stuff += `<td>${ssns.item(i).firstChild.data}</td>`;
    stuff += '</tr>';
  }
  stuff += '</table>';

  let theD = document.getElementById('theD');
  theD.innerHTML = stuff;
}

$(document).on('load', process());