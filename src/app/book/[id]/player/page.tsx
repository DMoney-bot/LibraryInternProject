"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/app/Components/Extras/sidebar";
import SearchBar from "@/app/Components/Extras/searchBar";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa6";
import { useFontSize } from "@/app/Components/Modal/ModalContext";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  summary: string;
  bookDescription: string;
}

export default function PlayerPage() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { fontSize } = useFontSize();

  const [book, setBook] = useState<Book | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

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
  }, [book]);

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

  if (!book) {
    return (
      <div className="temps">
        <Sidebar />
        <SearchBar />
        <div className="forYouPage">
          <div className="container">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("PlayerPage font size: ", fontSize)

  return (
    <div className="temps">
      <Sidebar />
      <SearchBar />
      <div className="forYouPage">
        <div className="container playerPageContainer">
          <div className="playerPageText">
            <h1 className="playerBookPageTitle">{book.title}</h1>
            <div className="bookDividerH" />
            <div className={`playerPageBody playerPageBody--${fontSize}`}>
              {(book.summary || book.bookDescription)
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="playerPageParagraph">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="playerBar">
        <audio ref={audioRef} src={book.audioLink} preload="metadata" />

        <div className="playerBarLeft">
          <img
            src={book.imageLink}
            alt={book.title}
            className="playerBarImg"
            referrerPolicy="no-referrer"
          />
          <div className="playerBarText">
            <p className="playerBarTitle">{book.title}</p>
            <p className="playerBarAuthor">{book.author}</p>
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
    </div>
  );
}
