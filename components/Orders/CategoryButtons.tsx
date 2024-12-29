// components/CategoryButtons.tsx
import React from 'react';

const CategoryButtons: React.FC = () => {
    return (
        <div className="flex justify-evenly bg-gray-800 p-3 md:p-4">
            <button className="bg-green-600 py-2 px-4 rounded text-white font-semibold hover:bg-green-700">
                Specials
            </button>
            <button className="bg-red-600 py-2 px-4 rounded text-white font-semibold hover:bg-red-700">
                Meals
            </button>
            <button className="bg-blue-600 py-2 px-4 rounded text-white font-semibold hover:bg-blue-700">
                Drinks
            </button>
        </div>
    );
};

export default CategoryButtons;
