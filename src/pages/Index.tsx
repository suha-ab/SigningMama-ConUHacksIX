import React from 'react';
import { IngredientSection } from '@/components/game/IngredientSection';
import { CookingStation } from '@/components/game/CookingStation';

const Index = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <div className="flex-1 game-section border-r border-primary/10">
        <IngredientSection />
      </div>
      <div className="flex-1 game-section">
        <CookingStation />
      </div>
    </div>
  );
};

export default Index;