// Import necessary dependencies
import {useEffect, useRef, useState} from "react";
import React from 'react';
import './Weather.css';

// Import icons for different weather conditions and interface elements
import search_icon from '../search.png';
import clear_icon from '../clear.png';
import humidity_icon from '../humidity.png';
import wind_icon from '../wind.png';
import cloud_icon from '../cloud.png';
import drizzle_icon from '../drizzle.png';
import rain_icon from '../rain.png';
import snow_icon from '../snow.png';

// Main Weather component
const Weather = () => {
    // Declare states to store weather data and the searched city
    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(null); // Initialized to null to avoid access errors
    const [city, setCity] = useState(""); // State to manage the city input in the search bar

    // Dictionary mapping weather icon codes from the API to local images
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    // Function to search for weather data for a specific city
    const search = async (city) => {
        if (city === ""){
            alert("Enter city Name");
            return;
        }
        try {
            // Construct the API URL using the searched city and the API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url); // Request to the API
            const data = await response.json(); // Convert response to JSON

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data); // Log data for debugging

            // Select the appropriate weather icon or use a default icon
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            // Update the weatherData state with the fetched weather information
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon // Icon added for displaying the weather icon
            });
        } catch (error) {
            setWeatherData(false)
            console.log("error in fetching weather data"); // Handle errors in case of an issue with the request
        }
    };

    // useEffect to perform an initial weather search for "New York" when the component mounts
    useEffect(() => {
        search("London");
    }, []);

    // Function to handle manual search triggered by clicking the search icon
    const handleSearch = () => {
        if (city) { // Check to ensure a city has been entered before triggering the search
            search(city);
        }
    };

    return (
        // Main container for the weather component
        <div className="weather">
            {/* Search bar with input field and search icon */}
            <div className="search-bar">
                <input ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)} // Update the city state on input change
                />
                <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)}/> {/* Clickable icon to trigger search */}
            </div>

            {/* Display weather data if `weatherData` is available */}
            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="weather icon" /> {/* Display the corresponding weather icon */}
                    <p className="temperature">{weatherData.temperature}°C</p> {/* Current temperature */}
                    <p className="location">{weatherData.location}</p> {/* City name */}

                    {/* Section to display humidity and wind speed */}
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="humidity icon" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="wind icon" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Export the component for use in other parts of the application
export default Weather;
