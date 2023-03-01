function createList() {
  let s = '<ul>';
  for (li of ['Armagetiton', 'Position Impossible', 'Jamaican Me Crazy'])
    s += `<li>${li}</li>`;
  s += '</ul>';
  divMovies = document.getElementById('divMovies');
  divMovies.innerHTML = s;
}

$(document).on('load', createList());