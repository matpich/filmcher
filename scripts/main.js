import "./backgroundEffect.js";
import { Search } from "./Search.js";


// document.getElementById('search-form').addEventListener('submit', ev => {
//     ev.preventDefault();
//     let searchValue = document.getElementById('search-field').value;
//     search(searchValue);
// });

document.getElementById('search-form').addEventListener('submit', ev => {
    ev.preventDefault();
    let searchValue = document.getElementById('search-field').value;
    let searchResult = new Search(searchValue);
    searchResult.search();
});

document.querySelector('.page-title').addEventListener('click', () => window.location.reload());

