// src/App.js
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <SearchForm setResults={setResults} />
      <SearchResult results={results} />
    </div>
  );
};

export default App;
