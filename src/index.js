import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Logo from './assets/img/logo.jpeg';
import News from './assets/img/news.jpeg';
import Weather from './assets/img/weather.jpeg';

$("link").attr("href", Logo);
$("img").attr("src", News);
$(".forecast").attr("src", Weather);

$(document).ready(function () {
  // Tab Click Event Handlers
  $("#locationTab").click(function () {
    $(".location-method").show();
    $(".latlong-method").hide();
    $(".citycountry-method").hide();

    // Add the "active" class to the Location Tab button and remove it from the Latitude and Longitude Tab button
    $("#locationTab").addClass("active");
    $("#latlongTab").removeClass("active");
    $("#citycountryTab").removeClass("active");
  });

  $("#latlongTab").click(function () {
    $(".location-method").hide();
    $(".latlong-method").show();
    $(".citycountry-method").hide();

    // Add the "active" class to the Latitude and Longitude Tab button and remove it from the Location Tab button
    $("#latlongTab").addClass("active");
    $("#locationTab").removeClass("active");
    $("#citycountryTab").removeClass("active");
  });

  $("#citycountryTab").click(function () {
    $(".location-method").hide();
    $(".latlong-method").hide();
    $(".citycountry-method").show();

    // Add the "active" class to the City Name and Country Code Tab button and remove it from the Location Tab button
    $("#citycountryTab").addClass("active");
    $("#latlongTab").removeClass("active");
    $("#locationTab").removeClass("active");
  });

  $('#weatherLocation').click(function () {
    // Check if the location method is selected
    if ($('#locationTab').hasClass('active')) {
      const city = $('#location').val();
      $('#location').val("");

      let promise = new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(request.response);
          }
        }

        request.open("GET", url, true);
        request.send();
      });
      promise.then(function (response) {
        const body = JSON.parse(response);
        const City = city.charAt(0).toUpperCase() + city.slice(1);
        $('.showHumidity').text(`The humidity in ${City} is ${body.main.humidity}%`);
        $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
        $('.showWeather').text(`${City}'s weather condition is ${body.weather[0].main}.`);
        $('.showDescription').text(`${City} currently has ${body.weather[0].description}.`);
        $('.showWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
        $('.showCountry').text(`${City} is located in ${body.sys.country}.`);
        $('.showTimezone').text(`${City}'s timezone is ${body.timezone}.`);
        $('.showErrors').text("");
      }, function (error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
        $('.showHumidity').text("");
        $('.showTemp').text("");
        $('.showWeather').text("");
        $('.showDescription').text("");
        $('.showWindspeed').text("");
        $('.showCountry').text("");
        $('.showTimezone').text("");
      });
      $(".id1").show();
      $(".id2").hide();
      $(".id3").hide();
    }

    else if ($('#latlongTab').hasClass('active')) {
      // Latitude and Longitude method
      const long = $('#longitude').val();
      $('#longitude').val("");
      const lat = $('#latitude').val();
      $('#latitude').val("");

      let promise = new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`;

        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(request.response);
          }
        }

        request.open("GET", url, true);
        request.send();
      });

      promise.then(function (response) {
        const body = JSON.parse(response);
        $('.newHumidity').text(`The humidity in ${body.name} is ${body.main.humidity}%`);
        $('.newTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
        $('.newWeather').text(`${body.name}'s weather condition is ${body.weather[0].main}.`);
        $('.newDescription').text(`${body.name} currently has ${body.weather[0].description}.`);
        $('.newWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
        $('.newCountry').text(`${body.name} is located in ${body.sys.country}.`);
        $('.newTimezone').text(`${body.name}'s timezone is ${body.timezone}.`);
        $('.newErrors').text("");
      }, function (error) {
        $('.newErrors').text(`There was an error processing your request: ${error}`);
        $('.newHumidity').text("");
        $('.newTemp').text("");
        $('.newWeather').text("");
        $('.newDescription').text("");
        $('.newWindspeed').text("");
        $('.newCountry').text("");
        $('.newTimezone').text("");
      });
      $(".id2").show();
      $(".id1").hide();
      $(".id3").hide()
    }

    else {
      // City Name and Country Code method
      const town = $('#town').val();
      $('#citycountry').val("");
      const code = $('#code').val();
      $('#citycountry').val("");
      
      let promise = new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${town},${code}&appid=${process.env.API_KEY}`;

        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(request.response);
          }
        }

        request.open("GET", url, true);
        request.send();
      });

      promise.then(function (response) {
        const body = JSON.parse(response);
        const Town = town.charAt(0).toUpperCase() + town.slice(1);
        $('.otherHumidity').text(`The humidity in ${Town} is ${body.main.humidity}%`);
        $('.otherTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
        $('.otherWeather').text(`${Town}'s weather condition is ${body.weather[0].main}.`);
        $('.otherDescription').text(`${Town} currently has ${body.weather[0].description}.`);
        $('.otherWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
        $('.otherCountry').text(`${Town} is located in ${body.sys.country}.`);
        $('.otherTimezone').text(`${Town}'s timezone is ${body.timezone}.`);
        $('.otherErrors').text("");
      }, function (error) {
        $('.otherErrors').text(`There was an error processing your request: ${error}`);
        $('.otherHumidity').text("");
        $('.otherTemp').text("");
        $('.otherWeather').text("");
        $('.otherDescription').text("");
        $('.otherWindspeed').text("");
        $('.otherCountry').text("");
        $('.otherTimezone').text("");
      });
      $(".id3").show();
      $(".id1").hide()
      $(".id2").hide()
    }
  });
});