import React from "react";
import { useModal } from "../Modal/ModalContext";
import { logout } from "@/app/firebase/auth";

export default function Navbar() {
  const { user, loading } = useModal();
  const { openLogin } = useModal();

  if (loading) return null;

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="./logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          {user ? (
            <>
              <li className="nav__list nav__list--mobile">
                {user.isAnonymous ? "Guest" : user.email}
              </li>
              <li
                onClick={() => logout()}
                className="nav__list nav__list--login"
              >
                Logout
              </li>
            </>
          ) : (
            <li onClick={openLogin} className="nav__list nav__list--login">
              Login
            </li>
          )}
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
