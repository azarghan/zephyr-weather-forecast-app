import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="bg-glass backdrop-blur-glass border border-glass-border shadow-glass rounded-2xl p-4 mb-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-transparent border-none text-foreground placeholder:text-muted-foreground"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          size="sm"
          disabled={loading || !query.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;