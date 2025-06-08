
import React from 'react';

interface SpinnerProps {
  small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small }) => {
  const sizeClasses = small ? 'h-5 w-5' : 'h-12 w-12 md:h-16 md:w-16';
  const borderSizeClasses = small ? 'border-2' : 'border-4';

  return (
    <div className={`flex justify-center items-center ${small ? '' : 'my-8'}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses} ${borderSizeClasses} border-t-transparent border-b-transparent border-blue-500`}
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
