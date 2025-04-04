document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateButton");
    const weatherElement = document.getElementById("weather");
    const countdownElement = document.getElementById("countdown");

    calculateButton.addEventListener("click", function () {
        const birthYear = document.getElementById("birthYear").value;
        const location = document.getElementById("getLocation").value;
        
        if (!birthYear) {
            countdownElement.textContent = "Please enter a valid birth year.";
            return;
        }
        if (!location) {
            weatherElement.textContent = "Please enter a valid location.";
            return;
        }

        const currentYear = new Date().getFullYear();
        const yourAge = currentYear - birthYear;
        const lifeExpectancy = 100;
        const yearsLeft = lifeExpectancy - yourAge;


        startCountdown(yearsLeft);
        fetchWeather(location);
    });

    function startCountdown(yearsLeft) {
        let endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + yearsLeft);
        
        function updateTimer() {
            let now = new Date();
            let timeDiff = endDate - now;

            if (timeDiff <= 0) {
                countdownElement.textContent = "Time's up!";
                return;
            }

            let years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
            let days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
            let months = Math.floor(days / 30);
            days %= 30;
            let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDiff % (1000 * 60 * 60)) / 1000);

            countdownElement.textContent = `${years} Years : ${months} Months : ${days} Days left : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    async function fetchWeather(location) {
        const API_URL = `https://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=${encodeURIComponent(location)}`;
        weatherElement.innerHTML =  `<div class="flex items-center justify-center w-full h-full">
        <svg aria-hidden="true" class="w-8 h-8 text-black animate-spin dark:text-slate-100 fill-lime-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                            <span class="sr-only">Loading...</span>
                                            </div>`;
        
        try {
            const response = await fetch(API_URL);
            const weatherData = await response.json();
            console.log(weatherData);

            if (weatherElement && weatherData.current && weatherData.current.air_quality) {
                weatherElement.textContent = `Current Weather: ${weatherData.current.temperature}°C, ${weatherData.current.weather_descriptions[0]}, AQI: PM10 - ${weatherData.current.air_quality.pm10} PM 2.5 - ${weatherData.current.air_quality.pm2_5}`;
            } else {
                weatherElement.textContent = "Weather data not available.";
            }
        } catch (error) {
            weatherElement.textContent = "Error fetching weather data.";
        }
    }
});
