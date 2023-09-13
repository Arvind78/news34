const url =`https://newsapi.org/v2/everything?q=`;
const apiKey =`3c90383ac1b247aba7465a89477a69fb`;
const body= document.getElementById("body");



async function fetchNews(query){
  const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
  const result = await response.json();
  showData(result.articles);
}

window.addEventListener('load',()=> fetchNews("india"))


function showData(articles){
const cardContainer= document.getElementById("card-container");
const newsCardTemplate= document.getElementById("template-news-cards");

cardContainer.innerHTML="";
if(articles){
articles.forEach(article => {
    if(!article.urlToImage) return;
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

newsImg.src= article.urlToImage;
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

