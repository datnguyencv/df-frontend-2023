import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function Header() {
  const { toggleTheme, isLightTheme } = useContext(ThemeContext);

  return (
    <header>
      <h1>Book Store</h1>
      <button onClick={toggleTheme}>
        {isLightTheme ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
}

export default Header;
