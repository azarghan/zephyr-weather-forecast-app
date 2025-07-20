import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

interface ForecastDay {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  iconCode: string;
  condition: string;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
  isDark?: boolean;
}

const WeatherForecast = ({ forecast, isDark = false }: WeatherForecastProps) => {
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-8 h-8" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-8 h-8" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-8 h-8" />;
    if (iconCode.includes('13')) return <Snowflake className="w-8 h-8" />;
    return <Sun className="w-8 h-8" />;
  };

  const cardClasses = isDark 
    ? "bg-glass backdrop-blur-glass border border-glass-border shadow-glass text-foreground" 
    : "bg-glass backdrop-blur-glass border border-glass-border shadow-glass text-foreground";

  return (
    <div className={`rounded-3xl p-6 max-w-sm mx-auto ${cardClasses}`}>
      <h3 className="text-lg font-semibold mb-4 opacity-90">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-medium w-12">
                {index === 0 ? 'Today' : day.day}
              </span>
              <div className="opacity-80">
                {getWeatherIcon(day.iconCode)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{Math.round(day.tempHigh)}°</span>
              <span className="opacity-60">{Math.round(day.tempLow)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;