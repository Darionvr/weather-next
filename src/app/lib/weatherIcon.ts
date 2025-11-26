export function getWeatherIcon(weatherCode: number): string {
  if ([0, 1].includes(weatherCode)) return "/assets/images/icon-sunny.webp";
  if ([2, 3].includes(weatherCode)) return "/assets/images/icon-partly-cloudy.webp";
  if ([45, 48].includes(weatherCode)) return "/assets/images/icon-fog.webp";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "/assets/images/icon-rain.webp";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "/assets/images/icon-snow.webp";
  if ([95, 96, 99].includes(weatherCode)) return "/assets/images/icon-storm.webp";

    // Por defecto, nublado
    return "/assets/images/icon-drizzle.webp";
  }