import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import WeatherCard from '@/components/WeatherCard';
import WeatherForecast from '@/components/WeatherForecast';
import SearchBar from '@/components/SearchBar';
import { useWeather } from '@/hooks/useWeather';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { weather, forecast, loading, error, searchLocation } = useWeather();
  const { toast } = useToast();
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Show loading spinner for at least 2 seconds for better UX
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Weather Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSearch = async (query: string) => {
    try {
      await searchLocation(query);
      toast({
        title: "Location Updated",
        description: `Weather data for ${query} loaded successfully.`,
      });
    } catch (err) {
      toast({
        title: "Search Error",
        description: "Unable to find weather data for this location.",
        variant: "destructive",
      });
    }
  };

  if (loading || !showApp) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-foreground mb-4">Zephyr</h1>
          <p className="text-xl text-muted-foreground">Beautiful weather forecasting</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Weather Content */}
        {weather ? (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Main Weather Card */}
            <div className="flex justify-center">
              <WeatherCard weather={weather} />
            </div>

            {/* Forecast Card */}
            <div className="flex justify-center">
              <WeatherForecast forecast={forecast} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-glass backdrop-blur-glass border border-glass-border shadow-glass rounded-3xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-2">No Weather Data</h3>
              <p className="text-muted-foreground">Search for a city to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
