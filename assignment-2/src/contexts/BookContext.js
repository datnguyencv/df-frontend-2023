import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [editingBook, setEditingBook] = useState(null); 

  useEffect(() => {
    axios.get('/data/book.json').then((res) => {
      setBooks(res.data);
    });
  }, []);

  const addBook = (name) => {
    const newBook = {
      id: books.length + 1,
      name,
    };
    setBooks([...books, newBook]);
  };

  const editBook = (id, newName) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, name: newName } : book
    );
    setBooks(updatedBooks);
    setEditingBook(null); 
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <BookContext.Provider
    value={{
      books: currentBooks,
      currentPage,
      booksPerPage,
      editingBook, 
      addBook,
      editBook, 
      deleteBook, 
      paginate,
    }}
  >
    {children}
  </BookContext.Provider>
  );
};

export default BookContextProvider;
