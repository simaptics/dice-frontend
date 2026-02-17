import React, { useState, useEffect } from "react";
import type { Macro, RollResult } from "../types";
import { rollDice, getMacros, createOrUpdateMacro, deleteMacro, loggedIn } from "../api";
import DiceSelector from "../components/DiceSelector";
import ModifierInput from "../components/ModifierInput";
import MacroList from "../components/MacroList";
import RollButton from "../components/RollButton";
import MacroButton from "../components/MacroButton";
import ResultDisplay from "../components/ResultDisplay";
import AppHeader from "../components/AppHeader";


const Home: React.FC = () => {
    const [macros, setMacros] = useState<Macro[]>([]);
    const [selectedMacro, setSelectedMacro] = useState<Macro | null>(null);
    const [numDice, setNumDice] = useState(1);
    const [diceSides, setDiceSides] = useState(6);
    const [modifier, setModifier] = useState(0);
    const [rollResult, setRollResult] = useState<RollResult | null>(null);
    const [formula, setFormula] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const parts = [`${numDice}d${diceSides}`];
        if (modifier !== 0) {
            parts.push(modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`);
        }
        setFormula(parts.join(" "));
    }, [numDice, diceSides, modifier]);


    useEffect(() => {
      async function fetchMacros() {
        const authed = await loggedIn();
        setIsLoggedIn(authed);
    
        if (!authed) return; // stop if not logged in
    
        try {
          const data = await getMacros();
          setMacros(data);
        } catch (err) {
          console.warn("Failed to fetch macros");
        }
      }
    
      fetchMacros();
    }, []);



    useEffect(() => {
        if (selectedMacro) {
            setNumDice(selectedMacro.num_dice);
            setDiceSides(selectedMacro.sides);
            setModifier(selectedMacro.modifier);
        }
    }, [selectedMacro]);
    
    const resetDiceAndFormula = () => {
        setNumDice(1);
        setDiceSides(6);
        setModifier(0);
        setFormula("1d6");
    };


    const handleRoll = async () => {
        const result = await rollDice(numDice, diceSides, modifier);
        setRollResult(result);
    };

    const handleMacroSave = async (name: string) => {
      if (!name.trim()) return;
    
      const macro = selectedMacro
        ? { ...selectedMacro, num_dice: numDice, sides: diceSides, modifier, name }
        : { name, num_dice: numDice, sides: diceSides, modifier };
    
      try {
        const saved = await createOrUpdateMacro(macro);
    
        setMacros(prev => {
          const exists = prev.find(m => m.id === saved.id);
          if (exists) return prev.map(m => m.id === saved.id ? saved : m);
          return [...prev, saved];
        });
    
        setSelectedMacro(null); // clear after save
      } catch (err: any) {
        alert(err.message); // 🔹 simple inline alert, can replace with toast/snackbar
      }
    };

    const handleMacroDelete = async () => {
        // If no macro is selected, do nothing
        if (!selectedMacro) return;
    
        try {
            // Call the API to delete the macro
            await deleteMacro(selectedMacro.id);
    
            // Update local state to remove the deleted macro
            setMacros(prev => prev.filter(m => m.id !== selectedMacro.id));
    
            // Clear the selected macro and reset formula/dice/modifier
            setSelectedMacro(null);
            resetDiceAndFormula?.();
        } catch (err) {
            console.error("Failed to delete macro", err);
        }
    };



    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Top Header */}
        <AppHeader isLoggedIn={isLoggedIn} />
      
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: isLoggedIn ? "100px 1fr 150px" : "1fr 150px",
            gap: 10,
            padding: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Left Column: Macro List + Macro Button */}
          {isLoggedIn && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 120,          // 👈 pick a width you like
                minWidth: 120,
              }}
            >
              <MacroList macros={macros} onSelect={setSelectedMacro} />
              <MacroButton
                macroName={selectedMacro?.name || ""}
                onSave={handleMacroSave}
                onClear={() => setSelectedMacro(null)}
                onResetFormula={resetDiceAndFormula}
                onDelete={handleMacroDelete}
              />
            </div>
          )}

      
          {/* Center Column: Dice and Controls */}
          <div
            style={{
              flex: isLoggedIn ? 1 : "1 1 50%",
              display: "flex",
              justifyContent: "center",   // center the inner column horizontally
            }}
          >
            <div
              style={{
                width: 100,               // 👈 pick a width that looks good
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DiceSelector
                numDice={numDice}
                sides={diceSides}
                onChangeNumDice={setNumDice}
                onChangeSides={setDiceSides}
              />
          
              <ModifierInput modifier={modifier} onChange={setModifier} />
          
              <RollButton onClick={handleRoll} />
            </div>
          </div>

      
          {/* Right Column: Results */}
          <div
            style={{
              flex: isLoggedIn ? 1 : "1 1 50%", // if not logged in, take remaining half
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
              Formula: {formula}
            </div>
            <ResultDisplay result={rollResult} />
          </div>
        </div>
      </div>

    );


};

export default Home;
