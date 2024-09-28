import React,{startTransition} from "react";
import { useAuthContext } from "../context/authContext";
import { useBookContext } from "../context/BookContext";


const Book = ({
  id,
  image,
  bookName,
  bookType,
  description,
  writer,
  price,
}) => {
  const { user } = useAuthContext();
  const { deleteBook } = useBookContext();
  // ฟังก์ชันในการลบหนังสือ
  const handleDelete = () => {
    deleteBook(id);
    
  };

  return (
    <div className="card card-side  shadow-xl w-1/3 m-2 "  id="card">
      <figure>
        <img className="w-32 h-42 object-cover" src={image} alt={bookName} />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-sm line-clamp-2">{bookName}</h2>
        <p className="text-xs break-words line-clamp-3">{description}</p>
        <p className="text-xs">
          <span className="font-bold">ประเภท:</span> {bookType}
        </p>
        <p className="text-xs">
          <span className="font-bold">ผู้แต่ง:</span> {writer}
        </p>
        <p className="text-sm">
          <span className="font-bold">ราคา:</span> {price}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent btn-sm">
            <a href={`detail/${id}`}>Watch</a>
          </button>
          {user &&
          (user.roles.includes("ROLES_MODERATOR") ||
            user.roles.includes("ROLES_ADMIN")) && (
            <div className="card-actions justify-end">
              {user.roles.includes("ROLES_ADMIN") && (
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              )}
              <a className="btn btn-primary" href={`edit/${id}`}>
                Edit
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
