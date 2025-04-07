// app/routes/questions.$uploadId.tsx
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requestGenerateQuestions } from "~/lib/goService.client";

interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  answerExplanation?: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const uploadId = params["uploadId"];
  if (!uploadId) {
    throw new Error("Missing uploadId param.");
  }
  const questions = await requestGenerateQuestions(uploadId);
  return { questions };
};

export default function QuestionsUploadIdPage() {
  const { questions } = useLoaderData<{ questions: Question[] }>();
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Generated Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        questions.map(q => (
          <div key={q.id} className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded">
            <p className="font-semibold">Q: {q.questionText}</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              {q.options.map((opt, idx) => (
                <li key={idx}>{idx + 1}. {opt}</li>
              ))}
            </ul>
            <p className="mt-2">Correct: #{q.correctIndex + 1}</p>
            {q.answerExplanation && (
              <p className="mt-1 italic">Explanation: {q.answerExplanation}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
