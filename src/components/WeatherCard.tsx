import { Cloud, Sun, CloudRain, Snowflake, Eye, Droplets, Wind, Gauge, Thermometer, Sunrise, Sunset, Clock } from "lucide-react";
import { useState, useEffect } from "react";

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
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    const iconClass = "w-24 h-24 drop-shadow-2xl";
    if (iconCode.includes('01')) return <Sun className={`${iconClass} text-yellow-400 animate-pulse-slow`} />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className={`${iconClass} text-gray-300 animate-float`} />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className={`${iconClass} text-blue-400 animate-bounce`} />;
    if (iconCode.includes('13')) return <Snowflake className={`${iconClass} text-blue-200 animate-spin`} />;
    return <Sun className={`${iconClass} text-yellow-400 animate-pulse-slow`} />;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentTime = () => {
    return time.toLocaleTimeString('en-US', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="relative group">
      {/* Premium glass card with advanced effects */}
      <div className="absolute inset-0 bg-gradient-aurora rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700"></div>
      
      <div className="relative bg-glass backdrop-blur-premium border border-glass-border shadow-glass rounded-3xl p-8 max-w-lg mx-auto overflow-hidden group-hover:shadow-premium-glow transition-all duration-700 animate-glow">
        
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-card opacity-80 rounded-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-secondary opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="relative z-10 text-foreground">
          {/* Header with live time */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary animate-pulse" />
              <p className="text-sm text-foreground/80 font-medium">
                {getCurrentTime()}
              </p>
            </div>
            
            {/* Weather icon with premium effects */}
            <div className="flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              {getWeatherIcon(weather.iconCode)}
            </div>
            
            {/* Temperature with gradient text */}
            <h1 className="text-7xl font-bold mb-2 bg-text-gradient bg-clip-text text-transparent drop-shadow-2xl">
              {Math.round(weather.temperature)}°
            </h1>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold capitalize">{weather.description}</h2>
              <p className="text-lg text-foreground/90 flex items-center justify-center gap-2">
                <span>{weather.location}</span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span>{weather.country}</span>
              </p>
            </div>
          </div>

          {/* Sun times with enhanced design */}
          <div className="bg-secondary/30 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-glass-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-secondary"></div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
                  <Sunrise className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Sunrise</p>
                  <p className="text-lg font-semibold">{formatTime(weather.sunrise)}</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-foreground/60 uppercase tracking-wide">Daylight</p>
                <p className="text-sm font-medium">
                  {Math.round((weather.sunset - weather.sunrise) / 3600)}h {Math.round(((weather.sunset - weather.sunrise) % 3600) / 60)}m
                </p>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide text-right">Sunset</p>
                  <p className="text-lg font-semibold">{formatTime(weather.sunset)}</p>
                </div>
                <div className="p-2 bg-accent/20 rounded-full group-hover:bg-accent/30 transition-all duration-300">
                  <Sunset className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Weather metrics grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: Thermometer, label: 'Feels like', value: `${Math.round(weather.feelsLike)}°C`, color: 'text-red-400' },
              { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-blue-400' },
              { icon: Wind, label: 'Wind Speed', value: `${Math.round(weather.windSpeed)} km/h`, color: 'text-green-400' },
              { icon: Gauge, label: 'Pressure', value: `${weather.pressure} hPa`, color: 'text-purple-400' },
            ].map((metric, index) => (
              <div 
                key={index}
                className="bg-secondary/20 backdrop-blur-lg rounded-xl p-4 border border-glass-border hover:bg-secondary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-black/20 rounded-lg group-hover:scale-110 transition-all duration-300`}>
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">{metric.label}</p>
                    <p className="text-lg font-bold">{metric.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visibility indicator */}
          <div className="bg-secondary/20 backdrop-blur-lg rounded-xl p-4 border border-glass-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Eye className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Visibility</p>
                  <p className="text-lg font-bold">{weather.visibility} km</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-foreground/60">Conditions</p>
                <p className="text-sm font-medium capitalize">{weather.visibility > 10 ? 'Excellent' : weather.visibility > 5 ? 'Good' : 'Limited'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;