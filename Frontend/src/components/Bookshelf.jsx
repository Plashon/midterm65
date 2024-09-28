import React from 'react';
import { useState, useEffect } from "react";
import Book from './Book';

const Bookshelf = ({ books }) => {
  return (
    <>
      {books && // ตรวจสอบว่ามีหนังสือในอาเรย์หรือไม่
        books.map((book) => {
          return (
            <Book 
              key={book.id} // การวนซ้ำแต่ละรอบ ค่าของ key ต้องไม่ซ้ำรอบก่อนหน้า
              id={book.id}
              image={book.image}
              bookName={book.bookName}
              bookType={book.bookType}
              description={book.description}
              writer={book.writer}
              price={book.price}
            />
          );
        })
     }
    </>
  );
}

export default Bookshelf;
