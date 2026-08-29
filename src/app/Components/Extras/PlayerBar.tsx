"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa6";
import { usePlayer } from "./PlayerContext";

export default function PlayerBar() {
  const { currentBook } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentBook) return;

    audio.play();
    setIsPlaying(true);
  }, [currentBook]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentBook]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration,
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentBook) return null; // hide the bar entirely until something's playing

  return (
    <div className="playerBar">
      <audio ref={audioRef} src={currentBook.audioLink} preload="metadata" />

      <div className="playerBarLeft">
        <img
          src={currentBook.imageLink}
          alt={currentBook.title}
          className="playerBarImg"
          referrerPolicy="no-referrer"
        />
        <div className="playerBarText">
          <p className="playerBarTitle">{currentBook.title}</p>
          <p className="playerBarAuthor">{currentBook.author}</p>
        </div>
      </div>

      <div className="playerBarCenter">
        <div className="playerBarButtons">
          <button className="playerSkipButton" onClick={() => skip(-10)}>
            <FaBackward size={16} />
          </button>
          <button className="playerPlayButton" onClick={togglePlay}>
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
          <button className="playerSkipButton" onClick={() => skip(10)}>
            <FaForward size={16} />
          </button>
        </div>
        <div className="playerSeekRow">
          <span className="playerTime">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="playerSeekBar"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>
      </div>

      <div className="playerBarRight">
        <span className="playerDuration">{formatTime(duration)}</span>
      </div>
    </div>
  );
}