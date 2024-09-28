import React, { useState, useEffect, startTransition } from "react";
import Swal from "sweetalert2";
import Bookshelf from "../components/Bookshelf";
import BookService from "../services/book.service";
import Search from "../components/Search";
import { useAuthContext } from "../context/authContext";

const Home = () => {
  const { user } = useAuthContext();
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await BookService.getAllBook();
        console.log(response.data);
        if (response.status === 200) {
          // Use startTransition to update state with lower priority
          startTransition(() => {
            setBooks(response.data);
            setFilterBooks(response.data);
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Book",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    getBook();
  }, []);

  return (
    <div>
      {user ? (
        <div className="container flex flex-row flex-wrap w-full items-center justify-center">
        <Search books={books} setFilterBooks={setFilterBooks} />
        <Bookshelf books={filterBooks} />
      </div>
      ) : (
        <div className="text-4xl mb-4 font-bold">Please login</div>
      )}
    </div>
  );
};

export default Home;
