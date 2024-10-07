const searchInput = document.querySelector('.form-control');

const clearIcon = document.querySelector('.clear-icon');

  let getJSONData = function(url){
      let result = {};
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText);
        }
      })
      .then(function(response) {
            result.status = 'ok';
            result.data = response;
            return result;
      })
      .catch(function(error) {
          result.status = 'error';
          result.data = error;
          return result;
      });
  }
  
NASA_URL= "http://images-api.nasa.gov/search?q=null"


  getJSONData(NASA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      rawResults = resultObj.data;


    }
  });



searchInput.addEventListener('input', function () {
  onSearchQueryChange(this.value);
});


function onSearchQueryChange(query) {
  searchQuery = query;
  filterImages(rawResults);
  

}

let imagesInfoArray= [];

function filterImages(){
    imagesInfo= rawResults.collection;
    console.log(imagesInfo)
    imageInfoArray= [];
    for (i=0; i<imagesInfo.length; i++){
        imageInfoArray[i]=imagesInfo[i].data;
    }
    console.log(imagesInfoArray)
}




/*

let imagesData= [];

let rawResults= [];

let searchedImagesArray= [];

let imageInfo= [];

let imageLinks=[];

let searchQuery="null";

function normalizeText(text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  }

/*
function showImages(imageArray){
    imagesHTML="";
    for (i=0; i<images.length; i++){
        imagesHTML+=
        `<div class="card" style="width: 18rem;">
            <img src="${images.links[i].href}" class="card-img-top" alt="...">
            <h5 class=card-title>${images.data[i].title}</h5>
            <div class="card-body">
                <p class="card-text">${images.data[i].description}</p>
            </div>
            </div>`
    }
    document.getElementById('search-results').innerHTML= imagesHTML;
}
*/
/*
  searchInput.addEventListener('input', function () {
    onSearchQueryChange(this.value);


  });
  

function onSearchQueryChange(query) {
    searchQuery = query;
    return (searchQuery);
    /*filterResults(rawResults);*/



/*
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(`https://images-api.nasa.gov/search?q=${searchQuery}`).then(function (resultObj) {
        if (resultObj.status === "ok") {
          rawResults = resultObj.data;
          console.log(rawResults)
    }})
});


/*
function filterResults(rawResults){
    rawImageCollection = rawResults.collection;
    console.log(rawImageCollection)
    filteredImages= rawImageCollection.filter(
      (image) => {
        let imageName = normalizeText(image.title);
        let imageDescription = normalizeText(image.description);
        let query = normalizeText(searchQuery);
  
        return (imageName.includes(query) || imageDescription.includes(query));
      }
    )

  }

*/