let xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
  let xmlHttp;

  if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
  } else {
    try {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    } catch {
      xmlHttp = false;
    }
  }

  return xmlHttp;
}

function process() {
  if (xmlHttp) {
    try {
      xmlHttp.open(
        'GET'
        ,`txt/${fName}.txt`
        ,true
      );
      xmlHttp.onreadystatechange = handleServerResponse;
      xmlHttp.send(null);
    } catch(e) {
      console.log(e.toString());
    }
  }
}

function handleServerResponse() {
  let theD = document.getElementById('theD');
  if (xmlHttp.readyState == 1) {
    theD.innerHTML += 'Status 1: server connection established <br />';
  } else if (xmlHttp.readyState == 2) {
    theD.innerHTML += 'Status 2: request received by server <br />';
  } else if (xmlHttp.readyState == 3) {
    theD.innerHTML += 'Status 3: server is processing the request <br />';
  } else if (xmlHttp.readyState == 4) {
    if (xmlHttp. status == 200) {
      theD.innerHTML += 'Status 4: the request is finished and response is ready <br />';
      text = xmlHttp.responseText;
      theD.innerHTML += text;
      try {
        //
      } catch(e) {
        console.log(e.toString());
      }
    } else {
      console.log(xmlHttp.statusText);
    }
  }
}

$(document).on('load', process());