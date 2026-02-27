import React from "react";
import { BASENAME } from '../config/router'

const AUTH = `${import.meta.env.VITE_AUTH_HOST_URL}`;
const BASE = `${import.meta.env.VITE_MAIN_HOST_URL}`;

type AppHeaderProps = {
  isLoggedIn: boolean;
};

const AppHeader: React.FC<AppHeaderProps> = ({ isLoggedIn }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Simaptics Home Button */}
      <button
        onClick={() => (window.location.href = BASE)}
        style={{
          fontSize: 18,
          fontWeight: "bold",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "black",
        }}
      >
        <img
          src={`${BASENAME}/images/simaptics-favicon.jpeg`} // change to your image path
          alt="Simaptics"
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </button>

      {/* Right: Login Button (only if not authenticated) */}
      {!isLoggedIn && (
        <button
          onClick={() => (window.location.href = AUTH)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            color: "black",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default AppHeader;
