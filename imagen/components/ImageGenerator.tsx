
import React, { useState, useCallback, useEffect } from 'react';
import { generateImageWithImagen } from '../services/geminiService';
import Spinner from './Spinner';
import Alert from './Alert';

// Define an interface for the Icon for better type safety
interface IconProps {
  className?: string;
}

const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
);


const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); 
    setIsImageVisible(false); // Hide image before new generation

    try {
      const imageBytes = await generateImageWithImagen(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${imageBytes}`);
      // useEffect will handle setting isImageVisible to true
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setGeneratedImage(null);
      setIsImageVisible(false); // Ensure image is not visible on error
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  useEffect(() => {
    if (generatedImage) {
      // Use a timeout to ensure the image element is rendered with the new src
      // before changing opacity, allowing the transition to be seen.
      const timer = setTimeout(() => {
        setIsImageVisible(true);
      }, 50); // Small delay for rendering and transition to kick in
      return () => clearTimeout(timer);
    } else {
      setIsImageVisible(false);
    }
  }, [generatedImage]);


  return (
    <div className="w-full p-6 bg-gray-800 shadow-2xl rounded-xl border border-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateImage();
        }}
        className="mb-6"
      >
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
          Enter your image prompt
        </label>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at sunset"
            className="flex-grow p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner small />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </button>
        </div>
      </form>

      {error && <Alert message={error} />}

      <div className="mt-6 aspect-[1/1] w-full max-w-lg mx-auto bg-gray-700/50 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden shadow-inner">
        {isLoading && !generatedImage && <Spinner />}
        {!isLoading && !generatedImage && !error && (
          <div className="text-center text-gray-500 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">Your masterpiece awaits!</p>
            <p className="text-sm">Enter a prompt above and click "Generate Image" to see the magic happen.</p>
          </div>
        )}
        {generatedImage && !error && (
          <img
            src={generatedImage}
            alt={prompt || 'Generated AI image'}
            className={`w-full h-full object-contain transition-opacity duration-500 ease-in-out ${isImageVisible ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
         {error && !generatedImage && (
           <div className="text-center text-red-400 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-lg font-medium">Oops! Something went wrong.</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
