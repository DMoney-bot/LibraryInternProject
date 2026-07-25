"use client";
import { useState, useContext } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/Components/Modal/ModalContext";
import Link from "next/link";
import { login, loginAsGuest, loginWithGoogle } from "@/app/firebase/auth";

export default function LoginModal() {
  const { isLoginOpen, closeLogin } = useModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      closeLogin();
      router.push("/for-you");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginAsGuest();
      closeLogin();
      router.push("/for-you");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      closeLogin();
      router.push("/for-you");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeLogin}>
      <div className="login__wrapper">
        <div className="login__title">Login to Summarist</div>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="btn guest__btn"
          disabled={loading}
        >
          Login as a Guest
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn googleBtn"
          disabled={loading}
        >
          Login with Google
        </button>
        <div className="login__separator">
          <span className="login__separator--text">or</span>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
          {error && <p className="login__error">{error}</p>}
          <button
            type="submit"
            className="btn login__submit--btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

function getFriendlyError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Email address is invalid.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
}
