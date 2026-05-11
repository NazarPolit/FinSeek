import React, { useState } from "react";
import { getMarketMoodAPI } from "../../api";

const AiMarketMood = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchMood = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMarketMoodAPI();
      setMood(data);
    } catch (err) {
      console.error(err);
      setError("AI is taking a coffee break. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 mb-8 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="font-extrabold text-indigo-900 flex items-center gap-2">
              AI Market Analyst
            </h3>
            {!mood && !isLoading && !error && (
              <p className="text-indigo-700/70 text-sm">
                Ready to summarize the current market sentiment for you.
              </p>
            )}
          </div>
        </div>

        {!mood && !isLoading && (
          <button
            onClick={handleFetchMood}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>✨</span> Analyze Mood
          </button>
        )}

        {isLoading && (
          <div className="flex items-center gap-3 px-4 py-2 bg-white/50 rounded-xl border border-indigo-100">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-indigo-600 font-bold text-sm animate-pulse">Thinking...</span>
          </div>
        )}
      </div>

      {mood && !isLoading && (
        <div className="mt-5 pt-5 border-t border-indigo-200/50 animate-fadeIn">
          <p className="text-indigo-800 font-medium text-lg italic leading-relaxed">
            "{mood}"
          </p>
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-4 text-red-500 text-sm font-medium flex items-center gap-2">
          <span>⚠️</span> {error}
          <button onClick={handleFetchMood} className="underline ml-2">Try again</button>
        </div>
      )}
    </div>
  );
};

export default AiMarketMood;