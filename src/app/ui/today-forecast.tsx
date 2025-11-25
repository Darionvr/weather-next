import { Places } from '../lib/definitions'
import { WeatherData } from '../lib/definitions'

const TodayForecast = ({ place, data }: { place: Places; data: WeatherData }) => {
 return (
    <section>
      <div>
       <p> {place.name}, {place.admin1}</p>
       <p>{data.current.temperature}</p>
      </div>
      <div>
        <p>Sensación Térmica</p>
        <p>{data.current.apparent_temperature}°</p>
        <p></p>
      </div>
      <div>
        <p>Humedad</p>
        <p>{data.current.relative_humidity_2m}%</p>
      </div>
      <div>
        <p>Viento</p>
        <p>{data.current.windspeed} km/h</p>
      </div>
      <div>
        <p>Precipitaciones</p>
        <p>{data.current.precipitation} mm</p>
      </div>
    </section>
  )
}

export default TodayForecast