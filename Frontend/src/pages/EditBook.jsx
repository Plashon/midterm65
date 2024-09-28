import { useState, useEffect, startTransition } from "react"; // Import startTransition
import { useParams, useNavigate } from "react-router-dom";
import BookService from "../services/book.service";
import Swal from "sweetalert2";

const EditBook = () => {
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
          startTransition(() => { // Use startTransition to update state
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    startTransition(() => { // Use startTransition here for state updates
      setBooks({ ...book, [name]: value });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await BookService.updateById(id, book); // Ensure this matches your service
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update Book",
          text: "Updated successfully",
          timer: 1000,
        }).then(() => {
          navigate("/"); // Navigate to home after the alert closes
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Can not Update",
        text: error?.response?.data?.message || error.message,
        timer: 2000,
      });
    }
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
    <div className="max-w-md mx-auto mt-4 mb-5 p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-center mb-5">
        <h2 className="font-bold text-3xl text-rose-800">Edit Book</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
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
          Edit Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
