import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CreateBooks from "./components/books/CreateBooks";
import ListBooks from "./components/books/ListBooks";
import DeleteConfirm from "./components/books/DeleteConfirm";
import UpdateBook from './components/books/UpdateBooks';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState<Book | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filter, setFilter] = useState<{ author?: string; title?: string }>({});

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/books', {
        params: { page, limit, search: filter },
      });
      setBooks(response.data.data);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch  {
      setError('Failed to fetch books');
      setLoading(false);
    }
  }, [page, limit, filter]);

  useEffect(() => {
    fetchBooks();
  }, [page, limit, filter, fetchBooks]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteConfirm = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setBookToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await axios.delete(`http://localhost:3000/books/${bookToDelete.id}`);
        fetchBooks();
        closeDeleteConfirm();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const openUpdateModal = (book: Book) => {
    setBookToUpdate(book);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setBookToUpdate(null);
    setIsUpdateModalOpen(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };


  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col justify-start items-center">
      <div className='flex w-full justify-between max-w-screen-xl'>
        <h2 className="text-2xl font-bold mb-5">List of Books</h2>
        <button
          onClick={openModal}
          className="mb-5 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add New Book
        </button>
      </div>
      <div className="mb-5 flex space-x-4">
        <input
          type="text"
          name="author"
          placeholder="Filter by author"
          value={filter.author || ''}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={filter.title || ''}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <ListBooks
        books={books}
        loading={loading}
        error={error}
        handleDeleteBook={openDeleteConfirm}
        handleUpdateBook={openUpdateModal}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {isModalOpen && <CreateBooks closeModal={closeModal} fetchBooks={fetchBooks} />}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={handleDeleteBook}
      />
       {isUpdateModalOpen && <UpdateBook book={bookToUpdate} closeModal={closeUpdateModal} fetchBooks={fetchBooks} />}
    </div>
  );
};

export default App;