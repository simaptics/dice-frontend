import React from "react";
import type { Macro } from "../types";

interface Props {
  macros: Macro[];
  onSelect: (macro: Macro) => void;
}

const MacroList: React.FC<Props> = ({ macros, onSelect }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      height: "70%",              // 👈 use ~70% of the column height
      border: "1px solid #ddd",
      borderRadius: 6,
      overflow: "hidden",         // keeps header fixed, list scrolls
    }}
  >
    <div
      style={{
        padding: "8px 10px",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
        color: "black",
        background: "#f7f7f7",
      }}
    >
      Macros
    </div>

    {/* Scrollable list area */}
    <div
      style={{
        flex: 1,
        overflowY: "auto",
      }}
    >
      {macros.length === 0 && (
        <div style={{ padding: 10, color: "#777", fontStyle: "italic" }}>
          No macros yet
        </div>
      )}

      {macros.map((m) => (
        <div
          key={m.id}
          style={{
            padding: "8px 10px",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
          }}
          onClick={() => onSelect(m)}
        >
          {m.name}
        </div>
      ))}
    </div>
  </div>
);

export default MacroList;
