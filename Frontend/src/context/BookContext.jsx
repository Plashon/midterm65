import { createContext, useContext, useEffect, useState } from "react";
import BookServices from "../services/book.service";
import Swal from "sweetalert2";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [book, setBook] = useState([]);
  const [filteredBook, setFilteredBook] = useState([]);

  const fetchBook = async () => {
    try {
      const response = await BookServices.getAllBook();
      if (response.status === 200) {
        setBook(response.data);
        setFilteredBook(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  useEffect(() => {
    setFilteredBook(book);
  }, [book]);

  const addBook = async (book) => {
    try {
      const response = await BookServices.addBook(book);
      if (response.status === 200) {
        setBook((prev) => [...prev, response.data]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add new book",
          text: "Book added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add the book.",
      });
    }
  };

  const updateBookData = async (id, updatedBook) => {
    try {
      const response = await BookServices.updateById(id, updatedBook); // Correct reference here
      if (response.status === 200) {
        setBook((prev) =>
          prev.map((book) => (book.id === id ? updatedBook : book))
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Updated",
          text: "Book updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchBook();
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the book.",
      });
    }
  };

  const deleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D91656",
      cancelButtonColor: "#B7B7B7",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await BookServices.deleteBook(id);
          if (response.status === 200) {
            setBook((prev) => prev.filter((book) => book.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "The book was deleted successfully!",
              icon: "success",
            });
            window.location.reload()
          }
        } catch (error) {
          console.error("Error deleting book:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the book.",
          });
        }
      }
    });
  };

  const getTheBookById = async (id) => {
    try {
      const response = await BookServices.getBookById(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching book by ID:", error);
    }
  };

  return (
    <BookContext.Provider
      value={{
        book,
        filteredBook,
        setFilteredBook,
        getTheBookById,
        addBook,
        updateBookData,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
