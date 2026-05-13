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
      setError("Analysis service unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:px-6 sm:py-5 shadow-md shadow-slate-200/50 border border-slate-100 mb-8 transition-all hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl sm:text-4xl">
            ✨
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">
              AI Market Insight
            </h3>
            {!mood && !isLoading && !error && (
              <p className="text-slate-500 mt-0.5 text-sm font-medium">
                Generate a real-time summary of current market sentiment.
              </p>
            )}
          </div>
        </div>

        {!mood && !isLoading && (
          <button
            onClick={handleFetchMood}
            className="px-5 py-2.5 bg-[#5b52f6] hover:bg-[#4a41d4] text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-[#5b52f6]/30 shrink-0 active:scale-95 flex items-center gap-2"
          >
            <span className="text-base">✨</span> Ask the AI Analyst
          </button>
        )}

        {isLoading && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
            <div className="w-4 h-4 border-2 border-[#5b52f6] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600 font-semibold text-sm">Thinking...</span>
          </div>
        )}
      </div>

      {mood && !isLoading && (
        <div className="mt-5 pt-5 border-t border-slate-100 animate-fadeIn">
          <div className="flex gap-4">
            <div className="w-1.5 bg-[#5b52f6] rounded-full"></div>
            <p className="text-slate-700 font-medium text-base leading-relaxed">
              {mood}
            </p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
          <button onClick={handleFetchMood} className="text-rose-700 hover:text-rose-900 underline decoration-rose-300">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default AiMarketMood;