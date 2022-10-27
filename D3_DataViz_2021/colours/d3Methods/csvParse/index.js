const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';

fetchText(csvUrl).then(text => {
  const data = d3.csvParse(text);
  let message = '';
  message += Math.round(text.length / 1024) + ' kB\n';
  message += data.length + ' rows\n';
  message += data.columns.length + ' columns\n';
  document.getElementById('message-container').textContent = message;
});