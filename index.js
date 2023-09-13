async function fetchNews(query){
  const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=india&max=100&apikey=5ff4447dd996eb4de6f33f2f972533bc`);
  const result = await response.json();
  console.log(result.articles)
  showData(result.articles);
}

window.addEventListener('load',()=> fetchNews("india"))


function showData(articles){
const cardContainer= document.getElementById("card-container");
const newsCardTemplate= document.getElementById("template-news-cards");

cardContainer.innerHTML="";
if(articles){
articles.forEach(article => {
    if(!article.image) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataNewsInCard(cardClone,article)
    cardContainer.appendChild(cardClone)
});

}
}

function fillDataNewsInCard(cardClone,article){
const newsImg= cardClone.querySelector("#news-img");
const newsTitle= cardClone.querySelector("#news-title");
const newsSource= cardClone.querySelector("#news-source");
const newsDes= cardClone.querySelector("#news-desc");

newsImg.src= article.image;
newsTitle.innerHTML=article.title;
newsDes.innerHTML=article.description;

const date = new Date(article.publishedAt).toLocaleString("em-US",{
    timeZone:"Asia/Jakarta"
});

newsSource.innerHTML =`${article.source.name} .${date}`

cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"blanck");
})
}

document.querySelector("#searchBtn").addEventListener("click",()=>{
  const searchQuery = document.getElementById("searchInput").value;
  fetchNews(searchQuery);
})

