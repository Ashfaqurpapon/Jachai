/* eslint-disable prettier/prettier */
"use client";

import { useRouter } from "next/navigation";

const subjects = [
  { name: "HSC বাংলা ২য় পত্র", id: "bangla-2" },
  { name: "HSC বাংলা ১ম পত্র", id: "bangla-1" },
  { name: "HSC বিজ্ঞান", id: "science" },
  { name: "HSC সমাজ", id: "social" },
];

const SubjectSelection = () => {
  const router = useRouter();

  const handleStartExam = (subjectId: string) => {
    router.push(`/exam?subject=${subjectId}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg flex flex-col items-start relative">
      <h1 className="text-2xl font-bold text-center mb-4">Select a Subject</h1>
      <ul className="space-y-4">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <span className="text-lg font-semibold">{subject.name}</span>
            <button
              onClick={() => handleStartExam(subject.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectSelection;
