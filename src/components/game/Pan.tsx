import React from 'react';

export const Pan = () => {
  return (
    <div className="relative animate-hover cursor-pointer">
      {/* Pan body */}
      <div className="w-32 h-32 rounded-full bg-[#8E9196] border-2 border-primary/20 shadow-lg relative overflow-hidden">
        {/* Inner pan surface */}
        <div className="absolute inset-2 rounded-full bg-[#A8ADB4]">
          {/* Pan texture/highlights */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
        </div>
        {/* Pan rim */}
        <div className="absolute inset-0 rounded-full border-4 border-[#6D7278]" />
      </div>
      {/* Pan handle */}
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
        {/* Handle base */}
        <div className="w-20 h-6 bg-[#000000] rounded-r-lg transform -rotate-12">
          {/* Handle grip */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-3 bg-[#222222] rounded-full" />
        </div>
      </div>
    </div>
  );
};