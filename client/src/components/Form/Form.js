/* eslint-disable arrow-body-style */
import React from 'react';
import './Form.css';

const Form = () => {
  return (
    <section className="form-container">
      <h2 className="form-container__section-title">Find new bands to listen to!</h2>
      <p className="form-container__section-description">Get bands similar to</p>
      <form className="search-form">
        <button type="submit" className="search-form__submit-button">+</button>
        <input type="text" className="search-form__input-field" placeholder="band name" />
      </form>
    </section>
  );
};

export default Form;
