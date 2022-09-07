import { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";

function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} className="logo" alt="logo da Around The U.S." />
      </header>
    </>
  );
}

export default Header;
