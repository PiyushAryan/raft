const API_URL = 'https://open-weather13.p.rapidapi.com/city/chandigarh/EN';

document.addEventListener('DOMContentLoaded',function () {
        const calculateButton = document.getElementById('calculateButton');
        const weatherElement = document.getElementById('weather');


    calculateButton.addEventListener('click', function () {
        const birthYear = document.getElementById('birthYear').value;
        if (!birthYear) {
            result.textContent = "Please enter a valid birth year.";
            return;
        }
        const currentYear = new Date().getFullYear();
        const yourAge = currentYear - birthYear;

        // Calculate the remaining years based on life expectancy
        const lifeExpectancy = 100;
        const result = document.getElementById('result');
        const yearsLeft = lifeExpectancy - yourAge;
        result.textContent = `You have ${yearsLeft} years left to live.`;
        
    })

    async function fetchWeather() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '739bd76508msh59d87ad81cefe3dp1c1d57jsnaead8c2097b7',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(API_URL, options);
            const weatherData = await response.json(); 
            console.log(weatherData);

            if (weatherElement && weatherData.main) {
                weatherElement.textContent = `Current Weather: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
            } else {
                weatherElement.textContent = `Weather data not available.`;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            if (weatherElement) {
                weatherElement.textContent = "Error fetching weather data.";
            }
        }
    }

    // Fetch weather when DOM is loaded
    fetchWeather();
});