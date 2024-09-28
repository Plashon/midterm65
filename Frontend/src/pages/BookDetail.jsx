import React, { useState, useEffect, startTransition } from "react";
import Swal from "sweetalert2";
import BookService from "../services/book.service";
import { useNavigate, useParams } from "react-router-dom";

const BookDetail =()=> {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBooks] = useState({
    image: "",
    bookName: "",
    bookType: "",
    description: "",
    writer: "",
    price: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.getBookById(id);
        if (response.status === 200) {
          startTransition(() => {
            setBooks(response.data);
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchBook();
  }, [id]);

  const goBack = () => {
    startTransition(() => {
      navigate("/");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-lg mb-4">
      <div className="flex gap-8">
        <figure className="flex-shrink-0">
          <img
            className="w-64 h-80 object-cover rounded-md border-2 border-gray-300 shadow-md"
            src={book.image}
            alt={book.bookName}
          />
        </figure>
        <div className="flex flex-col justify-between flex-grow">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">
              {book.bookName}
            </h2>
            <p className="text-base  mb-2">{book.description}</p>
            <p className="text-base  mb-1">
              <span className="font-semibold">ประเภท:</span> {book.bookType}
            </p>
            <p className="text-base  mb-4">
              <span className="font-semibold">ผู้แต่ง:</span> {book.writer}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-base font-bold text-green-600">
              ราคา: {book.price} บาท
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              onClick={goBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
