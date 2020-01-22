/**
 * Weather App to display the current weather on the webpage
 * This is an application to demonstrate how to use fetch
 * using openWeatherApi
 */

(() => {
    /**
     * @const {string} - Base Endpoint
     */
    const BASE_END_POINT = "https://api.openweathermap.org/data/2.5/";
    const API_KEY = config.apikey;
    let weatherElement = document.querySelector(".weather-display");
    /**
     * This is a function that displays the weather
     * @param {object} weatherData - The weather data object from open weather
     */
    const displayWeather = (weatherData) => {
        console.log("Weather Data");
        console.log(weatherData);
        let location = weatherElement.querySelector(".details .location");
        let date = weatherElement.querySelector(".details .date");
        let conditions = weatherElement.querySelector(".details .conditions");
        let temp = weatherElement.querySelector(".details .temp");
        let sunrise = weatherElement.querySelector(".details .sunrise");
        let sunset = weatherElement.querySelector(".details .sunset");
        let conditionicon = weatherElement.querySelector(".details .special-icon");
        let weatherIcon = `
        <i class="owf owf-${weatherData.weather[0].id} owf-3x"></i>
        `;
        conditionicon.innerHTML = weatherIcon;

        location.innerText = ` ${weatherData.name}, ${weatherData.sys.country}`;
        date.innerText = new Date(weatherData.dt * 1000).toLocaleDateString();
        conditions.innerText = weatherData.weather[0].description;
        temp.innerText = weatherData.main.temp + "˚C";
        sunrise.innerText = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-us');
        sunset.innerText = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-us');
    };

    /**
     * Display the weather in the console
     * @param {object} forecastData - Gets the current Forecast
     */
    const displayForecast = (forecastData) => {
        console.log(forecastData);
    };

    // EventListener to read the city from the user
    document.querySelector(".frm.weather")
        .addEventListener("submit", e => {
            e.preventDefault();
            let location = e.target.querySelector("[name=location]").value;
            // Fetch Function
            currentWeatherRequest(location);
        });
    /**
     * get usable current weather
     */
    const currentWeatherRequest = async(city) => {
        try {
            let currentWeatherEndpoint = `${BASE_END_POINT}weather?q=${city}&appid=${API_KEY}&units=metric`;
            let forecastEndpoint = `${BASE_END_POINT}forecast?q=${city}&appid=${API_KEY}`;
            var response = await fetch(currentWeatherEndpoint);
            var json = await response.json();
            //console.log(json);
            displayWeather(json);
        } catch (e) {
            console.log("Data failed to load", e);
        }
    };



    // Google scripts for putting a marker on a map
    function initMap() {
        var myLatLng = { lat: 53.55, lng: -113.47 };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }

    /**
     * TODO
     *
     * Create a Default method for OnLoadEvent
     * Fetch current Weather based on Users location by default
     * API EndPoint api.openweathermap.org/data/2.5/weather?lat=35&lon=139
     */
    // fetch(currentWeatherEndpoint)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((currentWeatherEndpoint) => {
    //         displayForecast(currentWeatherEndpoint)
    //     })
    // fetch(forecstEndpoint)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((currentForecastObject) => {
    //         displayForecast(currentForecastObject)
    //     })
})();