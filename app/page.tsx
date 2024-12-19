"use client"; // Required for using React in Next.js 13+

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">BandMates!</h1>
      <button className="btn btn-accent">Click Me!</button>
    </div>
  );
}
