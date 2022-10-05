import { useEffect, useState } from "react";
import { api } from "../../api/api";
import styles from "./mycollection.module.css";

function MyCollection() {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();

  useEffect(() => {
    async function fetchColl() {
      setIsLoading(true);
      const response = api.get("/collections/my-collections");
      setColl(response.data);
      setIsLoading(false);
    }
    fetchColl();
  }, []);

  return (
    <div>
      <h1>YOUR COLLECTIONS</h1>
      {!isLoading &&
        coll.map((oneColl) => {
          return (
            <div className={styles.card}>
              <div className={styles.container}>
                <h4>
                  <b>{oneColl.collectionName}</b>
                </h4>
                <p>{oneColl.collectionDetails}</p>
                {oneColl.photos.map((photo) => {
                  return (
                    <img src={photo.data.photoUrl} alt="Avatar" width={300} />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MyCollection;
