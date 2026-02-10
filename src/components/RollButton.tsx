import React from "react";

interface Props {
  onClick: () => void;
}

const RollButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      marginTop: 8,
      padding: "10px 5px",
      fontSize: 20,
      fontWeight: "bold",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      transition: "transform 0.1s ease, box-shadow 0.1s ease",
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = "translateY(1px)";
      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    }}
  >
    🎲 Roll
  </button>
);

export default RollButton;
