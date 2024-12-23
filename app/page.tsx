"use client"; // Required for using React in Next.js 13+
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push('/about');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <header className="w-full bg-customNavy text-white py-4">
        <h1 className="text-3xl font-bold text-center mb-4">BandMates!</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome to BandMates!</h2>
        <p className="text-md mb-4">Find your perfect bandmates and start making music together.</p>

        <div className="flex space-x-4">
          <button className="btn bg-customNavy text-white" onClick={handleButtonClick}>About</button>
          <button className="btn bg-customNavy text-white">Get Started!</button>
        </div>
        
      </main>
      <footer className="w-full bg-customNavy text-white py-4 text-center">
        <p>&copy; 2024 BandMates. All rights reserved.</p>
      </footer>
    </div>
  );
}
