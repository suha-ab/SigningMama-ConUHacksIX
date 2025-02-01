import React from 'react';
import { Pan } from './Pan';

export const Stove = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-secondary/90 rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-center p-4">
          {/* Single centered burner */}
          <div className="stove-burner relative">
            {/* Burner ring design */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-700 -z-10" />
            <div className="absolute inset-2 rounded-full border-2 border-gray-600 -z-10" />
            <Pan />
          </div>
        </div>
      </div>
    </div>
  );
};