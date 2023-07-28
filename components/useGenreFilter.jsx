import { useState } from 'react';

const useGenreFilter = (data) => {
  const [genreFilter, setGenreFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleGenreFilter = (genre) => {
    if (genreFilter === genre) {
      setGenreFilter(null);
      setFilteredData(data);
    } else {
      setGenreFilter(genre);
      const filteredResults = data.filter((item) => item.genre === genre);
      setFilteredData(filteredResults);
    }
  };

  return { filteredData, genreFilter, handleGenreFilter };
};

export default useGenreFilter;
