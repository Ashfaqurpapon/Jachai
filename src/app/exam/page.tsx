/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)

  // Prevent Leaving the Page
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to quit the exam?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle Option Change
  const handleOptionChange = (index: number, optionIndex: number) => {
    setAnswers({ ...answers, [index]: optionLabels[optionIndex] });
  };

  // Submit Answers to Backend
  const submitAnswers = async () => {
    //console.log("Submitting Answers:", answers);
    // Simulating API Call
    await fetch("/api/submitExam", {
      method: "POST",
      body: JSON.stringify({ subject, answers }),
    });

    alert("Your answers have been submitted!");
    router.push("/subject"); // Redirect to Subject Selection
  };

  // Confirm Before Exiting
  const confirmExit = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to quit the exam? Your answers will be submitted."
    );
    if (userConfirmed) {
      submitAnswers();
    }
  };

  // Block Back/Refresh Button
  useEffect(() => {
    const handlePopState = () => {
      confirmExit();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time is up! Submitting the test.");
      submitAnswers();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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
      <h1 className="text-2xl font-bold text-center w-full">MCQ Test</h1>
      <h2 className="text-lg font-semibold mt-2 text-center w-full mb-7">
        {subject ? `Subject: ${subject}` : "HSC বাংলা ২য় পত্র"}
      </h2>

      {/* Questions */}
      {questions.map((q, index) => (
        <div key={index} className="my-4 text-left w-full pt-1">
          <p className="font-semibold ">
            {index + 1}. {q.question}
          </p>
          {q.options.map((option, optionIndex) => (
            <label
              key={option}
              className={`block ${
                answers[index] === optionLabels[optionIndex]
                  ? "text-green-500 font-bold"
                  : "text-black dark:text-white"
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

      {/* Submit & Quit Buttons */}
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={submitAnswers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Timer Box */}
      <div className="fixed  ml-60 mb-60 bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-lg shadow-md font-bold text-lg">
        ⏳ Time Left: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Exam;
