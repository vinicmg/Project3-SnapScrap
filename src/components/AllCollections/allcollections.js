import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";

function AllCollections() {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchColl() {
      try {
        setIsLoading(true);
        const response = await api.get("/collections/collections");
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, []);

  console.log(coll);

  return (
    <div>
      <h1>YOUR COLLECTIONS</h1>
      {!isLoading &&
        coll.map((oneColl) => {
          return (
            <div
              className={styles.card}
              key={uuidv4()}
              onClick={() => {
                navigate(`/collection-detail/${oneColl._id}`);
              }}
            >
              <div className={styles.container}>
                <h4>
                  <b>{oneColl.collectionName}</b>
                </h4>
                <p>{oneColl.collectionDetails}</p>
                {oneColl.photos.map((photo) => {
                  return (
                    <div key={uuidv4()}>
                      <img src={photo.photoUrl} alt="Avatar" width={300} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AllCollections;
