import dummy from "./dummyFilm.json" assert { type: "json"};

document.getElementById('search-form').addEventListener('submit', ev => ev.preventDefault());

console.log(dummy)