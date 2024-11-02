'use client';

import { FaSearch, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSearch(e: any) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    params.delete('category');
    replace(`/product?${params.toString()}`);
  }


  return (
    <div>
      <Button onClick={() => setIsSearchOpen(!isSearchOpen)}>
        <FaSearch size={24} />
      </Button>

      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-lg z-50 p-4 animate-in slide-in-from-top">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Close search"
            >
              <FaTimes size={20} />
            </button>
          </form>
          {searchQuery && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-500">
                Press Enter to search for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}