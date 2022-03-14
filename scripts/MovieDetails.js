export class MovieDetails {
    constructor(imdbID) {
        this.OMDB_API = "http://www.omdbapi.com/";
        this.API_KEY = "58b32334";
        this.imdbID = imdbID;
        
        this.getMovieDetails();
    }

    getMovieDetails () {
        fetch(`${this.OMDB_API}?apikey=${this.API_KEY}&i=${this.imdbID}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.display(res);
            })
    }

    display (res) {
        console.log('movieDisplay!');
        let movieDescBackground = document.createElement('div');
        movieDescBackground.className = "movie-desc-background";
        document.body.appendChild(movieDescBackground);

        let movieDescFrame = document.createElement('div');
        movieDescFrame.className = "movie-desc-frame";

        movieDescFrame.innerHTML = `
            <div>
                <img src='${this.notAvailableHandler(res.Poster, "poster")}'>
            </div>
            <div>
                <div>
                    <h2>${res.Title}</h2>
                    <p>${this.notAvailableHandler(res.Plot, "description")}</p>
                </div>

                <ul>
                    <li><span>Released</span> ${res.Released}</li>
                    <li><span>Genre</span> ${res.Genre}</li>
                    <li><span>Director</span> ${res.Director}</li>
                    <li><span>Writer</span> ${res.Writer}</li>
                    <li><span>Actors</span> ${res.Actors}</li>
                    <li><span>Country</span> ${res.Country}</li>
                </ul>

                <div id="movie-desc-rating">
                    <div>
                        <span>Rating</span><p>${res.imdbRating}</p>
                    </div>
                    <div>
                        <span>Votes</span><p>${res.imdbVotes}</p>
                    </div>
                </div>
            </div>`
        let closeButton = document.createElement('div');
        closeButton.setAttribute('id', 'movie-desc-close');
        closeButton.innerHTML = 'CLOSE';
        movieDescBackground.appendChild(closeButton);
        movieDescBackground.appendChild(movieDescFrame);

        document.querySelector('#movie-desc-close').addEventListener('click', this.remove);

    }

    remove () {
        let movieDescBackground = document.querySelector('.movie-desc-background');
        console.log(movieDescBackground);
        document.body.removeChild(movieDescBackground);
        document.body.style.overflow = "scroll";
    }

    notAvailableHandler (res, type) {
        if (res === 'N/A') {
            switch (type){
                case "description":
                    return "Description not available. We're sorry.";
                case "poster":
                    return "./image/N_A.jpg";
                default:
                    break;
            }
        } else return res;
    }
}