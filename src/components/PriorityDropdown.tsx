import React, { useState, useEffect, useRef } from 'react';
import { Flag, ChevronDown } from 'lucide-react';
import { PriorityFilter } from '../types/Task';

interface PriorityDropdownProps {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
}

const priorities: { key: PriorityFilter; label: string; color: string }[] = [
  { key: 'all', label: 'All Priorities', color: 'text-gray-300' },
  { key: 'high', label: 'High Priority', color: 'text-red-500' },
  { key: 'medium', label: 'Medium Priority', color: 'text-yellow-400' },
  { key: 'low', label: 'Low Priority', color: 'text-green-400' },
];

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = priorities.find(p => p.key === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className=" bg-slate-900/70 border w-48 border-white/20 text-white cursor-pointer rounded-lg p-3 !text-sm flex items-center justify-between backdrop-blur-sm focus:outline-0 focus:border-0 focus:ring-1 focus:ring-gray-700 transition-colors duration-200 "
      >
        <div className="flex items-center gap-2">
          {selected && <Flag className={`h-4 w-4 ${selected.color}`} />}
          <span>{selected?.label}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-300" />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-white/20 rounded-lg shadow-lg">
          {priorities.map((p) => (
            <div
              key={p.key}
              onClick={() => {
                onChange(p.key);
                setOpen(false);
              }}
              className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-white/10 ${
                value === p.key ? 'bg-white/10' : ''
              }`}
            >
              <Flag className={`h-4 w-4 ${p.color}`} />
              <span className="text-white">{p.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
