import { useState } from 'react';
import './Weather.css'
import axios from 'axios';

const icons = {
    '01d': require('./icons/01d.png'),
    '01n': require('./icons/01n.png'),
    '02d': require('./icons/02d.png'),
    '02n': require('./icons/02n.png'),
    '03d': require('./icons/03d.png'),
    '03n': require('./icons/03n.png'),
    '04d': require('./icons/04d.png'),
    '04n': require('./icons/04n.png'),
    '09d': require('./icons/09d.png'),
    '09n': require('./icons/09n.png'),
    '10d': require('./icons/10d.png'),
    '10n': require('./icons/10n.png'),
    '11d': require('./icons/11d.png'),
    '11n': require('./icons/11n.png'),
    '13d': require('./icons/13d.png'),
    '13n': require('./icons/13n.png'),
    '50d': require('./icons/50d.png'),
    '50n': require('./icons/50n.png'),
};

const weather = async (city) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://open-weather13.p.rapidapi.com/city/'+city+'/EN',
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_OPEN_WEATHER_KEY,
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };
    
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log("city not found");
    }
}

const onSubmiter = async (location) => {
        try {
            const result = await weather(location);
            console.log(result.weather[0]);
            const parser = {
                weather: {
                    icon: result.weather[0].icon,
                    main: result.weather[0].main
                },
                main: {
                    temp: result.main.temp,
                    humidity: result.main.humidity
                }
            }
            return parser;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

const Weather = () => {
    const [location, setlocation] = useState(null);    
    const [submit, setSubmit] = useState(null);
    const [state, setstate] = useState(
            null
    );
    const onChangeFunct = (event) => {
        console.log(event.target.value);
        setlocation(event.target.value);
    }
    
    const handleKeyPress = async (event) => {
        
        if (event.key === 'Enter') {
            console.log("comes till here");
                
                try {
                    setSubmit(location);
                    setstate(onSubmiter(location));
                    // setlocation("");
                    const weatherData = await onSubmiter(location);
                    if (weatherData) {
                        setstate(weatherData);
                    }
                    setlocation("");
                }
            
            catch (error) {
                return null;
            }
        }
    };

    return (
        <div className="Weather-card">
            <textarea className='search-box'
                value={location}
                onChange={onChangeFunct}
                onKeyDown={handleKeyPress}
                placeholder='Enter the country and city.'
            >
            </textarea>              
            <div className="Weather-logo">
                {
                    state && state.weather &&
                    <>
                        <img src={icons[state.weather.icon]} alt={state.weather.main} />
                        
                        <div className='location'>
                            {submit}
                        </div>
                            <div className='weather-type'>
                            {state.weather.main}   
                        </div>    
                    </>
                }
                {
                    state && state.main &&
                    <div className='weather-main'>
                        <div>Temperature:{state.main.temp}
                            </div>
                        <div className='humidity'>Humidity:
                            {state.main.humidity}
                        </div>
                    </div>
                }
                {console.log(state)}
            </div>
        </div>
    );
}
export default Weather;