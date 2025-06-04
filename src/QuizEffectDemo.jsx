import React, { useState } from "react";
import "./quiz-effect.css";

const demoQuestions = [
  { text: "Demo question 1?", answers: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"] },
  { text: "Demo question 2?", answers: ["A) Cat", "B) Dog", "C) Bird", "D) Fish"] }
];

const carouselImages = [
  "carousel-1.jpg", "carousel-2.jpg", "carousel-3.jpg"
];

export default function QuizEffectsDemo() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const progress = ((current + (showResult ? 1 : 0)) / demoQuestions.length) * 100;
  const carouselImg = carouselImages[current % carouselImages.length];

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      setAnswers(prev => [...prev, idx]);
      setSelected(null);
      if (current < demoQuestions.length - 1) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 100);
  }

function handleRetake() {
    setCurrent(0); setSelected(null); setAnswers([]); setShowResult(false);
  }

  return (
    <div className="quiz-root">
      <div className="quiz-fuwagi-header">
        <span className="quiz-fuwagi-name">Fuwagi</span>
      </div>
      <img className="quiz-carousel-image" src={carouselImg} alt="" />
      <div className="quiz-center-wrap">
        <div className="quiz-card">
          <div className="quiz-progress-bar-wrap">
            <div className="quiz-progress-bar-bg">
              <div className="quiz-progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="quiz-progress-counter">
              {showResult ? demoQuestions.length : current + 1} / {demoQuestions.length}
            </div>
          </div>

          {!showResult ? (
            <>
              <div style={{
                fontSize: "1.25rem", fontWeight: 600, marginBottom: 36, color: "#0c255a"
              }}>
                {current + 1}. {demoQuestions[current].text}
              </div>
              <div className="quiz-options-row">
                {demoQuestions[current].answers.map((label, idx) => (
                  <button
                    key={label}
                    className={`quiz-option-button${selected === idx ? " selected" : ""}`}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <div className="quiz-option-feedback">Answer selected!</div>
              )}
            </>
          ) : (
            <>
              <div className="quiz-results-title">Your Results</div>
              <div className="quiz-results-list-wrap">
                <ul className="quiz-results-list">
                  <li className="quiz-results-item top">
                    1. Sleep Deprivation: <span className="quiz-results-score">3 points</span>
                  </li>
                  <li className="quiz-results-item second">
                    2. Depression & Anxiety: <span className="quiz-results-score">2 points</span>
                  </li>
                  <li className="quiz-results-item third">
                    3. Healthy Mind: <span className="quiz-results-score">1 point</span>
                  </li>
                </ul>
              </div>
              <button className="quiz-retake-btn" onClick={handleRetake}>Retake Quiz</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}