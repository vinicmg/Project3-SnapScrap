import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";

function UsersDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get(`/users/user/${userId}`);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  console.log("aqui buceta", user);
  return (
    <div>
      {!isLoading && (
        <>
          <div>
            <img srsc={user.profilePicture} alt="" width={100} />
          </div>
          {user.name ? <p>{user.name}</p> : <p>{user.email}</p>}
          {user.userName ? <p>@{user.userName}</p> : null}
            {user.collections.map((coll) => {
              console.log(coll);
              return (
                <Link to={`/collection-detail/${coll._id}`} key={uuidv4()}>
                  <p>Collection Name: {coll.collectionName}</p>
                  <p>Collection Detail: {coll.collectionDetails}</p>
                </Link>
              );
            })}
        </>
      )}
    </div>
  );
}

export default UsersDetailPage;
