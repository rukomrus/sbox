
import React from 'react';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-start pt-8 md:pt-16 p-4 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Imagen AI Image Generator
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Bring your ideas to life with the power of AI.
          </p>
        </header>
        <ImageGenerator />
         <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; ${new Date().getFullYear()} AI Image Forge. Powered by Google Gemini API.</p>
            <p>Please ensure your API_KEY environment variable is configured.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
