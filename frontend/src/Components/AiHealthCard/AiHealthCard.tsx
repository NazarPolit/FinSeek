import React, { useState } from 'react';
import axios from 'axios';

interface AiHealthResponse {
    status: 'Undervalued' | 'Overvalued' | 'Fair';
    explanation: string;
}

interface AiHealthCardProps {
    symbol: string;
}

const AiHealthCard: React.FC<AiHealthCardProps> = ({ symbol }) => {
    const [data, setData] = useState<AiHealthResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<AiHealthResponse>(
                `https://localhost:7002/api/stock/${symbol}/health`
            );

            setData(response.data);
        } catch (err: any) {
            const errorMessage =
                err.response?.data ||
                err.message ||
                'Failed to analyze the company. Please try again later.';

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Undervalued':
                return 'bg-green-100 text-green-800 border-green-300';

            case 'Overvalued':
                return 'bg-red-100 text-red-800 border-red-300';

            case 'Fair':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';

            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    if (!data && !isLoading && !error) {
        return (
            <div className="mt-4">
                <button
                    onClick={handleFetchAnalysis}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    <span>✨</span> Ask the AI Analyst
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

                <p className="text-gray-600 animate-pulse">
                    AI is analyzing the company's fundamentals...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4 p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                <p>❌ {error}</p>

                <button
                    onClick={handleFetchAnalysis}
                    className="mt-2 text-sm underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="mt-4 p-5 border border-indigo-100 bg-indigo-50/50 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span>🤖</span> AI Fundamental Analysis
                </h3>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        data!.status
                    )}`}
                >
                    {data!.status.toUpperCase()}
                </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
                {data!.explanation}
            </p>
        </div>
    );
};

export default AiHealthCard;