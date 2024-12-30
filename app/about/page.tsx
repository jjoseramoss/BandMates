"use client"; 

export default function About(){
    return (
        <div data-theme="forest" className="flex flex-col items-center justify-center min-h-screen bg-base-100">
          <header className="w-full bg-secondary text-white py-4">
            <h1 className="text-3xl font-bold text-center mb-4">About BandMates</h1>
          </header>
          <main className="flex flex-col items-center justify-center flex-1 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
            <p className="text-md mb-4">BandMates is a platform to find your perfect bandmates and start making music together.</p>
          </main>
          <footer className="w-full bg-secondary text-white py-4 text-center">
            <p>&copy; 2024 BandMates. All rights reserved.</p>
          </footer>
        </div>
      );
}