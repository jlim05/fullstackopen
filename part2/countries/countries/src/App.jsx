import { useEffect, useState } from 'react'
import axios from 'axios'
import "./App.css"


const App = (props) => {
 const [countries, setCountries] = useState([])
 const [search, setSearch] = useState('')
 const [weather, setWeather] = useState(null)

 const filteredCountries = countries.filter(country => 
  country.name.common
    .toLowerCase()
    .includes(search.toLowerCase())
)

 useEffect(() => {
  axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
 }, [])

 useEffect(() => {
    if (filteredCountries.length === 1) {
    const capital = filteredCountries[0].capital?.[0]
    const apiKey = import.meta.env.VITE_WEATHER_KEY

    if (capital) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
    }
  }
 }, [filteredCountries])

 return (
  <div>
    find countries <input value={search} onChange={(e) => setSearch(e.target.value)}/>

    {search === '' ? null : (
      filteredCountries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <div className='countryinfo'>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area}</p>
          </div>
          <div>
            <h2>Languages</h2>
            <ul>
              {Object.values(filteredCountries[0].languages).map(language => (
                  <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
          <img src={filteredCountries[0].flags.svg} alt='flag' width={100}/>
          <div>
            <h2>Weather in {filteredCountries[0].capital?.[0]}</h2>

            {weather && (
              <div>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSearch(country.name.common)}>
              show
            </button>
            </div>
          ))}
        </div>
      )
    )}
  </div>
 )

}

export default App