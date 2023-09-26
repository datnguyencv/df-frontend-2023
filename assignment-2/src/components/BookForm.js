import React, { useState, useContext } from 'react';
import { BookContext } from '../contexts/BookContext';

function BookForm() {
  const { addBook } = useContext(BookContext);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(name);
    setName('');
  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default BookForm;
