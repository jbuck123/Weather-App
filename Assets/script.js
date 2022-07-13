var inputValue = document.querySelector(".user-input");
var btn = document.querySelector('.button')
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var name = document.querySelector(".name")
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log(date)

$(".date").text(date);



btn.addEventListener('click', function(){
citySearch = inputValue.value;
fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=5&appid=bf593cc145bddaaa5aef0a13fbd078bf')
        .then(function (res) {
            return res.json();
        })
        .then(function (data){
            
            var longit = data[0].lon;
            var latit = data[0].lat;
            console.log(longit, latit);
            $(".cityName").text(citySearch)

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latit + '&lon=' + longit + '&units=imperial&appid=bf593cc145bddaaa5aef0a13fbd078bf')
            .then(function (res) {
                return res.json();
            })
            .then(function (data){
                console.log(data);
                console.log(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);
                
            })
        })
    
    .catch(err => alert("wrong city name !")) 
});

