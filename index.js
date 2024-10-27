const xhrSearch = document.getElementById("xhrSearch");
xhrSearch.addEventListener("click", searchUsingXHR);
const fetchSearch = document.getElementById("fetchSearch");
fetchSearch.addEventListener("click", searchUsingFetch);
const fetchAsyncAwait = document.getElementById("fetchAsyncAwait");
fetchAsyncAwait.addEventListener("click", searchUsingAsyncAwait);

const searchQuery = document.getElementById("input");
const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "FUb2z39cDDEP0mZSzE8_t92ilDO1b2QUV0ThrMeI_14";

function searchUsingXHR() {
  let queryTerm = searchQuery.value.trim();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "?query=" + queryTerm);
  xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        let responseObj = JSON.parse(response);
        createImages(responseObj);
      }
  }
  

  xhr.send();
}

function searchUsingFetch() {
    let queryTerm = searchQuery.value.trim();
    fetch(API_URL + "?query=" + queryTerm, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }
    }).then((response)=>{
        return response.json();
    }).then((data) =>{
        createImages(data);
    })

}

async function searchUsingAsyncAwait() {
    let queryTerm = searchQuery.value.trim();
    let response = await fetch(API_URL + "?query=" + queryTerm, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }
    })
    if(response.ok){
        const responseObj = await response.json();
        createImages(responseObj);
    }
}


function createImages(data) {
  const resultsElem = document.getElementById("results");
  for (let item of data.results) {
    let imgElem = document.createElement("img");
    imgElem.src = item.urls.small;
    imgElem.alt = item.alt_description;
    resultsElem.appendChild(imgElem);
  }
}
