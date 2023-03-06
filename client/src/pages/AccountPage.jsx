import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import axios from "axios";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  // Subpage is for nested routes.
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Logout from
  async function Logout() {
    await axios.post("/logout");
    setRedirect('/')
    setUser(null);
  }

  // Waiting for page
  if (!ready) {
    return "Loading...";
  }

  // Checking user status
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // Toggle the select page
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodation
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={Logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
