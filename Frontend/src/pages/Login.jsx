import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/authContext";
import Swal from "sweetalert2";

const Login = () => {
    
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const { login, user: loggedInUser } = useAuthContext();
  useEffect(()=>{
    if(loggedInUser){
      navigate("/")
    }
  },[loggedInUser])
  
  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.userName, user.password);
      console.log(currentUser);
      if (currentUser.status === 200) {
        login(currentUser.data);
        Swal.fire({
          icon: "success",
          title: "User Login",
          text: "login successfully",
          timer: 1500,
        });
        setUser({
          userName: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "User Registration",
        text: error.message,
        timer: 1500,
      });
    }
  };

  const handleCancel = () => {
    setUser({ userName: "", password: "" });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
      <div className="font-bold text-3xl text-center mt-5">
        <span className="text-cyan-400 ">Login</span>
      </div>
      <label className="input input-bordered flex items-center gap-2 my-5">
        User Name
        <input
          type="text"
          className="grow"
          placeholder="ชื่อผู้ใช้"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 my-5">
        Password
        <input
          type="password"
          className="grow"
          placeholder="********"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
        <button className="btn btn-error" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Login;
