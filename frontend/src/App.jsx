import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import GameContainer from "./components/GameContainer";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";

export default function App() {
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [inviterScore, setInviterScore] = useState(null);
  const [invitedBy, setInvitedBy] = useState(null);

  useEffect(() => {
    // Extract the invitedBy parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviter = urlParams.get("invitedBy");
    setInvitedBy(inviter);

    // Load user data from localStorage if exists
    const storedUsername = localStorage.getItem("globetrotterUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleStartGame = (name) => {
    setUsername(name);
    setGameStarted(true);
    localStorage.setItem("globetrotterUsername", name);
  };

  const handleCorrectAnswer = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const newScore = score + 1;
    setScore(newScore);
    setAttempts(attempts + 1);
  };

  const handleIncorrectAnswer = () => {
    setAttempts(attempts + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-4">
      <GameContainer>
        {!gameStarted ? (
          <WelcomeScreen
            onStartGame={handleStartGame}
            invitedBy={invitedBy}
            inviterScore={inviterScore}
          />
        ) : (
          <GameScreen
            username={username}
            score={score}
            attempts={attempts}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
          />
        )}
      </GameContainer>
    </main>
  );
}
