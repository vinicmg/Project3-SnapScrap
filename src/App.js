import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/homePage.js";
import LoginPage from "./pages/loginPage.js";
import ProfilePage from "./pages/profilePage.js";
import "./App.css";
import SnapNavbar from "./components/SnapNavbar/navbar";
import UsersPage from "./pages/usersPage.js";
import UsersDetailPage from "./pages/usersDetail";
import CollectionsDetail from "./pages/collectionsDetail";

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
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UsersDetailPage />} />
          <Route
            path="/collection-detail/:collectionId"
            element={<CollectionsDetail />}
          />
          {/* <Route path="/collection/:collectionId" element={}/> */}
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
