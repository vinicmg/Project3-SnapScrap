import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
