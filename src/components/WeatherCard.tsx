import { Cloud, Sun, CloudRain, Snowflake, Wind, Eye, Droplets } from "lucide-react";

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

interface WeatherCardProps {
  weather: WeatherData;
  isDark?: boolean;
}

const WeatherCard = ({ weather, isDark = false }: WeatherCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-16 h-16" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-16 h-16" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-16 h-16" />;
    if (iconCode.includes('13')) return <Snowflake className="w-16 h-16" />;
    return <Sun className="w-16 h-16" />;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const cardClasses = isDark 
    ? "bg-glass backdrop-blur-glass border border-glass-border shadow-glass text-foreground" 
    : "bg-glass backdrop-blur-glass border border-glass-border shadow-glass text-foreground";

  return (
    <div className={`rounded-3xl p-8 max-w-sm mx-auto ${cardClasses}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-sm opacity-80 mb-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.iconCode)}
        </div>
        <h1 className="text-4xl font-bold mb-2">{weather.condition} {Math.round(weather.temperature)}°C</h1>
        <p className="text-lg opacity-90">{weather.location}, {weather.country}</p>
      </div>

      {/* Sun times */}
      <div className="bg-black/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" />
          <span className="text-sm">{formatTime(weather.sunrise)}</span>
        </div>
        <div className="text-xs opacity-70">{Math.round((weather.sunset - weather.sunrise) / 3600)}h {Math.round(((weather.sunset - weather.sunrise) % 3600) / 60)}m</div>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatTime(weather.sunset)}</span>
          <Sun className="w-4 h-4" />
        </div>
      </div>

      {/* Rain chance */}
      {weather.rainChance && (
        <div className="bg-black/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <CloudRain className="w-5 h-5 opacity-70" />
          <span>Rain {weather.rainChance}%</span>
        </div>
      )}

      {/* Weather details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="opacity-80">Humidity:</span>
          <span className="font-semibold">{weather.humidity}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-80">Wind:</span>
          <span className="font-semibold">{Math.round(weather.windSpeed)} km/h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-80">Feels like:</span>
          <span className="font-semibold">{Math.round(weather.feelsLike)}°</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-80">Pressure:</span>
          <span className="font-semibold">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;