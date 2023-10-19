const apiKey = '2e67869a99e447f198083329231810';
const inputEl = document.querySelector('.form-input');
const searchBtn = document.querySelector('.btn');
const countryTitleEl = document.querySelector('.country-text');
const cityTitleEl = document.querySelector('.city-text');
const conditionIconEl = document.querySelector('.condition-icon');
const conditionTextEl = document.querySelector('.condition-text')
const temperatureTextEl = document.querySelector('.temperature-text');
const feelingDataEl = document.querySelector('.feeling_data')
const windDirDataEl = document.querySelector('.wind_dir_data');
const windSpeedDataEl = document.querySelector('.wind_speed_data');
const uvIndexEl = document.querySelector('.uv_index')
const humidityIndexEl = document.querySelector('.humidity_index');
const customDividerEl = document.querySelector('.custom-divider');

const requestWeather = async function(cityName, apiKey) {
    //const response = fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`)
    //.then((response) => response.json())
    //.then((data) => console.log(data))
    //console.log(response);
    try {
        //const request = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`)
        const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`)
        const response = await request.json();
        console.log(response)
        const countryTitle = response.location.country;
        const cityTitle = response.location.name;
        const countyTitle = response.location.region;
        const conditionIcon = 'https:' + response.current.condition.icon;
        const conditionText = response.current.condition.text;
        const temperature = response.current.temp_c
        const feelingData = response.current.feelslike_c;
        const windDirData = response.current.wind_dir;
        const windSpeedData = response.current.wind_kph;
        const uvIndex = response.current.uv;
        const humidityIndex = response.current.humidity;
        const forecastDayOneData = response.forecast.forecastday[0]
        const forecastDayTwoData = response.forecast.forecastday[1]
        const forecastDayThreeData = response.forecast.forecastday[2]
        const forecastData = [forecastDayOneData, forecastDayTwoData, forecastDayThreeData]
        console.log(forecastData)


        const responseData = [countryTitle, cityTitle, countyTitle, conditionIcon, conditionText, temperature, feelingData, windDirData, windSpeedData, uvIndex, humidityIndex, forecastData];
        displayDetails(...responseData);
    } catch(err) {
        alert(`ERROR: ${err}`)
    }
    
    
}

const formatTemperature = function(temperature) {
    return new Intl.NumberFormat('en-US', {'style': 'unit', 'unit':'celsius'}).format(temperature);
}

const formatDate = function(date) {
    return new Intl.DateTimeFormat('en-US').format(date);
}
const displayData = function(countryTitle, cityTitle, countyTitle, conditionIcon, conditionText, temperature, feelingData, windDirData, windSpeedData, uvIndex, humidityIndex, forecastData) {
    
    customDividerEl.style.display = 'block';
    countryTitleEl.innerHTML = countryTitle;
    cityTitleEl.innerHTML = `${cityTitle}, ${countyTitle} county`
    conditionIconEl.setAttribute('src', conditionIcon);
    conditionTextEl.innerHTML = conditionText;
    temperatureTextEl.innerHTML = formatTemperature(temperature);
    feelingDataEl.innerHTML = `Feels like: ${feelingData}`;
    windDirDataEl.innerHTML = `Wind direction: ${windDirData}`;
    windSpeedDataEl.innerHTML = `Wind speed: ${windSpeedData} km/h`;
    uvIndexEl.innerhtml = `UV Index: ${uvIndex}`;
    humidityIndexEl.innerHTML = `Humidity: ${humidityIndex}`;
    const forecastDataBoxEl = document.querySelector('.forecast-data-box');

    
        
    console.log(forecastDataBoxEl);
    
    if (forecastDataBoxEl.length === 0) {
        forecastData.forEach((el) => {
            const html = `<div class="daily-data-box">
                                <p class="feature-text">${el.date}</p>
                                <div class="custom-divider"></div>
                                <div class="daily-condition-box">
                                    <img src="${`https:` + el.day.condition.icon}" alt="" class="daily-condition-icon">
                                    <p class="condition-text">${el.day.condition.text}</p>
                                </div>
                                <div class="daily-details-box">
                                    <p class="feature-text">Max: ${el.day.maxtemp_c}</p>
                                    <p class="feature-text">Min: ${el.day.mintemp_c}</p>
                                </div>
                            </div>`
            forecastDataBoxEl.insertAdjacentHTML('beforeend', html)
        })
        
    } else {

        forecastDataBoxEl.innerHTML = '';
        forecastData.forEach((el) => {
            const html = `<div class="daily-data-box">
                                <p class="feature-text">${formatDate(el.date)}</p>
                                <div class="custom-divider"></div>
                                <div class="daily-condition-box">
                                    <img src="${`https:` + el.day.condition.icon}" alt="" class="daily-condition-icon">
                                    <p class="condition-text">${el.day.condition.text}</p>
                                </div>
                                <div class="daily-details-box">
                                    <p class="feature-text">Max: ${formatTemperature(el.day.maxtemp_c)}</p>
                                    <p class="feature-text">Min: ${formatTemperature(el.day.mintemp_c)}</p>
                                </div>
                            </div>`
            forecastDataBoxEl.insertAdjacentHTML('beforeend', html)
        })
    }
        
    
}

searchBtn.addEventListener('click', function() {
    const inputValue = inputEl.value;
    requestWeather(inputValue, apiKey);
})
