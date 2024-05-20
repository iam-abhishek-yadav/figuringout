import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WriteIcon from "./icons/Write";

interface AppbarProps {
  skipAuthCheck?: boolean;
  pageActions?: JSX.Element;
}

const Appbar = ({ skipAuthCheck = false, pageActions }: AppbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLoggedIn = localStorage.getItem("token");
  const hideWrite = location.pathname.includes("publish");

  if (!isUserLoggedIn && skipAuthCheck == false) {
    navigate("/signin");
  }
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16">
      <Link to="/blogs" className="text-xl font-bold">
        Medium
      </Link>
      {isUserLoggedIn ? (
        <div className="flex gap-4 items-center md:gap-8">
          {hideWrite === false && (
            <Link to="/publish">
              <button
                type="button"
                className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 rounded-lg text-sm px-5 py-2.5"
              >
                <WriteIcon /> Write
              </button>
            </Link>
          )}
          {pageActions}
          <ProfileBox />
        </div>
      ) : (
        <Link
          to="/signin"
          className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

function ProfileBox() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToBookmarks = () => {
    navigate("/bookmarks");
  };
  const goToProfile = () => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      const userInfo = JSON.parse(userLocalStorage);
      navigate(`/${userInfo.id}`);
    }
  };
  return (
    <div className="relative cursor-pointer">
      <Avatar name="Aadesh Kulkarni" onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-50 border border-gray-100 z-50 w-[160px]">
          <div className="flex flex-col gap-3">
            <div onClick={goToProfile}>Profile</div>
            <div onClick={goToBookmarks}>Bookmarks</div>
            <div onClick={logout}>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appbar;
