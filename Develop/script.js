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

function searchWeather(searchValue) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        todayEl = document.querySelector("#today");
        todayEl.textContent = " ";

        var titleEl = document.createElement("h3")
        var titleEl = document.createElement("h3")
        titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
        var cardEl = document.createElement("div");
        cardEl.classList.add("card");
        var windEl = document.createElement("p");
        windEl.classList.add("card-text");
        var humidEl = document.createElement("p");
        humidEl.classList.add("card-text");
        var tempEl = document.createElement("p");
        tempEl.classList.add("card-text");
        humidEl.textContent = "Humidity: " + data.main.humidity + " %";
        tempEl.textContent = "Temperature: " + data.main.temp + " °F";
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList.add("card-body");
        var imgEl = document.createElement("img");
        imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        titleEl.appendChild(imgEl);
        cardBodyEl.appendChild(titleEl);
        cardBodyEl.appendChild(tempEl);
        cardBodyEl.appendChild(humidEl);
        cardBodyEl.appendChild(windEl);
        cardEl.appendChild(cardBodyEl);
        todayEl.appendChild(cardEl);

        getForecast(searchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
    }
)}

function getForecast(searchValue) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    .then(function(response){
  
      return response.json();
    })
    .then(function(data) {
        console.log(data)
        var forecastEl = document.querySelector("#forecast");
        forecastEl.innerHTML = "<h4 class=\"mt-3\">5-Day Forecast:</h4>";
        forecastRowEl = document.createElement("div");
        forecastRowEl.className = "\"row\"";

        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                var colEl = document.createElement("div");
                colEl.classList.add("col-md-2");
                var cardEl = document.createElement("div");
                cardEl.classList.add("card", "bg-primary", "text-white");
                var windEl = document.createElement("p");
                windEl.classList.add("card-text");
                windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                var humidityEl = document.createElement("p");
                humidityEl.classList.add("card-text");
                humidityEl.textContent = "Humidity : " + data.list[i].main.humidity + " %";
                var bodyEl = document.createElement("div");
                bodyEl.classList.add("card-body", "p-2");
                var titleEl = document.createElement("h5");
                titleEl.classList.add("card-title");
                titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
                var imgEl = document.createElement("img")
                imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" )
                var p1El = document.createElement("p");
                p1El.classList.add("card-text");
                p1El.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
                var p2El = document.createElement("p");
                p2El.classList.add("card-text");
                p2El.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                colEl.appendChild(cardEl);
                bodyEl.appendChild(titleEl);
                bodyEl.appendChild(imgEl);
                bodyEl.appendChild(windEl);
                bodyEl.appendChild(humidityEl);
                bodyEl.appendChild(p1El);
                bodyEl.appendChild(p2El);
                cardEl.appendChild(bodyEl);
                forecastEl.appendChild(colEl);
            }
        }
    });
}

