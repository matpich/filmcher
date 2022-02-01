//background elements size
const squaresFormatter = (divs) => {
    let nodesList = document.querySelectorAll(divs);
    nodesList.forEach(el => {
        el.style.height = `${el.offsetWidth}px`;
    })
}

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export const animatedSquares = ()=> {
    let bckgBoxes = [
        [`${getRandom(5,9)}%`, `${getRandom(22,28)}%`, `${getRandom(7,13)}%`],
        [`${getRandom(36,42)}%`, `${getRandom(43,49)}%`, `${getRandom(5,9)}%`],
        [`${getRandom(70,76)}%`, `${getRandom(66,72)}%`, `${getRandom(12,18)}%`],
        [`${getRandom(48,56)}%`, `${getRandom(85,95)}%`, `${getRandom(3,8)}%`],
        [`${getRandom(10,18)}%`, `${getRandom(60,70)}%`, `${getRandom(5,15)}%`],
        [`${getRandom(71,81)}%`, `${getRandom(7,14)}%`, `${getRandom(8,17)}%`],
        [`${getRandom(50,63)}%`, `${getRandom(25,35)}%`, `${getRandom(13,25)}%`]
    ]

    bckgBoxes.forEach(([xShift, yShift, boxWidth]) => {
        let bckgBox = document.createElement(`div`);
        bckgBox.className = `bckg-box`;
        bckgBox.style.left = xShift;
        bckgBox.style.top = yShift;
        bckgBox.style.width = boxWidth;
        document.querySelector(`#bckg-container`).appendChild(bckgBox);
    })

    squaresFormatter(`.bckg-box`);

}