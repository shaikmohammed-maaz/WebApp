import { useState } from 'react'
import { questions } from './questions.js'

export default function Quiz() {
  const [stage, setStage] = useState('start')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [score, setScore] = useState(0)

  const handleStart = () => {
    setStage('playing')
    setCurrentIndex(0)
    setSelectedIndex(null)
    setScore(0)
  }

  const handleSelect = (i) => {
    if (selectedIndex === null) setSelectedIndex(i)
  }

  const handleNext = () => {
    const q = questions[currentIndex]
    const nextScore = selectedIndex === q.answerIndex ? score + 1 : score
    setScore(nextScore)
    if (currentIndex + 1 >= questions.length) {
      setStage('finished')
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedIndex(null)
    }
  }

  if (stage === 'start') {
    return (
      <div className="card">
        <p>Test your knowledge with {questions.length} quick questions.</p>
        <button className="btn primary" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    )
  }

  if (stage === 'finished') {
    return (
      <div className="card">
        <h2>
          You scored {score} / {questions.length}
        </h2>
        <button className="btn primary" onClick={handleStart}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[currentIndex]
  const isLast = currentIndex + 1 === questions.length

  return (
    <div className="card">
      <p className="progress">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2 className="question">{q.question}</h2>
      <ul className="options">
        {q.options.map((opt, i) => {
          const isSelected = selectedIndex === i
          const isCorrect = selectedIndex !== null && i === q.answerIndex
          const isWrongPick = isSelected && i !== q.answerIndex
          const className = [
            'option',
            isCorrect && 'correct',
            isWrongPick && 'wrong',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <li key={i}>
              <button
                className={className}
                onClick={() => handleSelect(i)}
                disabled={selectedIndex !== null}
              >
                {opt}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        className="btn primary"
        onClick={handleNext}
        disabled={selectedIndex === null}
      >
        {isLast ? 'See Result' : 'Next'}
      </button>
    </div>
  )
}
