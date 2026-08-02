import React from "react";
import {
  FaHouse,
  FaBookmark,
  FaPenClip,
  FaMagnifyingGlass,
  FaGear,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="searchbarTop">
        <figure className="nav__img--mask">
          <img className="nav__img side__img" src="./logo.png" alt="" />
        </figure>
        <button className="for-youG sidebarBtn">
          <FaHouse />
          <p className="btnTxt">For You</p>
        </button>
        <button className="libraryG sidebarBtn">
          <FaBookmark />
          <p className="btnTxt">My Library</p>
        </button>
        <button className="highlightsG sidebarBtn">
          <FaPenClip />
          <p className="btnTxt">Highlights</p>
        </button>
        <button className="searchG sidebarBtn">
          <FaMagnifyingGlass />
          <p className="btnTxt">Search</p>
        </button>
      </div>
      <div className="searchbarBot">
        <button className="settingsG sidebarBtn">
          <FaGear />
          <p className="btnTxt">Settings</p>
        </button>
        <button className="helpG sidebarBtn">
          <FaRegCircleQuestion />
          <p className="btnTxt">Help & Support</p>
        </button>
        <button className="loginG sidebarBtn">
          <FaArrowRightToBracket />
          <p className="btnTxt">Login</p>
        </button>
      </div>
    </div>
  );
}
