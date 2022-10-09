import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import HandleEditCollection from "../components/HandleEditCollection/handleEditCollection";
import { AuthContext } from "../contexts/authContext";
import unliked from '../../src/assets/unliked.png'
import liked from '../../src/assets/liked.png'

function CollectionsDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState();
  const [togglePhoto, setTogglePhoto] = useState(true);
  const [reload, setReload] = useState(false);
  const { loggedUser } = useContext(AuthContext);

  const { collectionId } = useParams();

  useEffect(() => {
    async function fetchColl() {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/collections/collection/${collectionId}`
        );
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, [reload]);

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(img);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [img]);

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      console.log(uploadData);
      const response = await api.post("/upload-image", uploadData);
      console.log(response);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();

      await api.post(`/photos/create/${collectionId}`, { photoUrl: imgURL });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePhoto(photo) {
    try {
      await api.delete(`/photos/delete/${photo}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePhotoClick(photo) {
    if (photo.likes.includes(loggedUser.user._id)) {
      handleRemoveLikePhoto(photo._id)
      return
    }

    handleAddLikePhoto(photo._id)
  }

  async function handleAddLikePhoto(photoId) {
    try {    
      await api.put(`/photos/add-like/${photoId}`)
      setReload(!reload)
    } catch(error) {
      console.log(error)
    }
  }

  async function handleRemoveLikePhoto(photoId) {
    try {
      await api.put(`/photos/remove-like/${photoId}`)
      setReload(!reload)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>{coll.collectionName}</h1>
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            Back
          </button>
          {coll.author._id === loggedUser.user._id && (
            <HandleEditCollection
              collectionId={collectionId}
              reload={reload}
              setReload={setReload}
            />
          )}

          {coll.author._id === loggedUser.user._id && (
            <>
              {!togglePhoto ? (
                <form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleImage} />
                  {img && <img src={preview} alt="Avatar" width={200} />}
                  <button
                    type="submit"
                    onClick={() => {
                      setTogglePhoto(!togglePhoto);
                    }}
                  >
                    Enter
                  </button>
                  <button
                    onClick={() => {
                      setTogglePhoto(!togglePhoto);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setTogglePhoto(!togglePhoto);
                  }}
                  type="button"
                >
                  Add Foto
                </button>
              )}
            </>
          )}

          <div className="card">
            {coll.photos.map((photo) => {
              return (
                <div key={photo._id} className="btnDivShow">
                  <img src={photo.photoUrl} alt="Avatar" width={300}/>
                  <img 
                    src={photo.likes.includes(loggedUser.user._id) ? liked : unliked} 
                    onClick={() => handlePhotoClick(photo)}
                    width={25}
                  />
                  {coll.author._id === loggedUser.user._id && (
                    <button
                      className="btnHidden"
                      onClick={() => handleDeletePhoto(photo._id)}
                      type="button"
                    >
                      delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionsDetail;
