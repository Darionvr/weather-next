import { WeatherData } from "../lib/definitions"

export const HourlyForecast = ({data}: {data: WeatherData}) => {
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
    <div>
      {nextHours.map(({ t, i }) => (
        <div key={i}>
          <p>{new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
          <p>Temp: {data.hourly!.temperature_2m[i]}°</p>
        </div>
      ))}
    </div>
  );
}
