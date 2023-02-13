const apiKey = "EGXfYGKx1zuyS29tbvAsECPKo7rPN9Gx"
const checkBtn = document.getElementById("check")
const weatherType = document.querySelector(".weather-type")
var latitude ; var longitude;
var weatherData ;
var location_key; 


// Navigation  Values
navigator.geolocation.getCurrentPosition(
    // 
    function getWeatherData(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // Keeping to only 2 decimal after digit
    latitude = parseFloat(latitude).toFixed(2)  
    longitude =  parseFloat(longitude).toFixed(2);
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${String(latitude)}%2C${String(longitude)}`
    ).then((response) => (response.json()))
    .then((data) => { 
       this.locationData = data
       document.getElementById("city").innerText = this.locationData.ParentCity.LocalizedName
       location_key = this.locationData.Key
       const url = `https://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${apiKey}`

      //  Nested fetch to get weather conditions 
      fetch(url)
      .then(response => response.json())
      .then((data) =>{
        this.weatherData = data
        let temp = data[0].Temperature.Metric.UnitType
        let type = data[0].WeatherText
        document.getElementById("temp").innerText = temp + "°C"
        weatherType.innerText = type
        document.querySelector(".weather-icon").innerHTML = `<img class="weather-icon" width="20%" src="./images/${type}.png" alt="">` 
        let img_url = `url(https://source.unsplash.com/1600x900/?${type.replace(" ","-")})`
        document.querySelector("body").style.backgroundImage = img_url 
      })
    })
  });







// var localized = weatherData.LocalizedName
// console.log(localized)
// var cityName = weatherData.ParentCity.LocalizedName
// city.innerText = `${localized}, ${cityName}`
// console.log(localized,cityName)





// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=34.45&lon=34.56appid=${apiKey}`
// ).then((response) => (response.json()) )
// .then(function (json){ 
//     let weatherData = json
//     console.log(weatherData)
// }
// )
