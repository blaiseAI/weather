"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Weather App to display the current weather on the webpage
 * This is an application to demonstrate how to use fetch
 * using openWeatherApi
 */
(function () {
  /**
   * @const {string} - Base Endpoint
   */
  var BASE_END_POINT = "https://api.openweathermap.org/data/2.5/";
  var API_KEY = config.apikey;
  var weatherElement = document.querySelector('.weather-display');
  /**
   * This is a function that displays the weather
   * @param {object} weatherData - The weather data object from open weather
   */

  var displayWeather = function displayWeather(weatherData) {
    console.log("Weather Data");
    console.log(weatherData);
    var location = weatherElement.querySelector(".details .location");
    var date = weatherElement.querySelector(".details .date");
    var conditions = weatherElement.querySelector(".details .conditions");
    var temp = weatherElement.querySelector(".details .temp");
    var sunrise = weatherElement.querySelector(".details .sunrise");
    var sunset = weatherElement.querySelector(".details .sunset");
    location.innerText = " ".concat(weatherData.name, ", ").concat(weatherData.sys.country);
    date.innerText = new Date(weatherData.dt * 1000);
    conditions.innerText = weatherData.weather[0].main;
    temp.innerText = weatherData.main.temp;
    sunrise.innerText = new Date(weatherData.sys.sunrise * 1000);
    sunset.innerText = new Date(weatherData.sys.sunset * 1000);
  };
  /**
   * Display the weather in the console
   * @param {object} forecastData - Gets the current Forecast
   */


  var displayForecast = function displayForecast(forecastData) {
    console.log(forecastData);
  }; // EventListener to read the city from the user


  document.querySelector('.frm.weather').addEventListener('submit', function (e) {
    e.preventDefault();
    var location = e.target.querySelector('[name=location]').value; // Fetch Function

    currentWeatherRequest(location);
  });
  /**
   * get usable current weather
   */

  var currentWeatherRequest =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(city) {
      var currentWeatherEndpoint, forecastEndpoint, response, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              currentWeatherEndpoint = "".concat(BASE_END_POINT, "weather?q=").concat(city, "&appid=").concat(API_KEY, "&units=metric");
              forecastEndpoint = "".concat(BASE_END_POINT, "forecast?q=").concat(city, "&appid=").concat(API_KEY);
              _context.next = 5;
              return fetch(currentWeatherEndpoint);

            case 5:
              response = _context.sent;
              _context.next = 8;
              return response.json();

            case 8:
              json = _context.sent;
              //console.log(json);
              displayWeather(json);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.log('Data failed to load', _context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function currentWeatherRequest(_x) {
      return _ref.apply(this, arguments);
    };
  }();
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
