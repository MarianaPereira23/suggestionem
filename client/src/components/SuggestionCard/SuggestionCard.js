/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SuggestionCard.css';

const SuggestionCard = ({ band }) => {
  const [bandInfo, setBandInfo] = useState({ topTracks: [] });

  const fetcher = async input => {
    const data = await axios.get(`http://localhost:4000/${input}/musics`);
    setBandInfo(data.data);
  };

  useEffect(() => {
    fetcher(band);
  }, [band]);

  const displayTracks = () => {
    if (!bandInfo.topTracks.length) {
      return <p>Sorry, the top tracks for this band are unknown</p>;
    }
    return bandInfo.topTracks.map((track, i) => (<li key={i}>{track}</li>));
  };

  const displayResults = () => {
    if (bandInfo === 'No results' || bandInfo === { topTracks: [] }) {
      return;
    }
    return (
      <>
        <img className="suggestion-card__image" src={bandInfo.picture} alt={bandInfo.name} />
        <div className="suggestion-card__info">
          <h3 className="info__band-name">{bandInfo.name}</h3>
          <div className="suggestion-card__details">
            <p>Top 5 tracks:</p>
            <ul className="info__top-tracks">
              {displayTracks()}
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <article className={`results-container__suggestion-card ${bandInfo === 'No results' ? 'hidden' : ''}`}>
      {displayResults()}
    </article>
  );
};

export default SuggestionCard;
