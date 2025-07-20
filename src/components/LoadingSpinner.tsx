import { useState, useEffect } from 'react';
import { Cloud, Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  const [loadingText, setLoadingText] = useState('Initializing Zephyr');

  useEffect(() => {
    const texts = [
      'Initializing Zephyr',
      'Connecting to satellites',
      'Analyzing atmospheric data',
      'Processing weather patterns',
      'Finalizing forecast'
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-primary flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-aurora rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-secondary rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary rounded-full opacity-40 animate-glow"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-32 h-32 border-4 border-glass-border rounded-full opacity-30"></div>
          
          {/* Spinning ring */}
          <div className="w-32 h-32 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          
          {/* Inner pulsing circle */}
          <div className="w-20 h-20 bg-gradient-secondary rounded-full absolute top-6 left-6 animate-pulse-slow"></div>
          
          {/* Center icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Cloud className="w-8 h-8 text-foreground animate-float" />
          </div>
        </div>

        {/* Logo and text */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-text-gradient bg-clip-text text-transparent animate-shimmer">
            Zephyr
          </h1>
          <div className="h-8 flex items-center justify-center">
            <p className="text-xl text-foreground/80 animate-pulse">
              {loadingText}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Premium Weather Intelligence</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 w-64 mx-auto">
          <div className="w-full bg-glass backdrop-blur-glass rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-secondary animate-shimmer rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;