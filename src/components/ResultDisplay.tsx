import React, { useEffect, useState } from "react";
import { RollResult } from "../types";

interface Props {
    result: RollResult | null;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
    const [history, setHistory] = useState<RollResult[]>([]);

    useEffect(() => {
        if (result) {
            // Prepend the new result and keep only the last 10
            setHistory(prev => [result, ...prev].slice(0, 10));
        }
    }, [result]);

    const handleClearHistory = () => {
        setHistory([]);
    };

    if (!history.length) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
            <div
              style={{
                flex: "0 0 70%",
                overflowY: "auto",
                paddingRight: 6,
              }}
            >
                {history.map((r, idx) => (
                    <div
                      style={{
                        background: "#0b1220",
                        border: "1px solid #1f2933",
                        borderRadius: 8,
                        padding: 8,
                        marginBottom: 8,
                      }}
                    >
                        <p><strong>Roll {history.length - idx}:</strong> {r.rolls.join(", ")}</p>
                        <p>Total: {r.total}</p>
                        <p>Modifier: {r.modifier}</p>
                        <p>Final: {r.final}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={handleClearHistory}
                style={{
                    marginTop: 10,
                    padding: "6px 12px",
                    cursor: "pointer",
                    alignSelf: "center",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    color: "black",
                }}
            >
                Clear History
            </button>
        </div>
    );
};

export default ResultDisplay;
