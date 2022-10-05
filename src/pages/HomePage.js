import AllCollections from "../components/AllCollections/allcollections";
import SnapNavbar from "../components/SnapNavbar/navbar";
import SignUpPage from "./signUpPage";

function HomePage() {
  return (
    <div>
      <h1>HELLO WORLD!</h1>
      <SnapNavbar />
      <AllCollections />

      <SignUpPage />
    </div>
  );
}

export default HomePage;
