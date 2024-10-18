import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface ListBooksProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  handleDeleteBook: (book: Book) => void;
  handleUpdateBook: (book: Book) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ListBooks: React.FC<ListBooksProps> = ({ books, loading, error, handleDeleteBook, handleUpdateBook, currentPage, totalPages, onPageChange }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const trimDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 h-[70vh] flex flex-col justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="w-[25rem]  border p-4 rounded-md shadow-sm flex flex-col justify-between">
            <div className='flex justify-between items-start'>
              <div>
                <h3 className="text-lg font-bold">{book.title}</h3>
                <h4 className="text-sm font-bold text-gray-700">{book.author}</h4>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateBook(book)}
                  className="mt-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteBook(book)}
                  className="mt-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{trimDescription(book.description, 100)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between">
      <button
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700'}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListBooks;