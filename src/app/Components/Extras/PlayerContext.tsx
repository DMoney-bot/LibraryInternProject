"use client"
import React from 'react'
import React, { createContext, useContext, useState } from "react";

interface PlayerBook {
    title: string;
    author: string;
    imageLink: string;
    audioLink: string;
}

interface PlayerBookType {
    currentBook: PlayerBook | null;
    playBook: (book: PlayerBook) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentBook, setCurrentBook] = useState<PlayerBook | null>(null)
    const playBook = (book: PlayerBook) => {
        setCurrentBook(book)
    };

  return (
    <PlayerContext.Provider value={{ currentBook, playBook }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
    const context = useContext(PlayerContext)
    if(!useContext){
        throw new Error("usePlayer must be used within PlayerProvider")
    }
    return context;
}