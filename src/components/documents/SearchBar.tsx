import React from 'react';
import { SearchIcon } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="search" // Use type="search" for semantics and potential browser features
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Search documents..."
        />
      </div>
      {/* Optional: Add filter/sort buttons here */}
      {/* <button className="...">Filters</button> */}
    </div>
  );
};

export default SearchBar; 