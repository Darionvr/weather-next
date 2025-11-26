'use server'

import { Places } from "./definitions";
import { placeSchema } from "./validation";
import { fetchWeatherApi } from "openmeteo";

type State = {
  results: Places[];
  error?: string;
};

// Búsqueda en la barra de búsqueda principal
export async function searchPlacesAction(prevState: State, formData: FormData): Promise<State> {

  const query = formData.get("place");

  // Validación con Zod
  const validation = placeSchema.safeParse(query);

  if (!validation.success) {
    return {
      results: [],
      error: validation.error.issues[0].message,
    };
  }


  // Si pasa la validación, llamar a la API

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${validation.data}&count=4&language=en&format=json`
  );

  if (!res.ok) {
    return {
      results: [],
      error: "Error fetching data from API",
    };
  }

  const data = await res.json();

  const results: Places[] = (data.results || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude
  }));

  return { results };
}

//Clima del lugar seleccionado según la documentación de API Open Meteo

export async function getWeather(lat: number, lon: number) {

  const params = {
    latitude: lat,
    longitude: lon,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    hourly: "temperature_2m",
    current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "wind_speed_10m", "weather_code"],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      windspeed: current.variables(5)!.value(),
      weather_code: current.variables(6)!.value(),
    },
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: Array.from(hourly.variables(0)!.valuesArray() || []),
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m_max: Array.from(daily.variables(0)!.valuesArray() || []),
      temperature_2m_min: Array.from(daily.variables(1)!.valuesArray() || []),
    },
  };
}

