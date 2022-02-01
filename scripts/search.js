import dummySearch from "./dummySearch.json" assert { type: "json"};

const OMDB_API = "http://www.omdbapi.com/";
const API_KEY = "58b32334";

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
                //sends request to API (for design purposes it's a temporary local json placeholder)
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
                multiRes.appendChild(singleRes);       
            }
        });

    // console.log(dummySearch);
    


};

