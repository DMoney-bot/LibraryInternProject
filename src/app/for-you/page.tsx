"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Extras/sidebar";
import SearchBar from "../Components/Extras/searchBar";
import Link from "next/link";
import { array } from "firebase/firestore/pipelines";
import { useModal } from "../Components/Modal/ModalContext";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: string;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function ForYou() {
  const [book, setBook] = useState<Book | null>(null);
  const { user } = useModal();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("suggested data: ", data);
        setSuggestedBooks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("recommended api data: ", data);
        setRecommendedBooks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("API data: ", data);
        setBook(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="temps">
      <Sidebar />
      <SearchBar />
      <div className="forYouPage">
        <div className="selected">
          <h1 className="forYouTitle">Selected just for you</h1>
          <div className="bookBox">
            {book ? (
              <Link href={`/book/${book.id}`} className="bookBoxLink">
                <div className="bookBoxContent">
                  <p className="bookSubtitle">{book.subTitle}</p>

                  <div className="bookDivider" />

                  <div className="bookImageWrapper">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bookInfo">
                    <h2 className="bookTitle">{book.title}</h2>
                    <p className="bookAuthor">{book.author}</p>
                    <div className="bookPlayRow">
                      <div className="bookPlayButton"></div>
                      <p className="bookPlayTime">3 mins 23 secs</p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <p className="bookBoxLoading">Loading</p>
            )}
          </div>
        </div>
        <div className="recommended">
          <div className="recommendedTitle">
            <h1 className="forYouTitle">Recommended For You</h1>
            <p className="recommendedSubtitle">We think you'll like these</p>
          </div>
          <div className="recommendedBooksWrapper">
            <div className="recommendedBooks">
              {recommendedBooks.length > 0 ? (
                recommendedBooks.slice(0, 5).map((recBook) => (
                  <Link
                    key={recBook.id}
                    href={`/book/${recBook.id}`}
                    className="recommendedBookLink"
                  >
                    <div className="recommendedBookImgWrapper">
                      <img
                        src={recBook.imageLink}
                        alt={recBook.title}
                        referrerPolicy="no-referrer"
                      />
                      {recBook.subscriptionRequired && !user && (
                        <div className="premiumIcon">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="#fff"
                          >
                            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="recommendedBookTitle">{recBook.title}</h3>
                    <p className="recommendedBookAuthor">{recBook.author}</p>
                    <p className="recommnededBookSubtitle">
                      {recBook.subTitle}
                    </p>
                    <div className="timeRate">
                      <p className="recommendedTime">03:30</p>
                      <p className="recommendedRating">
                        ☆{recBook.averageRating}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="bookBoxLoading">"Loading</p>
              )}
            </div>
          </div>
        </div>
        <div className="suggested">
          <div className="suggestedTitle">
            <h1 className="forYouTitle">Suggested Books</h1>
            <p className="suggestedSubtitle">Browse those books</p>
          </div>
          <div className="suggestedBooksWrapper">
            <div className="suggestedBooks">
              {suggestedBooks.slice(0, 5).map((suggBook) => (
                <Link
                  key={suggBook.id}
                  href={`/book/${suggBook.id}`}
                  className="suggestedBookLink"
                >
                  <div className="suggestedBookImgWrapper">
                    <img
                      src={suggBook.imageLink}
                      alt={suggBook.title}
                      referrerPolicy="no-referrer"
                    />
                    {suggBook.subscriptionRequired && !user && (
                      <div className="premiumIcon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="suggestedBookTitle">{suggBook.title}</h3>
                  <p className="suggestedBookAuthor">{suggBook.author}</p>
                  <p className="suggestedBookSubtitle">{suggBook.subTitle}</p>
                  <div className="timeRate">
                    <p className="recommendedTime">04:22</p>
                    <p className="recommendedRating">
                      ☆{suggBook.averageRating}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
