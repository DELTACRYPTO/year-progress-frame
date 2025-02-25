import { ImageResponse } from "next/og";

export const alt = "Year Progress";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  // Calculate year progress
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

  const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime();
  const elapsedMilliseconds = now.getTime() - startOfYear.getTime();

  const progress = (elapsedMilliseconds / totalMilliseconds) * 100;
  const yearProgress = parseFloat(progress.toFixed(2));

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white p-8">
        <h1 tw="text-5xl font-bold mb-8">Year Progress</h1>

        <div tw="w-full max-w-md mb-6 flex flex-col">
          <div tw="flex flex-row justify-between mb-2">
            <span tw="text-lg font-medium">Progress</span>
            <span tw="text-lg font-medium">{yearProgress}%</span>
          </div>

          <div tw="w-full bg-gray-200 rounded-full h-6 flex">
            <div
              tw="bg-blue-600 h-6 rounded-full"
              style={{ width: `${yearProgress}%` }}
            />
          </div>
        </div>

        <div tw="text-center text-gray-500 mt-6 flex flex-col">
          <p tw="text-lg">Year {now.getFullYear()}</p>
          <p tw="mt-1 text-lg">Make every day count!</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
