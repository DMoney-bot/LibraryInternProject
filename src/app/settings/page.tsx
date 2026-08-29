"use client";
import React from "react";
import Sidebar from "../Components/Extras/sidebar";
import SearchBar from "../Components/Extras/searchBar";
import { useModal } from "../Components/Modal/ModalContext";

export default function settings() {
  const { openLogin, user, logout } = useModal();

  return (
    <div className="temps">
      <Sidebar />
      <SearchBar />
      <div className="forYouPage">
        {user ? (
          <div className="settingsWrapper">
            <h1 className="settingsTitle">Settings</h1>
            <div className="settingsSubPlan">
              <h1 className="settingsBoxTitle">Your Subscription Plan</h1>
              <p className="settingsBoxTxt">premium</p>
            </div>
            <div className="settingsEmail">
              <h1 className="settingsBoxTitle">Email</h1>
              <p className="settingsBoxTxt">{user.email || "Guest"}</p>
            </div>
          </div>
        ) : (
          <div className="settingsLoggedOut">
            <img
              src="/login.png"
              alt="Login"
              className="settingsLoggedOutImg"
            />
            <p className="settingsLoggedOutText">
              Log in to see your account settings
            </p>
            <button className="settingsLoggedOutButton btn" onClick={openLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
