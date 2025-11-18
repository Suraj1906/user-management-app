import React, { useState } from 'react';

export default function SearchFilterSort({ search, setSearch, sortBy, setSortBy, filter, setFilter, users }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hoverGroup, setHoverGroup] = useState('');

  // Use fallback for JSONPlaceholder fields
  const companies = Array.from(new Set(users.map(u => u.company?.name || "Unknown Company")));
  const cities = Array.from(new Set(users.map(u => u.address?.city || "Unknown City")));

  const handleSelect = (value) => {
    setFilter(value);
    setOpenDropdown(false);
    setHoverGroup('');
  };

  // Determine placeholder text
  let filterText = 'All';
  if (filter.startsWith('company:')) filterText = 'Company';
  else if (filter.startsWith('city:')) filterText = 'City';

  return (
    <div className="flex gap-2 flex-col md:flex-row md:items-center">
      {/* Search Input */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="flex-1 p-2 rounded border input-focus dark:bg-gray-800 dark:text-white"
      />

      {/* Custom Filter Dropdown */}
      <div className="relative w-48">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-full text-left p-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          {filterText}
        </button>

        {openDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-gray-100 dark:bg-gray-800 border rounded shadow-lg">
            {/* All option */}
            <div
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => handleSelect('')}
            >
              All
            </div>

            {/* Company group */}
            <div
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 relative"
              onMouseEnter={() => setHoverGroup('company')}
              onMouseLeave={() => setHoverGroup('')}
            >
              Company
              {hoverGroup === 'company' && (
                <div className="absolute top-0 left-full ml-1 w-48 bg-gray-100 dark:bg-gray-800 border rounded shadow-lg">
                  {companies.map(c => (
                    <div
                      key={c}
                      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleSelect(`company:${c.toLowerCase()}`)}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City group */}
            <div
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 relative"
              onMouseEnter={() => setHoverGroup('city')}
              onMouseLeave={() => setHoverGroup('')}
            >
              City
              {hoverGroup === 'city' && (
                <div className="absolute top-0 left-full ml-1 w-48 bg-gray-100 dark:bg-gray-800 border rounded shadow-lg">
                  {cities.map(c => (
                    <div
                      key={c}
                      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleSelect(`city:${c.toLowerCase()}`)}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sort dropdown */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      >
        <option value="">Sort</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>
    </div>
  );
}
