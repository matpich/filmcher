import dummy from "./dummyFilm.json" assert { type: "json"};
import { search } from "./search.js";

//background elements size
const squaresFormatter = (divs) => {
    let nodesList = document.querySelectorAll(divs);
    nodesList.forEach(el => {
        el.style.height = `${el.offsetWidth}px`;
    })
}

window.addEventListener('load', ()=> {
    let bckgBoxes = [
        ['8%', '25%', '10%'],
        ['39%', '46%', '8%'],
        ['73%', '69%', '15%'],
        ['52%', '90%', '5%'],
        ['14%', '65%', '10%'],
        ['76%', '10%', '13%'],
        ['56%', '30%', '18%']
    ]

    bckgBoxes.forEach(([xShift, yShift, boxWidth]) => {
        let bckgBox = document.createElement('div');
        bckgBox.className = 'bckg-box';
        bckgBox.style.left = xShift;
        bckgBox.style.top = yShift;
        bckgBox.style.width = boxWidth;
        document.querySelector('#bckg-container').appendChild(bckgBox);
    })

    squaresFormatter('.bckg-box');

})

window.addEventListener('resize', () => squaresFormatter('.bckg-box'));

document.getElementById('search-form').addEventListener('submit', ev => ev.preventDefault());

console.log(dummy);
search();


