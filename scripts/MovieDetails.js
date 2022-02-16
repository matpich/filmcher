import dummy from "./dummyFilm.json" assert { type: "json"};

export class MovieDetails {
    constructor() {
        console.log('Hello World!');
        console.log(dummy);
        this.display();
    }

    say () {
        console.log('Dupa');
    }

    display () {
        console.log('movieDisplay!');
        let movieDescBackground = document.createElement('div');
        movieDescBackground.className = "movie-desc-background";
        document.body.appendChild(movieDescBackground);

        let movieDescFrame = document.createElement('div');
        movieDescFrame.className = "movie-desc-frame";

        movieDescFrame.innerHTML = `
            <img src='${dummy.Poster}'>
            <div>
                <div>
                    <h2>${dummy.Title}</h2>
                    <p>${dummy.Plot}</p>
                </div>

                <ul>
                    <li><span>Released</span> ${dummy.Released}</li>
                    <li><span>Genre</span> ${dummy.Genre}</li>
                    <li><span>Director</span> ${dummy.Director}</li>
                    <li><span>Writer</span> ${dummy.Writer}</li>
                    <li><span>Actors</span> ${dummy.Actors}</li>
                    <li><span>Country</span> ${dummy.Country}</li>
                </ul>

                <div id="movie-desc-rating">
                    <div>
                        <span>Rating</span><p>${dummy.imdbRating}/10</p>
                    </div>
                    <div>
                        <span>Votes</span><p>${dummy.imdbVotes}</p>
                    </div>
                </div>
            </div>
            <div id="movie-desc-close">X</div>`
        movieDescBackground.appendChild(movieDescFrame);

        document.querySelector('#movie-desc-close').addEventListener('click', this.remove);

    }

    remove () {
        let movieDescBackground = document.querySelector('.movie-desc-background');
        console.log(movieDescBackground);
        document.body.removeChild(movieDescBackground);
    }
}