
import { Places } from '../lib/definitions'
import { WeatherData } from '../lib/definitions'
import styles from '@/app/ui/styles/today.module.css'
import { getWeatherIcon } from '../lib/weatherIcon'


const TodayForecast = ({ place, data }: { place: Places; data: WeatherData }) => {

  const getFormattedDate = (date: Date = new Date()) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };


  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p> {place.name}, {place.admin1}</p>
        <p> {getFormattedDate()} </p>
        <div>
          <img src={getWeatherIcon(data.current.weather_code)} alt="icono del clima" />
          <p>{data.current.temperature.toFixed(1)}°</p>

        </div>
      </div>
      <div className={styles.cardContainer}>

        <div>
          <p>Sensación Térmica</p>
          <p>{data.current.apparent_temperature.toFixed(1)}°</p>
        </div>
        <div>
          <p>Humedad</p>
          <p>{data.current.relative_humidity_2m.toFixed(1)}%</p>
        </div>
        <div>
          <p>Viento</p>
          <p>{data.current.windspeed.toFixed(1)} km/h</p>
        </div>
        <div>
          <p>Precipitaciones</p>
          <p>{data.current.precipitation.toFixed(1)} mm</p>
        </div>
      </div>
    </section>
  )
}

export default TodayForecast