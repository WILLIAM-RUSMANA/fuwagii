import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  const carouselItems = [
    {
      imgSrc: "./carousel-1.jpg",
      title: "Classic Box",
    },
    {
      imgSrc: "./carousel-2.jpg",
      title: "Premium Box",
    },
    {
      imgSrc: "./carousel-3.jpg",
      title: "Seasonal Box",
    }
  ];

  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [currentIndex]);

  const startAutoRotate = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
    startAutoRotate();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const minSwipeDistance = 50;
    if (touchEndX.current < touchStartX.current - minSwipeDistance) {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      startAutoRotate();
    }
    if (touchEndX.current > touchStartX.current + minSwipeDistance) {
      setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
      startAutoRotate();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontStyle: "normal"}}>
      <header className='flex justify-center items-center'>
        <img className="logo" src="./Fuwagi-Logo.png" alt="Fuwagi Logo" />
        <h1 className="text-5xl ">Fuwagi</h1>
      </header>
      <div className="flex-1 flex flex-col items-center">
        <div
          className="carousel mb-8"
          id="carousel"
          style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {carouselItems.map((item, idx) => (
            <div
              className={`carousel-item${idx === currentIndex ? " active" : ""}`}
              key={idx}
              style={{ display: idx === currentIndex ? "block" : "none" }}
            >
              <div
                style={{ borderRadius: "0.5rem" }}
                className="flex items-center justify-center m-auto"
              >
                <img src={item.imgSrc} alt="icon" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center mb-8">
          {carouselItems.map((_, idx) => (
            <div
              key={idx}
              className={`carousel-dot${idx === currentIndex ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
              style={{
                width: "1rem",
                height: "1rem",
                borderRadius: "50%",
                background: idx === currentIndex ? "#062261" : "#ccc",
                margin: "0 0.5rem",
                cursor: "pointer"
              }}
            ></div>
          ))}
        </div>

        {/* Discover text */}
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            color: "#062261",
            // fontFamily: "'Playfair Display', serif"
          }}
        >
          Discover your perfect mystery box
        </h2>

        {/* Enhanced Button */}
        <button
          className="enhanced-button"
          onClick={() => navigate("/quiz")}
          style={{
            backgroundColor: "#062261",
            color: "#F4E7DF",
            fontSize: "1.5rem",
            padding: "1.5rem 4rem",
            borderRadius: "9999px",
            // fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.05em",
            transition: "all 0.3s ease",
          }}
        >
          Take Quiz
        </button>
      </div>

      <footer className="bg-[#062261] text-[#F4E7DF] py-10 px-4 mt-12 w-full text-center">
        <div className="max-w-full mx-auto flex flex-col items-center">
          <div className="mb-4">
            <a
              href="https://www.instagram.com/fuwagibox/"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <svg
                className="w-8 h-8"
                fill="#F4E7DF"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-sm opacity-80 font-serif">
          © {new Date().getFullYear()} Fuwagi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
