const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';

fetchText(csvUrl).then(text => {
  console.log(text);
});

// Pyramid of doom, caused by numerous indentations
// fetch(csvUrl).then(response => {
//   response.text().then(text => {
//     console.log(text);
//   });
// });