let pageCounter = [0, 2];
let animalContainer = document.getElementById('animal-info');
let btn = document.getElementById('btn');
btn.addEventListener('click', function() {
  let ourRequest = new XMLHttpRequest();
  let ourData;
  ourRequest.open(
    'GET'
    ,`json/${fName}.json`
  );
  ourRequest.onload = function() {
    /* console.log(ourRequest.responseText);
    let ourData = ourRequest.responseText;
    console.log(ourData[0]);*/
    //console.log(ourData[0]);
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
    } else {
      console.log(`We connected to the server, but it returned an error\n${ourRequest.statusText}`);
    }
  }

  ourRequest.onerror = function() {
    console.log('Connection error');
  }

  ourRequest.onloadend = function() {
    renderHTML(ourData);
    
    if (pageCounter[1] == ourData.length - 1)
      btn.classList.add('hide-me');    

    if (ourData.length - 1 > pageCounter[0] + 3) {
      pageCounter = [pageCounter[0] + 3, Math.min(pageCounter[1] + 3, ourData.length - 1)];
    }
  }
  ourRequest.send();
});

function renderHTML(data) {
  let htmlString = '';
  for (let i = pageCounter[0]; i <= pageCounter[1]; i++) {
    htmlString += `<p>${data[i].name} is a ${data[i].species} that likes to eat `;

    for (let ii = 0; ii < data[i].foods.likes.length; ii++) {
      htmlString += (ii != 0) ? ' and ' : '';
      htmlString += `${data[i].foods.likes[ii]}`;
    }

    htmlString += ' and dislikes ';
    for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      htmlString += (ii != 0) ? ' and ' : '';
      htmlString += `${data[i].foods.dislikes[ii]}`;
    }

    htmlString += '.</p>';
  }
  animalContainer.insertAdjacentHTML("beforeend", htmlString);
}




/* Explaination of JSON
--------------------------------------------------------
let myCat = {
  "name": "Meowsalot"
  ,"species": "cat"
  ,"favFood": "tuna"
};
console.log(myCat.favFood);

let myFavColors = ['blue', 'green', 'purple'];
console.log(myFavColors[1]);

let thePets = [
  {
    "name": "Meowsalot"
    ,"species": "cat"
    ,"favFood": "tuna"
  }
  ,{
    "name": "Barky"
    ,"species": "dog"
    ,"favFood": "carrots"
  }
];
console.log(thePets[1].favFood);
--------------------------------------------------------
Explaination of JSON*/