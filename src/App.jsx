import Quiz from './Quiz.jsx'
import Pomodoro from './Pomodoro.jsx'

export default function App() {
  return (
    <div className="app">
      <h1 className="app-title">Q&A Zing</h1>
      <Pomodoro />
      <Quiz />
    </div>
  )
}
