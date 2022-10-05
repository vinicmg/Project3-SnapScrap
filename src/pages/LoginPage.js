import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setLoggedUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", form);
      setLoggedUser({ ...response.data });
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        {!showPassword ? (
          <>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </>
        )}

        <spam>
          {"👀"}

          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
        </spam>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default LoginPage;
