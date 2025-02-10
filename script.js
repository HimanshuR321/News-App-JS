let searchBtn = document.querySelector(".search-button");
let searchInput = document.querySelector(".search-input");
let newsContainer = document.querySelector(".news-grids");  // Container for news
let page = 1; // Start with page 1
let topic = ""; // Store search topic
let loading = false; // Prevent multiple requests

const API_KEY = "77a8a19a86ad45f585aa70fa8644fd6b";

let getData = async () => {
    if (loading) return; // Prevent multiple requests
    let topic = searchInput.value;
    if (topic === "") {
        alert("Enter a topic");
        return;
    }

    loading = true; // Set loading to true
    const API = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&page=${page}&apiKey=${API_KEY}`;
    
    try {
        let response = await fetch(API);
        let data = await response.json();

        data.articles.forEach(article => {
            let newsCard = document.createElement("div");
            newsCard.classList.add("news-card");
            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'not_found.png'}" alt="" class="card-image">
                <p class="news-publisher">${article.source.name}</p>
                <p class="news-heading">${article.title}</p>
                <p class="news-description">${article.description}</p>
                <p class="news-published">${new Date(article.publishedAt).toLocaleString()}</p>
            `;
            newsCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            newsContainer.appendChild(newsCard);
        });

        page++; // Move to the next page
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        searchInput.value="";
        loading = false; // Reset loading state
    }
};

// For the search button click:
searchBtn.addEventListener("click", () => {
    newsContainer.innerHTML = ""; // Clear previous results
    page = 1; // Reset page number
    getData();
});

// For the Enter key in the search input:
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        newsContainer.innerHTML = ""; // Clear previous results
        page = 1; // Reset page number
        getData();
    }
});


// Infinite Scroll Event
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        getData(); // Load more data
    }
});
