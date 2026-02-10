import React, { useState, useEffect } from "react";
import { Macro } from "../types";

interface Props {
  onSave: (name: string) => void;
  macroName: string;
  onClear: () => void;            // clears selected macro
  onResetFormula?: () => void;    // optional callback to reset dice/modifier/formula
  onDelete?: () => void;          // callback to delete macro
}

const MacroButton: React.FC<Props> = ({
  onSave,
  macroName,
  onClear,
  onResetFormula,
  onDelete,
}) => {
  const [name, setName] = useState(macroName);

  useEffect(() => {
    setName(macroName);
  }, [macroName]);

  const handleClear = () => {
    setName("");
    onClear();                 // clear selectedMacro in Home
    onResetFormula?.();        // reset formula/dice/modifier
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    setName("");               // clear input after save
    onClear();                 // clear selectedMacro
    onResetFormula?.();        // reset formula/dice/modifier
  };

  const handleDelete = () => {
    if (onDelete && macroName) {
      onDelete();              // trigger delete callback
      setName("");             // clear input
      onClear();
      onResetFormula?.();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 10, gap: 8, width: "100%" }}>
      <input
        type="text"
        value={name}
        placeholder="Macro Name"
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 6, width: "100%", boxSizing: "border-box" }}
      />
  
      {/* Stacked buttons */}
      <button
        onClick={handleSave}
        style={{ width: "100%", padding: "8px", cursor: "pointer" }}
      >
        Save
      </button>
  
      {macroName && (
        <button
          onClick={handleClear}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          Clear
        </button>
      )}
  
      {macroName && (
        <button
          onClick={handleDelete}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          Delete
        </button>
      )}
    </div>
  );

};

export default MacroButton;
