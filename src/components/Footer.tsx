'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  // Handle auth navigation
  const goToAuth = (mode: 'login' | 'signup') => {
    router.push(`/auth?mode=${mode}`);
  };

  // Handle categories navigation
  const goToCategories = () => {
    router.push('/product-listing');
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          {/* Left Side: Logo, description, social icons */}
          <div className="footer-col brand">
            <div className="logo">
              <div className="logo-icon">
                <img src="/images/brand-icon.png" alt="Brand" />
              </div>
              <span className="logo-text">Brand</span>
            </div>
            <p className="description">
              Best information about the company gies here but now lorem ipsum
            </p>
            <div className="social-icons">
              {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((icon) => (
                <a key={icon} href="#" onClick={(e) => e.preventDefault()}>
                  <img src={`/images/icons/${icon}.png`} alt={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Middle & Right Columns */}
          <div className="footer-columns">
            <div className="footer-col">
              <h4>About</h4>
              <a href="#">About Us</a>
              <a href="#">Find store</a>
              <a onClick={goToCategories}>Categories</a>
              <a href="#">Blogs</a>
            </div>

            <div className="footer-col">
              <h4>Partnership</h4>
              <a href="#">About Us</a>
              <a href="#">Find store</a>
              <a onClick={goToCategories}>Categories</a>
              <a href="#">Blogs</a>
            </div>

            <div className="footer-col">
              <h4>Information</h4>
              <a href="#">Help Center</a>
              <a href="#">Money Refund</a>
              <a href="#">Shipping</a>
              <a href="#">Contact us</a>
            </div>

            <div className="footer-col">
              <h4>For users</h4>
              <a onClick={() => goToAuth('login')}>Login</a>
              <a onClick={() => goToAuth('signup')}>Register</a>
              <a href="#">Settings</a>
              <a href="#">My Orders</a>
            </div>

            <div className="footer-col">
              <h4>Get app</h4>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/icons/appstore.png"
                  alt="App Store"
                  className="store-icon"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/icons/playstore.png"
                  alt="Play Store"
                  className="store-icon"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>© 2023 Ecommerce.</p>
          <div className="language">
            <img src="/images/us.png" alt="US" className="flag" />
            <span>English</span>
            <span className="arrow">⌄</span>
          </div>
        </div>
      </footer>

      {/* Scoped styles */}
      <style jsx>{`
        .footer {
          background: #fff;
          font-family: 'Inter', sans-serif;
          width: 100%;
        }

        .footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          padding: 40px 80px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 120px;
        }

        .footer-col h4 {
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
          margin-bottom: 4px;
        }

        .footer-col a {
          color: #8b96a5;
          font-size: 16px;
          text-decoration: none;
          cursor: pointer;
        }

        .footer-col a:hover {
          color: #0d6efd;
        }

        .brand {
          max-width: 240px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          background: #8cb7f5;
          padding: 8px;
          border-radius: 8px;
          opacity: 0.8;
        }

        .logo-icon img {
          width: 24px;
          height: 24px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #0d6efd;
        }

        .description {
          color: #505050;
          font-size: 16px;
          margin: 16px 0;
          line-height: 1.5;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icons img {
          width: 32px;
          height: 32px;
        }

        .footer-columns {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }

        .store-icon {
          width: 120px;
          margin-top: 8px;
        }

        .footer-bottom {
          background: #eff2f4;
          border-top: 1px solid #dee2e7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 80px;
          font-size: 16px;
          color: #606060;
        }

        .language {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
        }

        .arrow {
          font-size: 10px;
          color: #1c1c1c;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            padding: 40px 24px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 8px;
            padding: 16px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
