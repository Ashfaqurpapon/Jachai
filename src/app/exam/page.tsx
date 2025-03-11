/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const questions = [
  {
    question: "বাংলা ভাষার মৌলিক ধাতুগুলোকে কয় শ্রেণীতে ভাগ করা হয়েছে?",
    options: ["চার", "ছয়", "তিন", "দুই"],
    answer: "চার",
  },
  {
    question: "বাংলা ভাষার মৌলিক ধাতুগুলোকে কয় শ্রেণীতে ভাগ করা হয়েছে?",
    options: ["চার", "ছয়", "তিন", "দুই"],
    answer: "চার",
  },
  {
    question: "বাংলা ভাষার মৌলিক ধাতুগুলোকে কয় শ্রেণীতে ভাগ করা হয়েছে?",
    options: ["চার", "ছয়", "তিন", "দুই"],
    answer: "চার",
  },
  {
    question: "বাংলা ভাষার মৌলিক ধাতুগুলোকে কয় শ্রেণীতে ভাগ করা হয়েছে?",
    options: ["চার", "ছয়", "তিন", "দুই"],
    answer: "চার",
  },
];

const optionLabels = ["ক", "খ", "গ", "ঘ"]; // Labels for options

const Exam = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject"); // Get subject from URL

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time is up! Submitting the test.");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (index: number, optionIndex: number) => {
    const selectedLabel = optionLabels[optionIndex]; // Get "ক", "খ", "গ", "ঘ"
    setAnswers({ ...answers, [index]: selectedLabel });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Your answers have been submitted!");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-start relative">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center w-full">MCQ Test</h1>
      <h2 className="text-lg font-semibold mt-2 text-center w-full mb-7">
        {subject ? `Subject: ${subject}` : "HSC বাংলা ২য় পত্র"}
      </h2>

      {/* Questions */}
      {questions.map((q, index) => (
        <div key={index} className="my-4 text-left w-full pt-1">
          <p className="font-semibold">
            {index + 1}. {q.question}
          </p>
          {q.options.map((option, optionIndex) => (
            <label
              key={option}
              className={`block ${
                answers[index] === optionLabels[optionIndex]
                  ? "text-green-500 font-bold"
                  : "text-black"
              }`}
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleOptionChange(index, optionIndex)}
                className="mr-2 accent-green-500"
              />
              {optionLabels[optionIndex]}. {option}
            </label>
          ))}
        </div>
      ))}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>

      {/* Timer Box */}
      <div className="fixed  ml-60 mb-60 bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-lg shadow-md font-bold text-lg">
        ⏳ Time Left: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Exam;
