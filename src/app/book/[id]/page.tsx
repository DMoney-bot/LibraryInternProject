"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Extras/sidebar";
import SearchBar from "@/app/Components/Extras/searchBar";
import { useModal } from "@/app/Components/Modal/ModalContext";
import { usePlayer } from "@/app/Components/Extras/PlayerContext";
import reactIcons, {
  FaRegClock,
  FaRegLightbulb,
  FaMicrophone,
  FaRegStar,
  FaBookOpen,
  FaRegBookmark,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";

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

export default function bookPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const { user, openLogin } = useModal();
  const { playBook } = usePlayer();

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("book detail data: ", data);
        setBook(data);
      });
  }, [id]);

  const requiresLogin = () => {
    if (book?.subscriptionRequired && !user) {
      openLogin();
      return true;
    }
    return false;
  };

  const handleReadClick = () => {
    if (requiresLogin()) return;
    router.push(`/book/${id}/player?mode=read`);
  };

  const handleListenClick = () => {
    if (requiresLogin()) return;
    router.push(`/book/${id}/player?mode=listen`);
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

  return (
    <div className="temps">
      <Sidebar />
      <SearchBar />
      <div className="forYouPage">
        <div className="container">
          <div className="bookPageWrapper">
            <div className="bookPageContent">
              <div className="bookHeader">
                <div className="bookPageTitleText">
                  <h1 className="bookPageTitle">
                    {book.title}
                    {book.subscriptionRequired && !user && (
                      <span className="premiumTag">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#032b41"
                        >
                          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
                        </svg>
                        Premium
                      </span>
                    )}
                  </h1>
                  <h2 className="bookPageAuthor">{book.author}</h2>
                  <h3 className="bookPageSubtitle">{book.subTitle}</h3>
                </div>
              </div>
              <div className="bookPageStats">
                <div className="bookDividerH"></div>
                <div className="bookStatsItems">
                  <div className="bookRating">
                    <FaRegStar size={20} />
                    <p>
                      {book.averageRating} ({book.totalRating} ratings)
                    </p>
                  </div>
                  <div className="bookTime">
                    <FaRegClock size={20} />
                    <p>04:40</p>
                  </div>
                  <div className="bookType">
                    <FaMicrophone size={20} />
                    <p>{book.type}</p>
                  </div>
                  <div className="bookIdeas">
                    <FaRegLightbulb size={20} />
                    <p>{book.keyIdeas} key ideas</p>
                  </div>
                </div>
                <div className="bookDividerH"></div>
              </div>
              <div className="bookPageButtons">
                <div className="bookPagePlayerButton">
                  <button className="bookRead" onClick={handleReadClick}>
                    <FaBookOpen size={22} />
                    Read
                  </button>
                  <button className="bookListen" onClick={handleListenClick}>
                    <FaMicrophone size={22} />
                    Listen
                  </button>
                </div>
                <div className="bookLibraryButton">
                  <button className="bookLibrary">
                    <FaRegBookmark size={22} />
                    Add to My Library
                  </button>
                </div>
              </div>
            </div>
            <div className="bookPageImgWrapper">
              <img src={book.imageLink} alt="Book Cover" />
            </div>
          </div>
          <div className="bookPageDesc">
            <h1 className="bookPageDescTitle">What's it about?</h1>
            <div className="bookPageTagsWrapper">
              <div className="bookPageTag">{book.tags[0]}</div>
              <div className="bookPageTag">{book.tags[1]}</div>
            </div>
            <p className="bookDesc">{book.bookDescription}</p>
            <h1 className="bookPageAuthorTitle">About the author</h1>
            <p className="authorDesc">{book.authorDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
