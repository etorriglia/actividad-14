
const searchInput = document.querySelector('.search-input');

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


  searchInput.addEventListener('input', function () {
    onSearchQueryChange(this.value);
    loadData(NASA_URL);
  });
  

  
  function onSearchQueryChange(query) {
    let searchQuery = query;
    localStorage.setItem("search-query", searchQuery);


    

  }

let NASA_URL='';
let searchQuery='*'
let imageArray = [];




function loadData(dataURL){
  searchQuery= localStorage.getItem("search-query");
  NASA_URL= `http://images-api.nasa.gov/search?q=${searchQuery}`
    getJSONData(NASA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      rawResults = resultObj.data;
      imageArray=constructImageArray(rawResults);
      run();

    }
  })
}



function constructImageArray(rawResults){
  imageArray= rawResults.collection.items;
  return(imageArray);

}

function shortenDescription(descript){
  if(descript.length>200){
    descript= descript.slice(0,200) + "...";
  
  }
  return (descript);
}

function showImages(imageArray){
  
  searchResults= document.getElementById('search-results');
  let searchResultsHTML='';
    for (i=0; i<imageArray.length; i++){
      if (imageArray[i].data[0].media_type=== "image"){
        imageLink= imageArray[i].links[0]?.href;
        imageTitle= imageArray[i].data[0]?.title;
        imageDescription= shortenDescription(imageArray[i].data[0]?.description);
        imageDate= imageArray[i].data[0]?.date_created;
        searchResultsHTML+=
        `<div class="card mb-12";">
            <div class="row">
              <div class="col-md-4">
                <img src="${imageLink}" class="img-fluid" alt="${imageTitle}">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${imageTitle}</h5>
                  <p class="card-text">${imageDescription}.</p>
                  <p class="card-date"><small class="text-muted">${imageDate}</small></p>
                </div>
              </div>
            </div>
          </div>
          `
    
    }
  searchResults.innerHTML= searchResultsHTML;
}
}
      

async function run() {
  try {
    await showImages(imageArray);
  } catch (err) {
    console.error('error occured: ', err.message)
  }
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