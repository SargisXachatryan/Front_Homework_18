import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout, verifyUser } from "../../helpers/api";
import { IUser } from "../../helpers/types";

export const Layout = () => {
  const [account, setAccount] = useState<IUser | null>(null);
  const naviagte = useNavigate();

  useEffect(() => {
    verifyUser().then((res) => {
      if (!res.user) {
        naviagte("/login");
      } else {
        setAccount(res.user);
      }
    });
  }, []);

  const logout = () => {
    handleLogout().then(() => naviagte("/login"));
  };
  return (
    account && (
      <>
        <nav>
          <NavLink to="/profile" end>
            Profile
          </NavLink>
          <NavLink to="/profile/settings">Settings</NavLink>
          <NavLink to="/profile/followers">Followers</NavLink>
          <NavLink to="/profile/following">Following</NavLink>
          <NavLink to="/profile/photos">Photos</NavLink>
          <button onClick={logout}>Log Out</button>
        </nav>
        <div className="container">
          <Outlet context={{ account, setAccount }} />
        </div>
      </>
    )
  );
};
