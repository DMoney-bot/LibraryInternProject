"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Book {
  id: string;
  author: string;
  title: string;
  imageLink: string;
  subTitle: string;
}

export default function searchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(Array.isArray(data) ? data : []);
          setIsOpen(true);
        })
        .catch((err) => {
          console.log("search error: ", err);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBook = (id: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/book/${id}`);
  };

  return (
    <div className="borderBox">
      <div className="searchbar" ref={wrapperRef}>
        <input
          className="sBar"
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
        />
        <button className="magnify">
          <FaMagnifyingGlass />
        </button>
        {isOpen && (
          <div className="searchDropdown">
            {loading ? (
              <p className="searchDropdownMsg">Searching...</p>
            ) : results.length > 0 ? (
              results.map((book) => (
                <div
                  key={book.id}
                  className="searchResultItem"
                  onClick={() => handleSelectBook(book.id)}
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="searchResultsImg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="searchResultText">
                    <p className="searchResultTitle">{book.title}</p>
                    <p className="searchResultAuthor">{book.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="searchDropdownMsg">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
