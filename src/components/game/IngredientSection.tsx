import React, { useState } from 'react';
import { MixingBowl } from './MixingBowl';

const EggIllustration = () => (
  <div className="w-20 h-20 relative mx-auto mb-2">
    {/* Egg white */}
    <div className="absolute inset-0 bg-white rounded-full transform rotate-45 shadow-sm"></div>
    {/* Egg yolk */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#FEF7CD] rounded-full"></div>
    {/* Subtle shell highlight */}
    <div className="absolute inset-0 bg-[#FFDEE2]/10 rounded-full transform rotate-45"></div>
  </div>
);

export const IngredientSection = () => {
  const [eggInBowl, setEggInBowl] = useState(false);

  const handleAddEgg = () => {
    setEggInBowl(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center relative">
        <MixingBowl />
        {eggInBowl && (
          <div className="absolute w-8 h-8 bg-[#FEF7CD] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        )}
      </div>
      
      <div className="bg-white/50 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary">Egg</h2>
        <button 
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col items-center"
          onClick={handleAddEgg}
        >
          <EggIllustration />
          <span className="text-primary/80 font-medium">Add Egg</span>
        </button>
      </div>
    </div>
  );
};