import React from 'react';
import { Stove } from './Stove';

export const CookingStation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Countertop */}
      <div className="absolute inset-0 bg-[#D3D3D3] border-4 border-[#A9A9A9] z-0"></div>
      {/* Counter buttons */}
      <div className="absolute top-0 left-0 w-full flex justify-between p-4">
        <button className="bg-[#A9A9A9] w-12 h-12 rounded-full shadow-md"></button>
        <button className="bg-[#A9A9A9] w-12 h-12 rounded-full shadow-md"></button>
        <button className="bg-[#A9A9A9] w-12 h-12 rounded-full shadow-md"></button>
      </div>
      <Stove />
    </div>
  );
};