'use client'
import styles from "./page.module.css";
import SearchBar from "./ui/search-bar";
import { useState } from "react";
import { DailyForecast } from "./ui/daily-forecast";
import { HourlyForecast } from "./ui/hourly-forecast";
import { WeatherData } from "./lib/definitions";
import { Places } from "./lib/definitions";
import TodayForecast from "./ui/today-forecast";


export default function Home() {

  const [selectedPlace, setSelectedPlace] = useState<Places | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  console.log(weather);

  return (
    <div className={styles.page}>
      <header>
        <img src="/assets/images/logo.svg" alt="logo" />
      </header>
      <main className={styles.main}>
        <h1>
          El clima en tu ciudad
        </h1>
        <SearchBar
          onPlaceSelected={(place: Places, data: WeatherData) => {
            setSelectedPlace(place);
            setWeather(data);
          }}
        />
        {selectedPlace && weather && (
          <>
            <TodayForecast place={selectedPlace} data={weather} />
            <DailyForecast data={weather} />
            <HourlyForecast data={weather} />
          </>
        )}
      </main>
    </div>
  );
}
