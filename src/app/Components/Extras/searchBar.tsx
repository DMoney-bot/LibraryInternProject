"use client";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function searchBar() {
  return (
    <div className="borderBox">
      <div className="searchbar">
        <input className="sBar" type="text" placeholder="Search for books" />
        <button className="magnify">
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
}
