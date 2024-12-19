import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Ensure this includes your app directory
    './pages/**/*.{js,ts,jsx,tsx}', // If you have a pages folder (for Next.js 12 and below)
    './components/**/*.{js,ts,jsx,tsx}', // If you have a components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Add DaisyUI as a plugin
};

export default config;
