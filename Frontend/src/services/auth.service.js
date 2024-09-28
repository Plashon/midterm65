import api from "./api";


const AUTH_API_URL = import.meta.env.VITE_AUTH_API;
console.log(AUTH_API_URL);

const register = async (userName, email, password) => {
  return await api.post(AUTH_API_URL + "/register", { userName, email, password });
};

const login = async (userName, password) => {
  const response = await api.post(AUTH_API_URL + "/login", { userName, password });
  if (response.data.accessToken) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
    localStorage.setItem("user", JSON.stringify(response.data));
  }
 return response;
};
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
