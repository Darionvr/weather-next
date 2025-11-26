import { WeatherData } from '../lib/definitions'
import { getWeatherIcon } from '../lib/weatherIcon';
import styles from '@/app/ui/styles/daily.module.css'

export const DailyForecast = ({ data }: { data: WeatherData }) => {
  if (!data.daily) return <div>No hay datos disponibles</div>;
  return (
    <section className={styles.section}>
      <h2> Pronóstico diario</h2>
      <div className={styles.cardsContainer}> 
      {data.daily.time.map((dateStr, idx) => {
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
        const tempMin = data.daily!.temperature_2m_min[idx];
        const tempMax = data.daily!.temperature_2m_max[idx];
        return (
          <div key={idx} className={styles.card}>
            <p>{dayName}</p>
            <img src={getWeatherIcon(data.current.weather_code)} alt="icono del clima" />
            <div>
              <p>{tempMin.toFixed(1)}°</p>
              <p>{tempMax.toFixed(1)}°</p>
            </div>
          </div>
        );
      })}
      </div>
    </section>
  )
}
