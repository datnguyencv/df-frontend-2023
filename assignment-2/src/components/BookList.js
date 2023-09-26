import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';

const BookList = () => {
  const { books, editBook, deleteBook } = useContext(BookContext);

  const handleEditClick = (id) => {
    const newName = prompt('Enter the new name:');
    if (newName) {
      editBook(id, newName);
    }
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.name}
            <button onClick={() => handleEditClick(book.id)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
