import Link from "next/dist/client/link";
import React from "react";
import { useModal } from "../Modal/ModalContext";
import { useFontSize } from "../Modal/ModalContext";
import { usePathname } from "next/navigation";
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
  const { openLogin, user, logout } = useModal();
  const { fontSize, setFontSize } = useFontSize();
  const pathname = usePathname();

  const isPlayerPage = pathname?.includes("/player");

  const handleAuthClick = () => {
    console.log("user and clicktime: ", user);
    if (user) {
      logout();
    } else {
      openLogin();
    }
  };

  const sizes: {
    label: string;
    value: "small" | "medium" | "large" | "xlarge";
  }[] = [
    { label: "small", value: "small" },
    { label: "medium", value: "medium" },
    { label: "large", value: "large" },
    { label: "xlarge", value: "xlarge" },
  ];

  console.log("Sidebar fontSize: ", fontSize);

  return (
    <div className="sidebar">
      <div className="searchbarTop">
        <figure className="nav__img--mask">
          <img className="nav__img side__img" src="/logo.png" alt="" />
        </figure>
        <button className="for-youG sidebarBtn">
          <Link href="/for-you" className="btnLink">
            <FaHouse />
            <p className="btnTxt">For You</p>
          </Link>
        </button>
        <button className="libraryG sidebarBtn btnLink libBtn">
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
        {isPlayerPage && (
          <div className="fontSizeRow">
            {sizes.map((size) => (
              <button
                key={size.value}
                className={`fontSizeBtn fontSizeBtn--${size.value} ${fontSize === size.value ? "fontSizeBtn--active" : ""}`}
                onClick={() => setFontSize(size.value)}
              >
                Aa
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="searchbarBot">
        <button className="settingsG sidebarBtn">
          <Link href="/settings" className="btnLink">
            <FaGear />
            <p className="btnTxt">Settings</p>
          </Link>
        </button>
        <button className="helpG sidebarBtn">
          <FaRegCircleQuestion />
          <p className="btnTxt">Help & Support</p>
        </button>
        <button onClick={handleAuthClick} className="loginG sidebarBtn">
          <FaArrowRightToBracket />
          <p className="btnTxt">{user ? "Logout" : "Login"}</p>
        </button>
      </div>
    </div>
  );
}
