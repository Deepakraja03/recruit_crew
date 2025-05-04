import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [grade, setGrade] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const data = localStorage.getItem("user");
  const email = data ? JSON.parse(data).email : null;

  const router = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/get-questions");
        const data = await response.json();

        if (Array.isArray(data.questions)) {
          setQuestions(data.questions.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (answer.trim() === "") return;
  
    const updatedAnswers = [...answers, answer]; // Include current answer
  
    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(updatedAnswers);
      setAnswer("");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setAnswers(updatedAnswers);
      submitAnswers(updatedAnswers);
    }
  };  

  const submitAnswers = async (updatedAnswers: string[]) => {
    const payload = { questions, answers: updatedAnswers };
    
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:4000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
      } else if (data.evaluation) {
        const overallGradeMatch = data.evaluation.match(/Overall Grade:?\s*([A-F])/i);
        const validGrade = overallGradeMatch ? overallGradeMatch[1].toUpperCase() : 'N/A';
  
        setGrade(validGrade);
  
        if (email) {
          try {
            // Send the answers along with the grade to update the profile
            const updateResponse = await fetch("http://localhost:3000/api/update-profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                email, 
                overallGrade: validGrade, 
                questions,  // Send the questions
                answers: updatedAnswers // Send the answers
              }),
            });
  
            if (!updateResponse.ok) {
              throw new Error('Failed to update user profile');
            }
  
            setShowPopup(true);
            setIsLoading(false);
          } catch (error) {
            console.error("Error updating grade:", error);
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers. Please try again.");
      setIsLoading(false);
    }
  };  

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Assessing your grade...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        {error && <div className="text-red-500 text-center mb-4">❌ {error}</div>}

        {!grade ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg text-gray-700 mt-4">{questions[currentQuestionIndex]}</p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Type your answer here..."
            ></textarea>

            <button
              onClick={handleNext}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!answer.trim()}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        ) : null}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">🎉 Congratulations!</h2>
            <p className="text-lg text-gray-700 mt-4">Your final grade: <span className="font-bold text-green-600">{grade}</span></p>
            <button
              onClick={() => router("/dashboard")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;