array = ['A', 'B'];
if(run() == 'simple array') {
  display(`
array = ['A', 'B'];  
array.push('C')
  `, array);
}
range = (n) => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
};
if(run() == 'range function') {
  display(`
range = (n) => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
};
  `, `range(4)`);
}
myRange = range(10);
if(run() == 'forEach') {
  display(`
myRange = range(10);
myRange.forEach(d => {
  newArray.push(d);
  console.log(d);
});
  `, `newArray`);
}
if(run() == 'filter') {
  display('myRange.filter(d => d % 2 === 0)');
}
sortable = [4, 3, 6, 2, 8];
if(run() == 'sort') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.sort();
  `, 'sortable');
}
if(run() == 'reverse') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.reverse();
  `);
}
if(run() == 'sort default') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.push(20);
  `, 'sortable');
}
sortable.push(20);
if(run() == 'number sort') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.push(20);
sortable.sort((a, b) => a - b);
  `, 'sortable');
}
if(run() == 'number reverse sort') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.push(20);
sortable.sort((a, b) => b - a);
  `, 'sortable');
}
if(run() == 'numbered sort') {
  display(`
sortable = [4, 3, 6, 2, 8];
sortable.push(20);
sortable.sort((a, b) => b < a ? -1 : 1);
  `, 'sortable');
}
if(run() == 'sort with equals') {
  display(`
sortable.push(2);
sortable.sort((a, b) => (b < a ? -1 : b > a ? 1 : 0));
  `, 
  'sortable');
}
if(run() == 'sort with d3 ascending') {
  display(`
const {ascending} = d3;
sortable.sort(ascending);
  `);
}
if(run() == 'sort with d3 comparitors') {
  display(`
const {ascending} = d3;
sortable.sort((a, b) => ascending(a, b));
  `);
}
if(run() == 'sort with d3 descending') {
  display(`
const {descending} = d3;
sortable.sort(descending);
  `);
}
if(run() == 'map') {
  display(`
myRange = range(10);
myRange.map(d => d * 2);
`);
}
if(run() == 'map object') {
  display(`
myRange = range(10);
myRange.map(d => ({number: d, double: d * 2}))
  `);
}
if(run() == 'reduce') {
  display(`
myRange = range(10);
myRange.reduce((accumulator, d) => accumulator + d)
  `);
}
if(run() == 'reduce verbose') {
  display(`
myRange = range(10);
myRange.reduce((accumulator, d) => {
  newArray.push('Adding ' + accumulator + ' + ' + d);
  console.log('Adding ' + accumulator + ' + ' + d);
  return accumulator + d;
}, 0)
  `, 'newArray');
}
entries = [
  {key: 'A', value: 'foo'},
  {key: 'B', value: 'bar'}
];
/*
To get the following from the above

const result = {
  A: 'foo',
  B: 'bar'
};
*/
if(run() == 'reduce to object') {
  display(`
const entries = [
  {key: 'A', value: 'foo'},
  {key: 'B', value: 'bar'}
];

entries.reduce((accumulator, d) => {
  accumulator[d.key] = d.value;
  return accumulator;
}, {});
  `)
}
if(run() == 'sort object with d3') {
  display(`
entries = [
  {key: 'A', value: 'foo'},
  {key: 'C', value: 'baz'},
  {key: 'B', value: 'bar'}
];  

const {ascending} = d3;  
entries.sort((a, b) => ascending(a.key, b.key))
  `);
}

if(run() == 'sort keys') {
  display(`
entries = [
  {key: 'A', value: 'foo'},
  {key: 'C', value: 'baz'},
  {key: 'B', value: 'bar'}
];  

entries.sort((a, b) => a.key < b.key ? -1 : 1);
  `);
}