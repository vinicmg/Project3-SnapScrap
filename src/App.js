import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import CollectionsDetail from "./pages/collectionsDetail.page";
import "./App.css";
import SnapNavbar from "./components/SnapNavbar/navbar";
import UsersDetailPage from "./pages/usersDetail.page";
import UsersPage from "./pages/usersPage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <SnapNavbar />
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users/:userdId" element={<UsersDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route
            path="/collections/:collectionId"
            element={<CollectionsDetail />}
          />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
