/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import SuggestionCard from '../SuggestionCard/SuggestionCard';
import './Suggestions.css';

const Suggestions = () => {
  const [suggestedBands, setSuggestedBands] = useState([]);
  const { searchTerm } = useParams();
  let suggestions;

  const fetcher = async input => {
    const data = await axios.get(`http://localhost:4000/${input}`);
    const bands = data.data;
    if (bands === 'No results') {
      return setSuggestedBands('No results');
    }
    return setSuggestedBands(bands.splice(0, 6));
  };

  useEffect(() => fetcher(searchTerm), [searchTerm]);

  console.log(suggestedBands);

  if (suggestedBands === 'No results') {
    suggestions = <p className="results-container__no-results">Sorry, we could not find results for the band you just searched.</p>;
  }

  if (Array.isArray(suggestedBands)) {
    suggestions = suggestedBands.map((suggest, i) => <SuggestionCard key={i} band={suggest} />);
  }

  return (
    <section className="results-container">
      {suggestions}
    </section>
  );
};

export default Suggestions;
