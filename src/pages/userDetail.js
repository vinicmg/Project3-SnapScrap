import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/api";

function UserDetail() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get(`/users/user/${idUser}`);
      setUsers(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  console.log(users);

  return (
    <div>
      {!isLoading &&
        users.map((user) => {
          return (
            <div>
              <Link to={`/users/${user._id}`}>{user.userName}</Link>
            </div>
          );
        })}
    </div>
  );
}

export default UserDetail;
