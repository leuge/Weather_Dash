function getSearchVal() {
    var searchValue = document.querySelector("#search-value").value;
    searchWeather(searchValue);
    makeRow(searchValue);
}

function makeRow(searchValue) {
    var liEl=document.createElement("li")
    liEl.classList.add("list-group-item", "list-group-item-action");
    var text=searchValue;
    liEl.textContent=text;
    var historyEl=document.querySelector('.history');
    console.log(event.target)
    historyEl.onclick=function(){
        console.log(event.target.tagName)
        if (event.target.tagName == "LI"){
            searchWeather(event.target.textContent)
        }
    }
    historyEl.appendChild(liEl);
};