import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useBookContext } from "../context/BookContext";
import Swal from "sweetalert2";

const AddBook = ()=> {
  const { user } = useAuthContext();
  const { addBook } = useBookContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.roles.includes("ROLES_ADMIN")) {
      navigate("/");
    }
  }, [user, navigate]);

  const [book, setBook] = useState({
    image: "",
    bookName: "",
    bookType: "",
    description: "",
    writer: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.bookName || !book.writer || !book.price) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill out all required fields.",
      });
      return;
    }
    const newBook = { ...book };
    // Wrap the async operation with startTransition
    startTransition(() => {
      addBook(newBook)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Book added",
            text: "The new book was added successfully!",
            timer: 1500,
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while adding the book.",
          });
        });
    });
  };

  const bookTypes = [
    "เบ็ตเตล็ดหรือความรู้ทั่วไป",
    "ปรัชญา",
    "ศาสนา",
    "สังคมศาสตร์",
    "ภาษาศาสตร์",
    "วิทยาศาสตร์",
    "วิทยาศาสตร์ประยุกต์",
    "ศิลปกรรมและการบันเทิง",
    "วรรณคดี",
    "ประวัติศาสตร์และภูมิศาสตร์",
  ];

  return (
    <div className="max-w-md mx-auto mt-4 mb-5 p-6 rounded-md shadow-md">
      <div className="flex items-center justify-center mb-5">
        <h2 className="font-bold text-3xl text-rose-800">Add New Book</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Image URL</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Image URL"
            name="image"
            onChange={handleChange}
            value={book.image}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Book Name</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Book Name"
            name="bookName"
            onChange={handleChange}
            value={book.bookName}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Book Type</label>
          <select
            name="bookType"
            onChange={handleChange}
            value={book.bookType}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a book type
            </option>
            {bookTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Description</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={book.description}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Writer</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Writer"
            name="writer"
            onChange={handleChange}
            value={book.writer}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-start">Price</label>
          <input
            type="number"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Price"
            name="price"
            onChange={handleChange}
            value={book.price}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add New Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
