import { Pagination } from "./Pagination.js";
import { MovieDetails } from "./MovieDetails.js";

export class Search {
    constructor(searchQuery) {
        this.OMDB_API = "http://www.omdbapi.com/";
        this.API_KEY = "58b32334";
        this.searchQuery = searchQuery;
        this.pagination = new Pagination();
    }

    //is responsible for adding container with single movie information into DOM
    singleMovie(response, parentContainer) {
        for (let res of response.Search) {
            //creates a container for single response
            let singleRes = document.createElement('div');
            singleRes.className = 'single-res';

            //creates an image tag
            let resImage = document.createElement('img');
            if (res.Poster == "N/A") {
                resImage.src = './image/N_A.jpg';
            } else {
                resImage.src = res.Poster;
            }
            resImage.className = 'res-image';

            //creates a container for text response
            let resDesc = document.createElement('div');
            resDesc.className = 'res-desc';

            //creates elements of text response container
            let descHeader = document.createElement('h2');
            descHeader.innerText = res.Title;

            let descYear = document.createElement('h3');
            descYear.innerText = res.Year;

            let descType = document.createElement('p');
            descType.innerText = res.Type;

            //appends texts elements to text response container
            resDesc.append(descHeader, descYear, descType);

            singleRes.addEventListener("click", () => {
                let details = new MovieDetails();
            })

            //appends img and text response to single response container
            singleRes.append(resImage, resDesc);

            //appends single response container into multiple container
            parentContainer.appendChild(singleRes);

            console.log(res.imdbID);
        }
    }

    multiMovies() {
        //removes previous search results and pagination container from DOM
        let prevSearch = document.querySelectorAll(".multi-res, .pagination-container");
        if (!!prevSearch) prevSearch.forEach(el => document.body.removeChild(el));

        //creates a container for pagination
        let pagCont = document.createElement('div');
        pagCont.className = 'pagination-container';
        document.body.appendChild(pagCont);

        //creates a container for multiple single movies containers
        let multiRes = document.createElement('div');
        multiRes.className = 'multi-res';
        document.body.appendChild(multiRes);

        return multiRes;
    };

    search () {
        fetch(`${this.OMDB_API}?apikey=${this.API_KEY}&s=${this.searchQuery}&page=${this.pagination.currentPage}`)
            .then(response => response.json())
            .then(response => {
                let multiRes = this.multiMovies();
                //checks if there are any responses if not then it handles it
                if (response.Response === "False") {
                    //creates h2 for error message
                    let errorMessage = document.createElement('h2');
                    errorMessage.className = "error-msg-res";
                    errorMessage.innerText = response.Error;
                    //appends container with error message
                    multiRes.appendChild(errorMessage);

                    return;
                }
                
                this.pagination.totalPages = Math.ceil(response.totalResults/10);
                this.pagination.displayer(this);

                this.singleMovie(response, multiRes);
            })
    }


}