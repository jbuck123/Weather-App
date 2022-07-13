var inputValue = document.querySelector(".user-input");
var btn = document.querySelector('.button')
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var name = document.querySelector(".name")



btn.addEventListener('click', function(){
citySearch = inputValue.value;
fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=5&appid=ce8c11c996c61edc1c5e6e600162d8a9')
        .then(function (res) {
            return res.json();
        })
        .then(function (data){

            var longit = data[0].lon;
            var latit = data[0].lat;
            console.log(longit, latit);
        })
        $(".city-name").text(citySearch)
    
    .catch(err => alert("wrong city name !")) 
});

ßß