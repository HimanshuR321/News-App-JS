let searchBtn = document.querySelector(".search-button");
let searchInput = document.querySelector(".search-input");
let newsImages = document.querySelectorAll(".card-image");
let newsCard = document.querySelectorAll(".news-card");
let newsPublishers = document.querySelectorAll(".news-publisher");
let newsHeadings = document.querySelectorAll(".news-heading");
let newsDescriptions = document.querySelectorAll(".news-description");
let newsPublishedDates = document.querySelectorAll(".news-published");

const API_KEY="77a8a19a86ad45f585aa70fa8644fd6b";
let getData = async()=>{
    let topic=searchInput.value;
    if(topic===""){
        alert("Enter a topic");
    }
    const API=`https://newsapi.org/v2/everything?q=${topic}&from=2025-02-08&to=2025-02-08&sortBy=popularity&apiKey=${API_KEY}`;
    let data=await fetch(API);
    let response=await data.json();
    try{
        for(let i=0;i<8;i++){
            newsImages[i].src=response.articles[i].urlToImage || "not_found.png";;
            newsPublishers[i].innerHTML=response.articles[i].source.name;
            newsHeadings[i].innerHTML=response.articles[i].title;
            newsDescriptions[i].innerHTML=response.articles[i].description;
            newsPublishedDates[i].innerHTML=response.articles[i].publishedAt;
            let newsURL=response.articles[i].url;
            newsCard[i].addEventListener("click", () => {
                window.open(newsURL, "_blank");
            });    
        }
    } catch(err){
        console.log(err);
    }

    searchInput.value="";
    console.log(response);
}


searchBtn.addEventListener("click",getData);
searchInput.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        getData();
    }
});

// window.addEventListener("scroll",);