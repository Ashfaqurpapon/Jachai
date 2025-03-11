/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";
import { motion } from "framer-motion";

import { useSearchParams, useRouter } from "next/navigation";

const ConfirmExam = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const router = useRouter();

  // Mocked exam details (can be dynamic)
  const examDetails = {
    topic: "MCQ Test",
    timeLimit: "10 Minutes",
    marks: "10",
  };

  // Start Exam
  const startExam = () => {
    router.push(`/exam?subject=${subject}`);
  };

  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" w-full pt-7 bg-white shadow-lg rounded-lg"
    >
      <div className=" w-full  bg-white shadow-lg rounded-lg flex flex-col items-start relative transition-transform transform scale-95 animate-zoom-in">
        <h1 className="text-5xl font-bold text-center mb-4">Confirm Exam</h1>

        <p className="text-2xl pt-6 ">📘 Subject: {subject}</p>
        <p className="text-2xl pt-6">📖 Topic: {examDetails.topic}</p>
        <p className="text-2xl pt-6">⏳ Time: {examDetails.timeLimit}</p>
        <p className="text-2xl pt-6 pb-6">🎯 Marks: {examDetails.marks}</p>

        <button
          onClick={startExam}
          className="bg-blue-500  text-white px-4 py-4 mt-4 rounded w-1/3"
        >
          Start Exam
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmExam;
