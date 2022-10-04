import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import HandleDelete from "../components/HandleDelete/handledelete";
import HandleEdit from "../components/HandleEdit/handleedit";
import SnapNavbar from "../components/SnapNavbar/navbar";

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    profilePicture: "",
    collections: [],
    followers: [],
    following: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilled, setIsFilled] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/profile");
      setUser(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);
  console.log(user);
  return (
    <div>
      <img src={user.profilePicture} alt="profile" />
      <div>
        <h1>Welcome! {user.email}</h1>
        {user.name ? <h1>{user.name}</h1> : <></>}
        {user.userName ? <p>{user.userName}</p> : <></>}

        {!isLoading && (
          <HandleEdit user={user} setReload={setReload} reload={reload} />
        )}
        <HandleDelete />
        <SnapNavbar />
      </div>
    </div>
  );
}

export default ProfilePage;
