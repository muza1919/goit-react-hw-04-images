import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      toast.error('Please, enter some keywords!');
      return;
    }

    onSearch(value);
    setValue('');
  };

  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <button
          className="SearchForm-button SearchForm-button-label"
          type="submit"
        >
          <span>
            <BiSearchAlt2 className="SearchForm-button-label" />
          </span>
        </button>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};