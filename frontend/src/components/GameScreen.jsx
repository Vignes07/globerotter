import React, { useState, useEffect } from "react";
import { MapPin, Share2, ArrowRight, Frown, PartyPopper } from "lucide-react";
import { Button } from "./CustomButton";
import {
  fetchDestinations,
  saveUserScore,
  getUserScore,
} from "../services/api";

export default function GameScreen({
  username,
  score,
  attempts,
  onCorrectAnswer,
  onIncorrectAnswer,
}) {
  const [destinations, setDestinations] = useState([]);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [factToShow, setFactToShow] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSavingScore, setIsSavingScore] = useState(false);

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      const data = await fetchDestinations();
      setDestinations(data);
      loadNewQuestion(data);
      setLoading(false);
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    // Save score to backend whenever it changes
    const saveScore = async () => {
      if (score > 0 && !isSavingScore) {
        setIsSavingScore(true);
        await saveUserScore(username, score);
        setIsSavingScore(false);
      }
    };

    saveScore();
  }, [score, username]);

  const loadNewQuestion = (destinationsData = destinations) => {
    if (!destinationsData || destinationsData.length === 0) return;

    // Reset state
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFactToShow("");

    // Get random destination
    const randomIndex = Math.floor(Math.random() * destinationsData.length);
    const destination = destinationsData[randomIndex];
    setCurrentDestination(destination);

    // Generate options (1 correct, 3 incorrect)
    const correctAnswer = {
      city: destination.city,
      country: destination.country,
      isCorrect: true,
    };

    // Get 3 random incorrect options
    const incorrectOptions = [];
    while (incorrectOptions.length < 3) {
      const randomIdx = Math.floor(Math.random() * destinationsData.length);
      const option = destinationsData[randomIdx];

      if (
        option.city !== destination.city &&
        !incorrectOptions.some((o) => o.city === option.city)
      ) {
        incorrectOptions.push({
          city: option.city,
          country: option.country,
          isCorrect: false,
        });
      }
    }

    // Combine and shuffle options
    const allOptions = [correctAnswer, ...incorrectOptions];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    setOptions(allOptions);
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);

    if (option.isCorrect) {
      setIsCorrect(true);
      onCorrectAnswer();

      // Show a random fun fact
      const facts = currentDestination.fun_fact;
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFactToShow(randomFact);
    } else {
      setIsCorrect(false);
      onIncorrectAnswer();

      // Show a random trivia
      const trivia = currentDestination.trivia;
      const randomTrivia = trivia[Math.floor(Math.random() * trivia.length)];
      setFactToShow(randomTrivia);
    }
  };

  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  const handleShareChallenge = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}?invitedBy=${encodeURIComponent(
      username
    )}`;
    navigator.clipboard.writeText(shareUrl);

    // Show copied notification
    const copyBtn = document.getElementById("copy-btn");
    if (copyBtn) {
      copyBtn.innerText = "Copied!";
      setTimeout(() => {
        copyBtn.innerText = "Copy Link";
      }, 2000);
    }
  };

  const shareToWhatsApp = async () => {
    const shareUrl = `${window.location.origin}?invitedBy=${encodeURIComponent(
      username
    )}`;

    // Get the user's current score from the backend to ensure it's the latest
    const userScoreData = await getUserScore(username);
    const currentScore = userScoreData ? userScoreData.score : score;

    const whatsappUrl = `https://wa.me/?text=I've scored ${currentScore} points in the Globetrotter Challenge! Can you beat me? ${shareUrl}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        Loading destinations...
      </div>
    );
  if (!currentDestination) return <div>No destinations available</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Hello, {username}!</h2>
          <p className="text-slate-300 text-sm">
            Score: {score} correct out of {attempts} attempts
          </p>
        </div>
        <Button
          onClick={handleShareChallenge}
          variant="outline"
          className="bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-800/60 text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Challenge a Friend
        </Button>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0" />
            <h3 className="text-lg font-medium">Guess this destination</h3>
          </div>

          <div className="space-y-3">
            {currentDestination.clues.map((clue, index) => (
              <p
                key={index}
                className="bg-slate-700/40 p-3 rounded-lg text-slate-200"
              >
                {clue}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Where am I?</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg border transition-all ${
                  selectedAnswer === option
                    ? option.isCorrect
                      ? "bg-emerald-900/40 border-emerald-500/50 text-white"
                      : "bg-red-900/40 border-red-500/50 text-white"
                    : selectedAnswer !== null && option.isCorrect
                    ? "bg-emerald-900/40 border-emerald-500/50 text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{option.city}</span>
                  <span className="text-sm text-slate-300">
                    {option.country}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedAnswer && (
          <div
            className={`rounded-lg p-4 ${
              isCorrect
                ? "bg-emerald-900/30 border border-emerald-500/30"
                : "bg-red-900/30 border border-red-500/30"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {isCorrect ? (
                  <PartyPopper className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Frown className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div>
                <h4 className="font-medium">
                  {isCorrect ? "Correct! Well done!" : "Not quite right!"}
                </h4>
                <p className="text-sm mt-1">{factToShow}</p>
              </div>
            </div>
          </div>
        )}

        {selectedAnswer && (
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Next Destination
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Share Challenge Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-bold mb-4">Challenge Your Friends</h3>
            <p className="text-slate-300 mb-6">
              Share this link with your friends and see if they can beat your
              score of {score}!
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${
                    window.location.origin
                  }?invitedBy=${encodeURIComponent(username)}`}
                  className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"
                />
                <Button
                  id="copy-btn"
                  onClick={copyShareLink}
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Copy Link
                </Button>
              </div>

              <Button
                onClick={shareToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-500 text-white"
              >
                Share to WhatsApp
              </Button>

              <Button
                onClick={closeShareModal}
                variant="outline"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
