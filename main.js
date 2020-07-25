const api={
    key:"3050a7c60c83524df927bdbca94a7883",
    base:"https://api.openweathermap.org/data/2.5/"
}
initialDate();
initialTime();

const icon=document.querySelector(".refresh")
const searchbox=document.querySelector(".search-box");
icon.addEventListener("click",setQuery2);
searchbox.addEventListener("keypress",setQuery);
searchbox.addEventListener("blur",setQuery2);

function setQuery(e) {
    if(e.keyCode==13){
        getResults(searchbox.value);
        // console.log(searchbox.value)
    }
}

function setQuery2(e) {
    getResults(searchbox.value);
    // console.log(searchbox.value)
}

function getResults(query){
    serviceUrl=`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
    fetch(serviceUrl)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function initialDate() {
    let now=new Date();
    let date=document.querySelector(".location .date");
    date.innerText=dateBuilder(now);
}
function initialTime() {
    let now=new Date();
    let time=document.querySelector(".low .time")
    time.innerText=timeBuilder(now);
}

function displayResults(weather) {
    // console.log("fetched")
    console.log(weather);
    let city=document.querySelector(".location .city");
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector(".location .date");
    let time=document.querySelector(".low .time")
    date.innerText=dateBuilder(now);
    time.innerText=timeBuilder(now);

    let temp=document.querySelector(".current .temp");
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el=document.querySelector(".current .weather");
    let body=document.querySelector('body');
    weathertype=weather.weather[0].main;
    body.id=weathertype;
    weather_el.innerText=weathertype;

    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    let feel=document.querySelector('.feels');
    feel.innerText=`Feels like ${Math.round(weather.main.feels_like)} °C`
}

function dateBuilder(d) {
    let months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

function timeBuilder(d) {
    var hour=d.getHours().toString();
    var min=d.getMinutes().toString();
    var sec=d.getSeconds().toString();
    if (hour.length<2){
        hour=`0${hour}`;
    }
    if (min.length<2){
        min=`0${min}`;
    }
    if (sec.length<2){
        sec=`0${sec}`;
    }
    return `Last Refresh at ${hour}:${min}:${sec}`;
}