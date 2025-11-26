import { WeatherData } from "../lib/definitions"
import styles from '@/app/ui/styles/hourly.module.css'
import { getWeatherIcon } from "../lib/weatherIcon";

export const HourlyForecast = ({ data }: { data: WeatherData }) => {

  if (!data.hourly) return <div>No hay datos disponibles</div>;

  // Tomar solo las próximas 8 horas
  const hoursToShow = 8;
  const now = new Date();

  // Buscar el índice de la hora actual o la siguiente disponible
  const startIndex = data.hourly.time.findIndex((t) => {
    const date = new Date(t);
    return date >= now;
  });

  // Si no se encuentra, mostrar desde el final
  const validStart = startIndex === -1 ? 0 : startIndex;

  // Tomar las próximas 8 horas a partir de la hora actual
  const nextHours = data.hourly.time
    .slice(validStart, validStart + hoursToShow)
    .map((t, idx) => ({
      t,
      i: validStart + idx,
    }));

  return (
    <section>
      <h2> Pronóstico por horas</h2>
      <div className={styles.cardContainer}>
        {nextHours.map(({ t, i }) => (
          <div key={i} className={styles.card}>
            <div>
              <img src={getWeatherIcon(data.current.weather_code)} alt="icono del clima" />
             <p> {new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p> 
            </div>
            <p>Temp: {data.hourly!.temperature_2m[i].toFixed(1)}°</p>
          </div>
        ))}
      </div>
    </section>
  );
}
