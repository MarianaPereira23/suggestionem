/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Form.css';

const Form = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = input;
    navigate(`/suggestions/${searchValue}`);
  };

  return (
    <section className="form-container">
      <h2 className="form-container__section-title">Find new bands to listen to!</h2>
      <p className="form-container__section-description">Get bands similar to</p>
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form__submit-button">
          <FontAwesomeIcon icon={faSearch} className="submit-button__icon" />
        </button>
        <input type="text" className="search-form__input-field" placeholder="band name" onChange={handleChange} />
      </form>
    </section>
  );
};

export default Form;
