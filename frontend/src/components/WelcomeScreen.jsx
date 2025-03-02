import React, { useState, useEffect } from "react";
import { Globe, MapPin } from "lucide-react";
import { Button } from "./CustomButton";
import { Input } from "./CustomInput";
import { getUserScore } from "../services/api";

export default function WelcomeScreen({
  onStartGame,
  invitedBy,
  inviterScore,
}) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loadedInviterScore, setLoadedInviterScore] = useState(inviterScore);

  useEffect(() => {
    // Fetch inviter score from backend if we have an invitedBy param
    const fetchInviterScore = async () => {
      if (invitedBy && !inviterScore) {
        const scoreData = await getUserScore(invitedBy);
        if (scoreData) {
          setLoadedInviterScore(scoreData.score);
        }
      }
    };

    fetchInviterScore();
  }, [invitedBy, inviterScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    onStartGame(username);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div className="flex items-center justify-center space-x-2">
        <Globe className="h-10 w-10 text-emerald-400" />
        <h1 className="text-4xl font-bold tracking-tight">Globetrotter</h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          The Ultimate Travel Guessing Game
        </h2>
        <p className="text-slate-300 max-w-md">
          Test your knowledge of famous destinations around the world with
          cryptic clues!
        </p>
      </div>

      {invitedBy && (
        <div className="bg-indigo-900/40 p-4 rounded-lg border border-indigo-500/30 w-full max-w-md">
          <p className="text-indigo-200">
            You've been challenged by{" "}
            <span className="font-bold text-white">{invitedBy}</span>!
          </p>
          {loadedInviterScore !== null && (
            <p className="text-indigo-300 text-sm mt-1">
              Their score:{" "}
              <span className="font-bold text-white">{loadedInviterScore}</span>{" "}
              correct guesses
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium text-slate-300"
          >
            Enter your username to start
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Your traveler name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2"
        >
          Start Exploring
        </Button>
      </form>

      <div className="pt-4">
        <div className="flex items-center justify-center">
          <MapPin className="h-5 w-5 text-emerald-400 mr-2" />
          <p className="text-slate-300 text-sm">
            Discover 100+ destinations worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
