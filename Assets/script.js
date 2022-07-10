var inputValue = document.querySelector(".user-input");
var btn = document.querySelector('.button')
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var name = document.querySelector(".name")

//setting all the variables from DOM

// const weatherdata = () => {
//     fetch("https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=bf593cc145bddaaa5aef0a13fbd078bf")
//     .then((data) => data.json())
//     .then((data) => console.log(data));



// };

// weatherdata();
btn.addEventListener('click', function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=bf593cc145bddaaa5aef0a13fbd078bf")
    .then(Response => Response.json())
    .then(data => console.log(data))
    
    .catch(err => alert("wrong city name !")) 
});

