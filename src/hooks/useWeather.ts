import { useState, useEffect } from 'react';

const API_KEY = 'b053af48770c221bcfa8e975fa312906';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  rainChance?: number;
  iconCode: string;
}

interface ForecastDay {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  iconCode: string;
  condition: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  const getCurrentLocation = () => {
    return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          // Fallback to default location (London)
          resolve({ lat: 51.5074, lon: -0.1278 });
        }
      );
    });
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not available');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      const weatherInfo: WeatherData = {
        location: currentData.name,
        country: currentData.sys.country,
        temperature: currentData.main.temp,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed * 3.6, // Convert m/s to km/h
        visibility: currentData.visibility / 1000, // Convert to km
        pressure: currentData.main.pressure,
        feelsLike: currentData.main.feels_like,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        iconCode: currentData.weather[0].icon,
        rainChance: currentData.rain ? Math.round(currentData.rain['1h'] || 0) : undefined
      };

      // Process forecast data
      const forecastDays: ForecastDay[] = [];
      const processedDates = new Set();

      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        
        if (!processedDates.has(dateStr) && forecastDays.length < 7) {
          processedDates.add(dateStr);
          forecastDays.push({
            date: dateStr,
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            tempHigh: Math.round(item.main.temp_max),
            tempLow: Math.round(item.main.temp_min),
            iconCode: item.weather[0].icon,
            condition: item.weather[0].main
          });
        }
      });

      setWeather(weatherInfo);
      setForecast(forecastDays);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Location not found');
      }
      
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('Location not found');
      }
      
      const { lat, lon } = data[0];
      setLocation({ lat, lon });
      await fetchWeatherData(lat, lon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeWeather = async () => {
      try {
        const coords = await getCurrentLocation();
        setLocation(coords);
        await fetchWeatherData(coords.lat, coords.lon);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get location');
        setLoading(false);
      }
    };

    initializeWeather();
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    searchLocation,
    refetch: location ? () => fetchWeatherData(location.lat, location.lon) : undefined
  };
};