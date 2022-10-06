import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import UserDetail from "./userDetail";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nagivate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/all-users");
      setUsers(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <div>
      {!isLoading &&
        users.map((user) => {
          return (
            <div key={user._id}>
              <Link to={`/users/${user._id}`}>  
                <div>
                  <img src={user.profilePicture} alt="" width={100} />
                </div>
                {user.userName ? <>{user.userName}</> : <>{user.email}</>}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
