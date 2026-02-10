import React from "react";

interface Props {
  modifier: number;
  onChange: (value: number) => void;
}

const ModifierInput: React.FC<Props> = ({ modifier, onChange }) => {
  return (
    <div style={{ marginTop: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {/* Label */}
      <div style={{ fontWeight: "bold" }}>Mod</div>
    
      {/* Input + vertical buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Vertical + / − buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <button
            onClick={() => onChange(modifier + 1)}
            style={{
              padding: "4px 4px",
              fontSize: 18,
              borderRadius: 6,
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              color: "black",
            }}
          >
            +
          </button>
          <button
            onClick={() => onChange(modifier - 1)}
            style={{
              padding: "4px 4px",
              fontSize: 18,
              borderRadius: 6,
              border: "1px solid #ccc",
              cursor: "pointer",
              color: "black",
              backgroundColor: "#f0f0f0",
            }}
          >
            −
          </button>
        </div>
    
        {/* Input field */}
        <input
          type="number"
          value={modifier}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          style={{
            width: 40,
            textAlign: "center",
            fontSize: 18,
            padding: "4px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>

  );
};

export default ModifierInput;
