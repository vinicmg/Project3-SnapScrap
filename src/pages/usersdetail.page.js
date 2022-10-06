import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";

function UsersDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/all-users");
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      {!isLoading && (
        <>
          {user.map((eachUser) => {
            return (
              <div key={uuidv4()}>
                <img src={eachUser.profilePicture} alt="" width={100} />
                <h2>{eachUser.userName}</h2>
                {eachUser.collections.map((coll) => {
                  return (
                    <Link to={`/collections/${coll._id}`} key={uuidv4()}>
                      <p>name: {coll.collectionName}</p>
                      <p>detail: {coll.collectionDetails}</p>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default UsersDetailPage;
