import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import CreateCollection from "../components/CreateCollection/createcollection";
import HandleEdit from "../components/HandleEdit/handleedit";
import MyCollection from "../components/MyCollection";
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
  const [reload, setReload] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleCollection, setToggleCollection] = useState(true);
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
        {user.name ? <>{user.name}</> : <></>}
        {user.userName ? <p>{user.userName}</p> : <></>}

        <SnapNavbar />
        <button
          onClick={() => {
            setToggleEdit(!toggleEdit);
          }}
        >
          Edit
        </button>
        {!toggleEdit && (
          <HandleEdit
            user={user}
            setReload={setReload}
            reload={reload}
            setToggleEdit={setToggleEdit}
            toggleEdit={toggleEdit}
          />
        )}

        <button
          onClick={() => {
            setToggleCollection(!toggleCollection);
          }}
        >
          Create Collection
        </button>
        {!toggleCollection && (
          <CreateCollection
            toggleCollection={toggleCollection}
            setToggleCollection={setToggleCollection}
          />
        )}
      </div>
      <MyCollection />
    </div>
  );
}

export default ProfilePage;
