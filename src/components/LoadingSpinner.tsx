const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-background flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-glass-border rounded-full"></div>
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Zephyr</h2>
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;