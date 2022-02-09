import dummySearch from "./dummySearch.json" assert { type: "json"};

const OMDB_API = "http://www.omdbapi.com/";
const API_KEY = "58b32334";

//creates a signle response (single movie)
const singleMovieGenerator = (response, parentContainer) => {
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
        resDesc.appendChild(descHeader);
        resDesc.appendChild(descYear);
        resDesc.appendChild(descType);
        
        //appends img and text response to single response container
        singleRes.appendChild(resImage);
        singleRes.appendChild(resDesc);
    
        //appends single response container into multiple container
        parentContainer.appendChild(singleRes);       
    }
}

//adds pagination based on number of results divided by 10
const pagination = (numOfPages, searchResultsContainer) => {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';

    for (let page = 1; page <= numOfPages; page++) {
        if (page == 1) {
            let backPage = document.createElement('div');
            backPage.className = 'single-page';
            backPage.innerText = '<<';
            paginationContainer.appendChild(backPage);

            let singlePage = document.createElement('div');
            singlePage.className = 'single-page';
            singlePage.innerText = page;
            paginationContainer.appendChild(singlePage);
        } else if (page == numOfPages) {
            let singlePage = document.createElement('div');
            singlePage.className = 'single-page';
            singlePage.innerText = page;
            paginationContainer.appendChild(singlePage);

            let nextPage = document.createElement('div');
            nextPage.className = 'single-page';
            nextPage.innerText = '>>';
            paginationContainer.appendChild(nextPage);
        } else {
            let singlePage = document.createElement('div');
            singlePage.className = 'single-page';
            singlePage.innerText = page;
            paginationContainer.appendChild(singlePage);
        }

    }

    //inserts pagination container before multi responses container
    document.body.insertBefore(paginationContainer, searchResultsContainer);
};

export const search = (searchQuery) => {
    //reset previous search results if any
    let prevSearch = document.querySelector(".multi-res");
    if (!!prevSearch) document.body.removeChild(prevSearch);

    //creates a container for multiple responses
    let multiRes = document.createElement('div');
    multiRes.className = 'multi-res';
    document.body.appendChild(multiRes);

    let page = 1;
    fetch(`${OMDB_API}?apikey=${API_KEY}&s=${searchQuery}&page=${page}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            //pagination(Math.ceil(response.totalResults) ,multiRes);
            //checks if there are any responses if not the it handles it
            console.log(!response.Response);
            if (response.Response==="False") {
                //creates h2 for error message
                let errorMessage = document.createElement('h2');
                errorMessage.className = "error-msg-res";
                errorMessage.innerText = response.Error;
                //appends container with error message
                multiRes.appendChild(errorMessage); 

                return;
            }
            singleMovieGenerator(response, multiRes);
            
        })
};

