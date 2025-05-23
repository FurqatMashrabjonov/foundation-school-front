import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center mb-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
        <img src="https://i.postimg.cc/p596Xrns/main-logo.png" class="rounded-md border" size={48} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 text-center">Foundation School</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md text-lg">
        Ro'yxatdan o'ting va BEPUL sinov darsida qatnashing
      </p>
    </div>
  );
};

export default Header;