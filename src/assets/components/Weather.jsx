import { useEffect } from "react";
import React from 'react'
import './Weather.css'
import search_icon from '../search.png'
import clear_icon from '../clear.png'
import humidity_icon from '../humidity.png'
import wind_icon from '../wind.png'
/*import cloud_icon from '../cloud.png'
import drizzle_icon from '../drizzle.png'
import rain_icon from '../rain.png'
import snow_icon from '../snow.png'*/

const Weather = () => {

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("error lors de la récupération des données météo :", error);
        }
    }

    useEffect(() => {
        search("London");
    }, []);


    return (
        <div className="weather">
            <div className='search-bar'>
                <input type='text' placeholder='Search...'/>
                <img src={search_icon} alt=""/>
            </div>
                <img src={clear_icon} alt="weather icon"/>
            <p className="temperature">16°c</p>
            <p className="location">London</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt=""/>
                    <div>
                        <p>91 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt=""/>
                    <div>
                        <p>3.6 Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Weather