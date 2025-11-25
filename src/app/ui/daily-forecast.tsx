import { WeatherData } from '../lib/definitions'

export const DailyForecast = ({data}: {data: WeatherData} ) => {
  if (!data.daily) return <div>No hay datos disponibles</div>;
  return (
    <div>
      {data.daily.time.map((dateStr, idx) => {
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
        const tempMin = data.daily!.temperature_2m_min[idx];
        const tempMax = data.daily!.temperature_2m_max[idx];
        return (
          <div key={idx}>
            <p>{dayName}</p>
            <p>Mín: {tempMin}°</p>
            <p>Máx: {tempMax}°</p>
          </div>
        );
      })}
    </div>
  )
}
