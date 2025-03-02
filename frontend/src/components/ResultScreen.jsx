import React from "react";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function ResultScreen({ score, totalQuestions, onPlayAgain }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-yellow-500/20 p-4 rounded-full">
          <Trophy className="h-12 w-12 text-yellow-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Game Complete!</h2>
        <p className="text-slate-300">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={onPlayAgain}
          className="bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          Play Again
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
