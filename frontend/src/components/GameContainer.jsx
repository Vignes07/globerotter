import React from "react";

export default function GameContainer({ children }) {
  return (
    <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10">
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
