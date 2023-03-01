let xmlHttp = createXmlHtpRequestObject();

function createXmlHtpRequestObject() {
  let xmlHttp;

  if (window.ActiveXObject) {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
      xmlHttp = false;
    }
  } else {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch(e) {
      xmlHttp = false;
    }
  }

  if (!xmlHttp) {
    alert('Can\'t create that object hoss!');
  } else {
    return xmlHttp;
  }
}

function process() {
  if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
    let food = encodeURIComponent(document.getElementById('userInput').value);
    xmlHttp.open(
      'GET'
      ,`php/${fName}.php?food=${food}`
      , true
    );
    xmlHttp.onreadystatechange = handleServerResponse;
    xmlHttp.send(null);
  } else {
    setTimeout('process()', 1000);
  }
}

function handleServerResponse() {
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200) {
      let xmlResponse = xmlHttp.responseXML;
      let xmlDocumentElement = xmlResponse.documentElement;
      let message = xmlDocumentElement.firstChild.data;
      document.getElementById('underInput').innerHTML = `<span>${message}</span>`;
      setTimeout('process()', 1000);
    } else {
      alert('Something went wrong!');
    }
  }
}

$(document).on('load', process());