import dummy from "./dummyFilm.json" assert { type: "json"};
import { search } from "./search.js";
import { animatedSquares } from "./backgroundEffect.js";

window.addEventListener('load', animatedSquares)

window.addEventListener('resize', () => squaresFormatter('.bckg-box'));

document.getElementById('search-form').addEventListener('submit', ev => {
    ev.preventDefault();
    let searchValue = document.getElementById('search-field').value;
    search(searchValue);
});


