import { Cloud, Sun, CloudRain, Snowflake, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

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
}

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const getWeatherIcon = (iconCode: string, size: string = "w-8 h-8") => {
    if (iconCode.includes('01')) return <Sun className={`${size} text-yellow-400`} />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className={`${size} text-gray-300`} />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className={`${size} text-blue-400`} />;
    if (iconCode.includes('13')) return <Snowflake className={`${size} text-blue-200`} />;
    return <Sun className={`${size} text-yellow-400`} />;
  };

  const getTempTrend = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-400" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-blue-400" />;
    return null;
  };

  return (
    <div className="relative group">
      {/* Premium glass card with advanced effects */}
      <div className="absolute inset-0 bg-gradient-aurora rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700"></div>
      
      <div className="relative bg-glass backdrop-blur-premium border border-glass-border shadow-glass rounded-3xl p-8 max-w-lg mx-auto overflow-hidden group-hover:shadow-premium-glow transition-all duration-700">
        
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-card opacity-80 rounded-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-secondary opacity-10 rounded-full blur-3xl animate-float"></div>
        
        <div className="relative z-10 text-foreground">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-text-gradient bg-clip-text text-transparent mb-2">
              7-Day Forecast
            </h3>
            <p className="text-sm text-foreground/70">Tap any day for details</p>
          </div>

          {/* Selected day details */}
          {selectedDay < forecast.length && (
            <div className="bg-secondary/30 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-glass-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-secondary"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    {selectedDay === 0 ? 'Today' : forecast[selectedDay].day}
                  </h4>
                  <p className="text-sm text-foreground/70 capitalize">
                    {forecast[selectedDay].condition}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getWeatherIcon(forecast[selectedDay].iconCode, "w-12 h-12")}
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {Math.round(forecast[selectedDay].tempHigh)}°
                    </div>
                    <div className="text-sm text-foreground/70">
                      {Math.round(forecast[selectedDay].tempLow)}°
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forecast list */}
          <div className="space-y-3">
            {forecast.map((day, index) => (
              <div 
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`group cursor-pointer transition-all duration-300 rounded-xl p-4 border ${
                  selectedDay === index 
                    ? 'bg-primary/20 border-primary/30 shadow-lg' 
                    : 'bg-secondary/10 border-glass-border hover:bg-secondary/20 hover:border-primary/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 text-center">
                      <span className={`text-sm font-medium ${
                        index === 0 ? 'text-primary' : ''
                      }`}>
                        {index === 0 ? 'Today' : day.day}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(day.iconCode)}
                      {index > 0 && getTempTrend(day.tempHigh, forecast[index - 1].tempHigh)}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-foreground/80 capitalize truncate">
                        {day.condition}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-right">
                    <div className="space-y-1">
                      <div className="text-lg font-bold">
                        {Math.round(day.tempHigh)}°
                      </div>
                      <div className="text-sm text-foreground/60">
                        {Math.round(day.tempLow)}°
                      </div>
                    </div>
                    
                    {/* Temperature bar */}
                    <div className="w-20 h-2 bg-secondary/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-secondary rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(20, Math.min(100, ((day.tempHigh + 10) / 50) * 100))}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle hover animation */}
                <div className={`mt-2 h-0.5 bg-gradient-secondary rounded-full transition-all duration-300 ${
                  selectedDay === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}></div>
              </div>
            ))}
          </div>

          {/* Footer info */}
          <div className="mt-6 pt-4 border-t border-glass-border">
            <p className="text-xs text-foreground/50 text-center">
              Data updates every hour • Powered by premium weather intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;