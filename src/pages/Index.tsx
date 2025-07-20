import { useState, useEffect } from 'react';
import { RefreshCw, Star, Shield, Zap } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import WeatherCard from '@/components/WeatherCard';
import WeatherForecast from '@/components/WeatherForecast';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { useWeather } from '@/hooks/useWeather';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { weather, forecast, loading, error, searchLocation, refetch } = useWeather();
  const { toast } = useToast();
  const [showApp, setShowApp] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Show loading spinner for premium experience
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Weather Service Alert",
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
        description: `Premium weather data for ${query} loaded successfully.`,
      });
    } catch (err) {
      toast({
        title: "Search Error",
        description: "Unable to find weather data for this location.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    if (!refetch) return;
    
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Data Refreshed",
        description: "Weather data has been updated with the latest information.",
      });
    } catch (err) {
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading || !showApp) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-aurora rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-secondary rounded-full opacity-20 blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary rounded-full opacity-5 blur-xl animate-glow"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Premium header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <h1 className="text-8xl font-bold bg-text-gradient bg-clip-text text-transparent drop-shadow-2xl animate-shimmer">
                Zephyr
              </h1>
              <div className="absolute -top-2 -right-8">
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-secondary rounded-full text-xs font-bold text-background">
                  <Star className="w-3 h-3" />
                  PREMIUM
                </div>
              </div>
            </div>
            
            <p className="text-2xl text-foreground/80 mb-6 font-light">
              Professional Weather Intelligence Platform
            </p>
            
            {/* Premium features badges */}
            <div className="flex items-center justify-center gap-6 mb-8">
              {[
                { icon: Shield, text: 'Enterprise Grade' },
                { icon: Zap, text: 'Real-time Data' },
                { icon: Star, text: 'AI Powered' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-glass backdrop-blur-lg border border-glass-border rounded-full text-sm font-medium"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-foreground/80">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} loading={loading} />

          {/* Weather Content */}
          {weather ? (
            <div className="space-y-8">
              {/* Refresh button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-glass backdrop-blur-lg border border-glass-border hover:bg-secondary/20 text-foreground transition-all duration-300 hover:shadow-premium-glow"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
              </div>

              {/* Weather cards grid */}
              <div className="grid xl:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                {/* Main Weather Card */}
                <div className="flex justify-center">
                  <WeatherCard weather={weather} />
                </div>

                {/* Forecast Card */}
                <div className="flex justify-center">
                  <WeatherForecast forecast={forecast} />
                </div>
              </div>

              {/* Premium footer */}
              <div className="text-center pt-8">
                <p className="text-sm text-foreground/50">
                  Powered by premium weather satellites • Data accuracy guaranteed
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-aurora rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700"></div>
                
                <div className="relative bg-glass backdrop-blur-premium border border-glass-border shadow-glass rounded-3xl p-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-background" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to Zephyr Premium</h3>
                    <p className="text-foreground/70">Enter any city to experience professional weather intelligence</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
