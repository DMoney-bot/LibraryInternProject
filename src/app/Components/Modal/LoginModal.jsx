"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/Components/Modal/ModalContext";
import { login, loginAsGuest, loginWithGoogle } from "@/app/firebase/auth";
import { FaUser } from "react-icons/fa6";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

export const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export default function LoginModal() {
  const { isLoginOpen, closeLogin } = useModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
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
        <div className="login__title">{isSignup ? "Create an Account" : "Login to Summarist"}</div>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="btn guest__btn"
          disabled={loading}
        >
          <FaUser className="guest__icon" size={30} color="white" />
          Login as a Guest
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn googleBtn"
          disabled={loading}
        >
          <img src="/google.png" alt="Google Icon" className="google-icon" />
          Login with Google
        </button>
        <div className="login__separator">
          <div className="separator__line"></div>
          <span className="login__separator--text">or</span>
          <div className="separator__line"></div>
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
        <button
          type="button"
          className="btn createAccountBtn"
          onClick={() => {
            setError("");
            setIsSignup((prev) => !prev);
          }}
        >
          {isSignup ? "Back to Login" : "Create an Account"}
        </button>
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
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}
