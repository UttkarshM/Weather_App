const getWeather = (country,city) => {
    const options = {
        method: 'GET',
        url: 'https://weather-api92.p.rapidapi.com/weather',
        params: {
            country: country,
            city: city
        },
        headers: {
            'x-rapidapi-key': 'bc36482522msh5e65eb83c4b9fa0p1dc0b6jsnb87f3f5eabc4',
            'x-rapidapi-host': 'weather-api92.p.rapidapi.com'
        }
    };
    return options;
}
export default getWeather;