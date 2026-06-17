import { useState } from 'react'
import { questions as defaultQuestions } from './questions.js'
import Quiz from './Quiz.jsx'
import Pomodoro from './Pomodoro.jsx'
import CsvUpload from './CsvUpload.jsx'

export default function App() {
  const [customQuestions, setCustomQuestions] = useState(null)
  const activeQuestions = customQuestions ?? defaultQuestions

  return (
    <div className="app">
      <h1 className="app-title">Q&A Zing</h1>
      <Pomodoro />
      <CsvUpload
        onLoad={setCustomQuestions}
        onClear={() => setCustomQuestions(null)}
        hasCustom={customQuestions !== null}
      />
      <Quiz questions={activeQuestions} />
    </div>
  )
}
