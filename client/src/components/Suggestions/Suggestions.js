/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import SuggestionCard from '../SuggestionCard/SuggestionCard';
import './Suggestions.css';

const Suggestions = () => {
  const [suggestedBands, setSuggestedBands] = useState([]);
  const { searchTerm } = useParams();

  const fetcher = async input => {
    const data = await axios.get(`http://localhost:4000/${input}`);
    const bands = data.data.splice(0, 6);
    setSuggestedBands(bands);
  };

  useEffect(() => fetcher(searchTerm), [searchTerm]);

  const suggestions = suggestedBands.map((suggest, i) => <SuggestionCard key={i} band={suggest} />);

  return (
    <section className="results-container">
      {suggestions}
    </section>
  );
};

export default Suggestions;
