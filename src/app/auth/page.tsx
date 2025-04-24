"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";  // Importing the Image component from next/image

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        credentials:"include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        setSignupData({ name: "", email: "", password: "", address: "", phone: "" });
        setMode("login");
      }
    } catch {
      setError("Signup error");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials:"include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        if (data.user && data.user.role === "admin") {
          router.push("/product-management");
        } else {
          router.push("/profile");
        }
      }
    } catch {
      setError("Login error");
    }
  };

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}

      <div className={`message ${mode}`}>
        {/* Brand logo and text side by side */}
        <div className="brand">
          {/* Using Image component instead of img */}
          <Image 
            src="/images/brand-icon.png" 
            alt="Brand Icon" 
            className="brand-icon" 
            width={40}  // Specify width and height for optimization
            height={40}
          />
          <span className="brand-text">Brand</span>
        </div>

        <div className="btn-wrapper">
          <button className="button" onClick={() => setMode("signup")}>
            Sign Up
          </button>
          <button className="button" onClick={() => setMode("login")}>
            Login
          </button>
        </div>
      </div>

      <div className="form form--signup">
        <div className="form--heading">Welcome! Sign Up</div>
        <form autoComplete="off" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address (optional)"
            value={signupData.address}
            onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone (optional)"
            value={signupData.phone}
            onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <div className="form form--login">
        <div className="form--heading">Welcome back!</div>
        <form autoComplete="off" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          height: 100vh;
          background: #f3f4f6;
          font-family: "Source Sans Pro", sans-serif;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          width: 700px;
          height: 400px;
          background: #fff;
          position: relative;
          display: grid;
          grid-template: 100% / 50% 50%;
          box-shadow: 2px 2px 10px 0 rgba(51, 51, 51, 0.2);
        }
        .error {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          color: red;
          font-size: 14px;
          z-index: 10;
        }
        .container::after {
          content: "";
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80%;
          background: #999;
        }
        .message {
          position: absolute;
          background: #fff;
          width: 50%;
          height: 100%;
          transition: transform 0.5s ease;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .message.login {
          transform: translateX(0);
        }
        .message.signup {
          transform: translateX(100%);
        }
        .message:before {
          position: absolute;
          content: "";
          width: 1px;
          height: 70%;
          background: #ccc;
          opacity: 0;
          left: 0;
          top: 15%;
          transition: opacity 0.5s;
        }
        .message.signup:before {
          opacity: 0.3;
          left: 0;
        }
        .message.login:before {
          opacity: 0.3;
          left: 100%;
        }

        /* Brand section side by side */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .brand-icon {
          width: 40px;
          height: 40px;
        }
        .brand-text {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c7cf1;
        }

        .btn-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }
        .form {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .form--heading {
          font-size: 25px;
          height: 50px;
          color: #2c7cf1;
        }
        form {
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form > * {
          margin: 10px;
        }
        input {
          width: 90%;
          border: 0;
          border-bottom: 1px solid #aaa;
          font-size: 13px;
          font-weight: 300;
          color: #797a9e;
          letter-spacing: 0.11em;
        }
        input::placeholder {
          color: #333;
          font-size: 10px;
        }
        input:focus {
          outline: 0;
          border-bottom: 1px solid rgba(44, 124, 241, 0.7);
          transition: border-bottom 0.6s ease;
        }
        .button {
          width: 50%;
          height: 30px;
          border: 0;
          outline: 0;
          color: white;
          font-size: 15px;
          font-weight: 400;
          position: relative;
          z-index: 3;
          background: #2c7cf1;
          font-family: "Source Sans Pro", sans-serif;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
