import React from 'react';

export const MixingBowl = () => {
  return (
    <div className="relative">
        {/* Bowl base */}
        <div className="w-32 h-32 bg-[#8E9196] rounded-full relative overflow-hidden">
          {/* Inner bowl surface */}
          <div className="absolute inset-1 rounded-full bg-[#A8ADB4]">
            {/* Bowl texture/highlights */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </div>
          {/* Bowl rim */}
          <div className="absolute inset-0 rounded-full border-4 border-[#6D7278]" />
        </div>
      </div>
  );
};