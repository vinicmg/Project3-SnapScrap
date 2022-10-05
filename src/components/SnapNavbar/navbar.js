import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

function SnapNavbar() {
  const navigate = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  function handleLogOut(e) {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  }

  return (
    <>
      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}

export default SnapNavbar;
