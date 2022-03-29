import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(q => setQuestions(q))
  }, [])

  function handleNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(deleteID) {
    setQuestions(questions.filter(q => q.id !== deleteID))
  }

  function handleAnswerChange(updatedAnswer) {
    const updatedAnswers = questions.map(q => q.id===updatedAnswer.id ? updatedAnswer : q)
    setQuestions(updatedAnswers)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm onNewQuestion={handleNewQuestion} /> :
        <QuestionList questions={questions} onDelete={handleDeleteQuestion} onUpdateAnswer={handleAnswerChange} />}
    </main>
  );
}

export default App;
