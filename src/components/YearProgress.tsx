import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export default function YearProgress() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [yearProgress, setYearProgress] = useState(0);

  // Calculate year progress
  useEffect(() => {
    const calculateYearProgress = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

      const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime();
      const elapsedMilliseconds = now.getTime() - startOfYear.getTime();

      const progress = (elapsedMilliseconds / totalMilliseconds) * 100;
      return parseFloat(progress.toFixed(2));
    };

    setYearProgress(calculateYearProgress());

    // Update progress every hour
    const intervalId = setInterval(() => {
      setYearProgress(calculateYearProgress());
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  // Load Farcaster SDK
  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Year Progress</h1>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{yearProgress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${yearProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Year {new Date().getFullYear()}</p>
        <p className="mt-1">Make every day count!</p>
      </div>
    </div>
  );
}
