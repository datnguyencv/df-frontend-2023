import React from 'react';
import './App.css';
import Header from './components/Header';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Pagination from './components/Pagination';
import BookContextProvider from './contexts/BookContext'; 
import ThemeContextProvider from './contexts/ThemeContext'; 

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <BookContextProvider>
          <Header />
          <BookList />
          <BookForm />
          <Pagination />
        </BookContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
