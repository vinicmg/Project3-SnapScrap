import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

function HandleDeleteCollection({ collectionId }) {
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await api.delete(`/collections/delete/${collectionId}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={handleDelete} type="button">
        Delete Collection
      </button>
    </>
  );
}

export default HandleDeleteCollection;
