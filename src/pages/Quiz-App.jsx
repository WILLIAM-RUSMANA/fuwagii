import React, { useState } from "react";

const questions = [
  "I’ve felt a persistent sense of sadness or emptiness.",
  "I’ve experienced constant worry or unease that’s hard to shake.",
  "I’ve lost interest in activities I usually find enjoyable.",
  "My concentration has been impaired by racing or negative thoughts.",
  "I’ve struggled to fall asleep within 30 minutes of going to bed.",
  "I’ve woken up at night and found it difficult to return to sleep.",
  "I’ve felt extremely tired or drained despite sleeping through the night.",
  "I’ve nodded off unintentionally or felt drowsy during the day.",
  "I’ve felt hopeful and optimistic about my personal goals.",
  "I’ve managed everyday stressors with relative ease.",
  "I’ve engaged in activities (e.g., hobbies, exercise) that energize me.",
  "I’ve felt supported and connected by friends or family."
];

const options = [
  { label: "A) Not at all", value: 0 },
  { label: "B) Several days", value: 1 },
  { label: "C) More than half the days", value: 2 },
  { label: "D) Nearly every day", value: 3 }
];

function ProgressBar({ current, total }) {
  const progress = ((current ) / total) * 100;

  return (
    <div
      style={{
        width: "100%",
        background: "#e5e7eb", // light gray
        borderRadius: "9999px",
        height: "1rem",
        marginBottom: "1.5rem",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#062261",
          transition: "width 0.3s ease"
        }}
      ></div>
    </div>
  );
}

export default function QuizApp() {
  const [answers, setAnswers] = useState(Array(12).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleOptionSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  const calculateScores = () => {
    const depression = answers.slice(0, 4).reduce((a, b) => a + b, 0);
    const sleep = answers.slice(4, 8).reduce((a, b) => a + b, 0);
    const health = answers.slice(8, 12).reduce((a, b) => a + b, 0);
    return [
      { label: "Depression & Anxiety", score: depression },
      { label: "Sleep Deprivation", score: sleep },
      { label: "Healthy Mind", score: health }
    ].sort((a, b) => b.score - a.score);
  };

  const scores = submitted ? calculateScores() : [];

  return (
    <div className="flex justify-center min-h-screen p-6 flex flex-col items-center" style={{ backgroundColor: "#F4E7DF", color: "#062261" }}>
      {!submitted ? (
        <div className="w-full max-w-xl">
          <ProgressBar current={current} total={questions.length} />
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-xl font-semibold mb-6">{current + 1}. {questions[current]}</p>
            <div className="grid grid-cols-2 gap-4">
              {options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleOptionSelect(opt.value)}
                  className="flex w-full text-9xl py-4 px-4 rounded text-white text-base font-medium"
                  style={{ backgroundColor: "#D4E7DF" }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4">Your Results</h2>
          <ul className="space-y-2">
            {scores.map((s, i) => (
              <li key={i} className="text-lg">{i + 1}. {s.label}: {s.score} points</li>
            ))}
          </ul>
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers(Array(12).fill(null));
              setCurrent(0);
            }}
            className="mt-6 px-6 py-2 rounded text-white"
            style={{ backgroundColor: "red" }}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
