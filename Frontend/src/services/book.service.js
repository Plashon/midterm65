import api from "./api";

const BOOK_API = import.meta.env.VITE_BOOK_API;
console.log(BOOK_API);

// Add function
const addBook = async (book) => {
  return await api.post(BOOK_API, book);
};

// Get all books
const getAllBook = async () => {
  return await api.get(BOOK_API);
};

// Get book by ID
const getBookById = async (id) => {
  return await api.get(`${BOOK_API}/${id}`);
};

// Update book by ID
const updateById = async (id, book) => {
  return await api.put(`${BOOK_API}/${id}`, book);
};

// Delete book by ID
const deleteBook = async (id) => {
  return await api.delete(`${BOOK_API}/${id}`);
};

// Correct duplicated addBook declaration
const BookService = {
  addBook,
  getAllBook,
  getBookById,
  updateById, // Fixed this to avoid naming issues in the context
  deleteBook,
};

console.log(BookService);

export default BookService;
