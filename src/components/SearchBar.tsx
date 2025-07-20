import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zephyr-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (searchQuery: string) => {
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('zephyr-recent-searches', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      onSearch(query.trim());
      setIsExpanded(false);
    }
  };

  const handleRecentSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setIsExpanded(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('zephyr-recent-searches');
  };

  const popularLocations = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai'
  ];

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      {/* Main search container */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-aurora rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700"></div>
        
        <div className={`relative bg-glass backdrop-blur-premium border border-glass-border shadow-glass rounded-2xl overflow-hidden transition-all duration-500 ${
          isExpanded ? 'shadow-premium-glow' : 'group-hover:shadow-premium-glow'
        }`}>
          
          {/* Search form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="w-px h-5 bg-glass-border"></div>
                </div>
                
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search cities worldwide..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  className="pl-16 pr-4 py-4 bg-transparent border-none text-foreground placeholder:text-foreground/50 text-lg focus:ring-2 focus:ring-primary/50 rounded-xl"
                  disabled={loading}
                />
                
                {query && !loading && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-secondary/20 rounded-full transition-all duration-200"
                  >
                    <X className="w-4 h-4 text-foreground/50" />
                  </button>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={loading || !query.trim()}
                className="px-6 py-4 bg-gradient-secondary hover:shadow-premium-glow transition-all duration-300 text-lg font-medium rounded-xl"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>

          {/* Expanded suggestions */}
          {isExpanded && (
            <div className="border-t border-glass-border">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div className="p-6 border-b border-glass-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                      Recent Searches
                    </h4>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-foreground/50 hover:text-foreground/80 transition-colors duration-200"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search)}
                        className="px-3 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg text-sm transition-all duration-200 border border-glass-border hover:border-primary/30"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular locations */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                    Popular Destinations
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {popularLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(location)}
                      className="px-4 py-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-sm transition-all duration-200 border border-glass-border hover:border-primary/30 text-left"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;