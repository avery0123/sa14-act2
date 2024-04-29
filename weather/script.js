document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '5b61fccd85b14893bf0212825242904';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    document.getElementById('currentTime').textContent = `Current Time: ${data.location.localtime}`;
    document.getElementById('currentTemp').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('weatherIcon').src = data.current.condition.icon;
    document.getElementById('weatherIcon').alt = data.current.condition.text;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;

    // Display 5-day forecast
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.textContent = `${data.forecast.forecastday[i].date}: ${data.forecast.forecastday[i].day.avgtemp_c}°C`;
        forecastDiv.appendChild(forecastItem);
    }
}
