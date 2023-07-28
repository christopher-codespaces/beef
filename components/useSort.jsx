import { useState } from 'react';
import Fuse from 'fuse.js';

const useFilter = (data) => {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const fuzzySearchOptions = {
    includeScore: true,
    keys: ['title', 'artist'],
  };

  const fuse = new Fuse(data, fuzzySearchOptions);

  const handleFilterChange = (text) => {
    setFilterText(text);
    if (text.trim() === '') {
      setFilteredData(data);
    } else {
      const results = fuse.search(text.trim());
      setFilteredData(results.map((result) => result.item));
    }
  };

  return { filteredData, filterText, handleFilterChange };
};

export default useFilter;
