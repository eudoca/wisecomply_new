import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showPercentage = false,
}) => {
  const height = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height[size]}`}>
        <div
          className={`bg-purple-600 rounded-full ${height[size]}`}
          style={{ width: `${validProgress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-500 mt-1">
          {validProgress}% complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 