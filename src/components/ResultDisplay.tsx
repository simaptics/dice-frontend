import React, { useEffect, useState } from "react";
import type { RollResult } from "../types";
import { BASENAME } from '../config/router'

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
    
    // const diceTypes = [4, 6, 8, 10, 12, 20, 100];

    // Sprite info
    const SPRITE_W = 768;
    const SPRITE_H = 560;
    const COLS = 3;
    const ROWS = 2;

    const TILE_W = SPRITE_W / COLS; // 256
    const TILE_H = SPRITE_H / ROWS; // 280

    // Button icon size
    const ICON_W = 60;
    const ICON_H = 60;


    const SPRITE_MAP: Record<number, { col: number; row: number }> = {
      8:  { col: 0, row: 0 },
      20: { col: 1, row: 0 },
      4:  { col: 2, row: 0 },
      6:  { col: 0, row: 1 },
      10: { col: 1, row: 1 },
      12: { col: 2, row: 1 },
    };
    
    
    const renderDieIcon = (die: number) => {
      const useDie = die === 100 ? 10 : die;
      const pos = SPRITE_MAP[useDie];
    
      // Half-size icons
      const SMALL_ICON_W = ICON_W / 2;
      const SMALL_ICON_H = ICON_H / 2;
    
      const scaleX2 = SMALL_ICON_W / TILE_W;
      const scaleY2 = SMALL_ICON_H / TILE_H;
    
      const bgSizeW = SPRITE_W * scaleX2;
      const bgSizeH = SPRITE_H * scaleY2;
    
      const bgPosX = -pos.col * TILE_W * scaleX2;
      const bgPosY = -pos.row * TILE_H * scaleY2;
    
      const singleDie = (
        <div
          style={{
            width: SMALL_ICON_W,
            height: SMALL_ICON_H,
            backgroundImage: `url(${BASENAME}/images/dice_sprite_sheet.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${bgSizeW}px ${bgSizeH}px`,
            backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          }}
        />
      );
    
      // D100 = two D10s stacked vertically
      if (die === 100) {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {singleDie}
            {singleDie}
          </div>
        );
      }
    
      return singleDie;
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
                {history.map((r) => (
                    <div
                      style={{
                        background: "#0b1220",
                        border: "1px solid #1f2933",
                        borderRadius: 8,
                        padding: 8,
                        marginBottom: 8,
                      }}
                    >
                        <div className="roll-row">
                          {r.rolls.map((roll, idx) => (
                            <div key={idx} className="die-wrapper">
                              <div className="die-icon">
                                {renderDieIcon(r.sides)}
                              </div>
                              <div className="die-number">{roll}</div>
                            </div>
                          ))}
                        </div>


                        <p>{r.total} + ({r.modifier})</p>
                        <p>
                          Result: <strong>{r.final}</strong>
                        </p>

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
