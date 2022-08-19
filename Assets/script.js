//declaring variables
var inputValue = document.querySelector(".user-input");
var btn = document.querySelector(".button");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var name = document.querySelector(".name");
var citySearch;
var UVINdex;
var array = JSON.parse(localStorage.getItem("history")) || [];
//setting the current date variable
var today = moment().format("MMM Do YY");
//setting the current day in the main container
$(".date").text(today);
// setting the variables for the dates.
var day1 = moment().add(1, "days");
var day2 = moment().add(2, "days");
var day3 = moment().add(3, "days");
var day4 = moment().add(4, "days");
var day5 = moment().add(5, "days");

// setting the 5 day forecast dates.
$(".date1").text(day1);
$(".date2").text(day2);
$(".date3").text(day3);
$(".date4").text(day4);
$(".date5").text(day5);

// var cityHistory = localStorage.getItem("history")

// this is going to be a function that pushes inputvalue into an array.
function storeCities(citySearch) {
  if (!array.includes(citySearch)) {
    array.push(citySearch);
  }
  console.log(array);
  var stringified = localStorage.setItem("history", JSON.stringify(array));
  console.log(stringified);
}

function displayCity() {
  if (array) {
    for (let index = 0; index < array.length; index++) {
      const cityName = array[index];
      const cityBtn = $("<button>");
      cityBtn.attr("type", "button");
      cityBtn.css("display", "block");
      cityBtn.addClass("btn btn-info mb-2 displaybutton");
      cityBtn.val(cityName);
      $(".history").append(cityBtn);
    //   cityBtn.addEventListener("click", forecast(cityName))
    }  }
  else {
      console.log("Local storage returned nothing");
  }
}



// fetching API using user inpit city search
btn.addEventListener("click", function (event) {
  // if(citySearch != undefined){
  //     console.log('its working')

  citySearch = inputValue.value;
  console.log("citySearch is", citySearch);
  forecast(citySearch);
  storeCities(citySearch);




  // function convert to function









  function forecast(citySearch) {
    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        citySearch +
        "&limit=5&appid=1fea590a4873c18c5045080846ade6e4"
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        // setting lon and lat for the next api fetch
        var longit = data[0].lon;
        var latit = data[0].lat;
        console.log(longit, latit);
        $(".cityName").text(citySearch);
        // using lat and lon variables to form a more accurate api fetch
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            latit +
            "&lon=" +
            longit +
            "&units=imperial&appid=1fea590a4873c18c5045080846ade6e4"
        )
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log(data);
            console.log(
              data.current.temp,
              data.current.wind_speed,
              data.current.humidity,
              data.current.uvi
            );
            // console logging the weather data and setting the html text to the data
            $(".temp").text(data.current.temp);
            $(".wind").text(data.current.wind_speed);
            $(".humidity").text(data.current.humidity);
            $(".UVindex").text(data.current.uvi);

            $("#wicon").each(function () {
              var iconcode = data.current.weather[0].icon;
              var iconurl =
                "http://openweathermap.org/img/w/" + iconcode + ".png";
              $(this).attr("src", iconurl);
            });

            // setting the color of the UV INDex

            // time to fill out the 5 day forecast
            // this is giving me 5 days of weather data... need to figure out how to place into seperate html.
            //got it
            // weather icon
            i = 0;

            $(".wicon5").each(function () {
              var iconcode = data.daily[i].weather[0].icon;

              var iconurl =
                "http://openweathermap.org/img/w/" + iconcode + ".png";
              $(this).attr("src", iconurl);
              i++;
              console.log(i, "array index");
            });

            i = 0;
            // temp
            $(".temp5").each(function () {
              var tempData = Math.floor(data.daily[i].temp.day);

              $(this).text(`${tempData} °F`);
              i++;
            });
            //wind
            i = 0;

            $(".wind5").each(function () {
              var windData = data.daily[i].wind_speed;

              $(this).text(`${windData}`);
              i++;
            });
            // humididty section
            i = 0;

            $(".humidity5").each(function () {
              var humididtyData = data.daily[i].humidity;

              $(this).text(`${humididtyData} `);
              i++;
            });
            // UVINdex section
            i = 0;

            $(".UVindex5").each(function () {
              UVindexdata = data.daily[i].uvi;
              console.log(UVindexdata);
              $(this).text(`${UVindexdata} `);

              if (UVindexdata <= 3) {
                $(this).css("background-color", "green");
              } else if (UVindexdata > 3 && UVindexdata <= 6) {
                $(this).css("background-color", "yellow");
              } else if (UVindexdata > 6 && UVindexdata <= 8) {
                $(this).css("background-color", "orange");
              } else if (UVindexdata > 8 && UVindexdata <= 10) {
                $(this).css("background-color", "red");
              } else if (UVindexdata > 10) {
                $(this).css("background-color", "purple");
              }

              i++;
            });
          });
      })

      .catch((err) => alert("wrong city name !"));
  }
});

function UVIcolor() {
  if (UVindexdata <= 3) {
    $(this).css("background-color", "green");
  } else if (UVindexdata > 3 && UVindexdata <= 6) {
    $(this).css("background-color", "yellow");
  } else if (UVindexdata > 6 && UVindexdata <= 8) {
    $(this).css("background-color", "orange");
  } else if (UVindexdata > 8 && UVindexdata <= 10) {
    $(this).css("background-color", "red");
  } else if (UVindexdata > 10) {
    $(this).css("background-color", "purple");
  }
  storeCities();
}

displayCity();