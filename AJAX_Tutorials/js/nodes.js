$(document).on('load', gametime());

function gametime() {
  let header = document.createElement('h3');
  let title = document.createTextNode('Here are some things!');
  header.appendChild(title);
  let list = document.createElement('ul');
  for (item of ['Old Dan', 'Chickien Wings', 'Tuna']){
    let item1 = document.createElement('li');
    let text1 = document.createTextNode(item);
    item1.appendChild(text1);
    list.appendChild(item1);
  }
  let theD = document.getElementById('theD');
  theD.appendChild(header);
  theD.appendChild(list);
}