import { useState } from 'react';

const Search = ({ books, setFilterBooks }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "") {
      setFilterBooks(books); // Reset the filter when input is empty
      return;
    }

    // Filter the books based on keyword
    const result = books.filter((book) => {
      return (
        book.bookName.toLowerCase().includes(value.toLowerCase()) ||
        book.bookType.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilterBooks(result); // Update the filtered books
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-5/6">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default Search;
