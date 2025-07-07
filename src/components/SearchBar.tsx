import { Search, X } from 'lucide-react';
import React from 'react'

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
const SearchBar:React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
  <div className="relative flex items-center justify-center  self-start ">
    <Search className=" absolute left-2.5 h-5 w-5 text-gray-300" />

    <input
      type="text"
      placeholder="Search ..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-12 pr-12 h-14 w-full bg-white/5 border border-white/20 text-white placeholder-gray-300 rounded-2xl text-lg focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-400"
    />

    {searchTerm && (
      <span
        onClick={() => onSearchChange('')}
        className="absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2 h-8 w-8 p-0  text-gray-300 hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition"
      >
        <X className="h-4 w-4 " />
      </span>
    )}
  </div>
  )
}

export default SearchBar