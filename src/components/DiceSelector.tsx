import React from "react";
import { BASENAME } from '../config/router'

interface DiceSelectorProps {
  numDice: number;
  sides: number;
  onChangeNumDice: (n: number) => void;
  onChangeSides: (s: number) => void;
}

const DiceSelector: React.FC<DiceSelectorProps> = ({
  numDice,
  sides,
  onChangeNumDice,
  onChangeSides,
}) => {
  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

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

  const scaleX = ICON_W / TILE_W;
  const scaleY = ICON_H / TILE_H;

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


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* Dice type buttons */}
      {diceTypes.map((d) => (
        <button
          key={d}
          onClick={() => onChangeSides(d)}
          title={`D${d}`}
          style={{
            width: 44,
            height: d === 100 ? 90 : 45, // taller for D100
            borderRadius: 8,
            border: sides === d ? "2px solid #4caf50" : "1px solid #ccc",
            backgroundColor: sides === d ? "#e8f5e9" : "#f0f0f0",
            cursor: "pointer",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderDieIcon(d)}
        </button>
      ))}
    
      {/* Dice number stepper with label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>Number</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Vertical + / − buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <button
              onClick={() => onChangeNumDice(numDice + 1)}
              style={{
                padding: "4px 6px",
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
              onClick={() => onChangeNumDice(Math.max(1, numDice - 1))}
              style={{
                padding: "4px 6px",
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
            min={1}
            value={numDice}
            onChange={(e) => onChangeNumDice(Math.max(1, parseInt(e.target.value) || 1))}
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
    </div>


  );
};

export default DiceSelector;
