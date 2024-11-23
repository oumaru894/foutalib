import React, { useState } from 'react';
import './searchPage.css';

const SearchPage = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Function to handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      // Filter items based on query
      const results = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase().trim())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      {filteredResults.length > 0 && (
        <div className="floating-results">
          {filteredResults.map((result) => (
            <div key={result.id} className="search-result-item">
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
