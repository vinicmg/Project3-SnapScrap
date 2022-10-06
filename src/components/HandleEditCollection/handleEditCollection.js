import { useState } from "react";
import { api } from "../../api/api";
import HandleDeleteCollection from "../HandleDeleteCollection/handleDelete";

function HandleEditCollection({ reload, setReload, collectionId }) {
  const [editColl, setEditColl] = useState({
    collectionName: "",
    collectionDetails: "",
  });
  const [formToggle, setFormToggle] = useState(true);

  function handleChange(e) {
    setEditColl({ ...editColl, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/collections/edit/${collectionId}`, { ...editColl });

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <>
        {!formToggle ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="collectionName">Collection name: </label>
            <input
              id="collectionName"
              name="collectionName"
              value={editColl.collectionName}
              onChange={handleChange}
            />

            <label htmlFor="collectionDetails">Details: </label>
            <input
              id="collectionDetails"
              name="collectionDetails"
              required
              value={editColl.collectionDetails}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button
              onClick={() => {
                setFormToggle(!formToggle);
              }}
              type="button"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={() => {
                setFormToggle(!formToggle);
              }}
              type="button"
            >
              Edit Collection
            </button>
          </>
        )}
        <HandleDeleteCollection collectionId={collectionId} />
      </>
    </div>
  );
}

export default HandleEditCollection;
