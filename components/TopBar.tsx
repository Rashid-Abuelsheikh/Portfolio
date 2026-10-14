"use client";
import { toggleTheme } from "@/lib/theme";

export default function TopBar() {
  return (
    <div className="top">
      <div className="topin">
        <div className="sig">
          Rashid Abu Elsheikh<small>Full-stack developer · Amman</small>
        </div>
        <button className="themebtn" onClick={toggleTheme} aria-label="Switch colour theme">◐</button>
      </div>
    </div>
  );
}
