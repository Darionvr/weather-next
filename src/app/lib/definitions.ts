export type Places = {
    id: number;
    name: string;
    country: string;
    admin1: string;
    admin2: string;
    latitude: number;
    longitude:number;

}

export type WeatherData = {

  current: {
   
    temperature: number,
    relative_humidity_2m: number,
    apparent_temperature: number,
    is_day: number,
    windspeed: number,
    time: Date,
    precipitation: number,
    weather_code:number

  },
   hourly?: {
    time: Date[];
    temperature_2m: number[];
  };
  daily?: {
    time: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
 
}