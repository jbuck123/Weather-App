var inputValue = document.querySelector(".user-input");
var btn = document.querySelector('.button')
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var name = document.querySelector(".name")
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log(date)

$(".date").text(date);


// fetching API using user inpit city search
btn.addEventListener('click', function(){
    // user input variable 
citySearch = inputValue.value;
fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=5&appid=bf593cc145bddaaa5aef0a13fbd078bf')
        .then(function (res) {
            return res.json();
        })
        .then(function (data){
            // setting lon and lat for the next api fetch
            var longit = data[0].lon;
            var latit = data[0].lat;
            console.log(longit, latit);
            $(".cityName").text(citySearch)
            // using lat and lon variables to form a more accurate api fetch
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latit + '&lon=' + longit + '&units=imperial&appid=bf593cc145bddaaa5aef0a13fbd078bf')
            .then(function (res) {
                return res.json();
            })
            .then(function (data){
                console.log(data);
                console.log(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);
                // console logging the weather data and setting the html text to the data 
                $(".temp").text(data.current.temp)
                $(".wind").text(data.current.wind_speed);
                $(".humidity").text(data.current.humidity);
                $(".UVindex").text(data.current.uvi);
        
                // time to fill out the 5 day forecast 
                // this is giving me 5 days of weather data... need to figure out how to place into seperate html.
               i = 0
                    // temp
                    $('.temp5').each(function () {
                        var tempData = Math.floor(data.daily[i].temp.day);

                       
                        $(this).text(`${tempData} °F`)
                        i++;
                    })
                    //wind
                    i = 0;

                    $('.wind5').each(function () {
                        var windData =(data.daily[i].wind_speed);

                        $(this).text(`${windData}`)
                        i++;
                    })
                    // humididty section
                    i = 0;

                    $('.humidity5').each(function () {
                        var humididtyData = (data.daily[i].humidity);

                        $(this).text(`${humididtyData} `)
                        i++;
                    })
                    // UVINdex section
                    i = 0;

                    $('.UVindex5').each(function () {
                        var UVindexdata = (data.daily[i].uvi);

                        $(this).text(`${UVindexdata} `)
                        i++;
                        console.log(UVindexdata)

                        if( UVindexdata < 2 ){
                            $(".UVindex5").css("background-color","green");
                        } 
                        else if (UVindexdata >= 3 && UVindexdata <= 5){
                            $(".UVindex5").css("background-color","yellow");
                        }
                        else if (UVindexdata >= 6 && UVindexdata <= 7){
                            $(".UVindex5").css("background-color","orange");
                        }
                        else if (UVindexdata >= 8 && UVindexdata <= 10){
                            $(".UVindex5").css("background-color","red");
                        }
                        else {
                            $(".UVindex5").css("background-color","purple");
                        }
                    })
                    
                    
                
                
            })
        })
    
    .catch(err => alert("wrong city name !")) 
});

