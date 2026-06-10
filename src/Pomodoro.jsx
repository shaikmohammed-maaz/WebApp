import { useEffect } from 'react'
import usePomodoro from './usePomodoro.js'

const CIRCUMFERENCE = 339.3
const SESSIONS_PER_ROUND = 4
const APP_TITLE = 'Q&A Zing'

const MODE_LABELS = {
  work: 'Work',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
}

function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export default function Pomodoro() {
  const {
    mode,
    timeLeft,
    totalDuration,
    isRunning,
    pomodoroCount,
    sessionsDone,
    start,
    pause,
    reset,
    skip,
    setMode,
  } = usePomodoro()

  const dashOffset = CIRCUMFERENCE * (timeLeft / totalDuration)

  useEffect(() => {
    document.title = isRunning
      ? `⏱ ${formatTime(timeLeft)} · ${MODE_LABELS[mode]}`
      : APP_TITLE
    return () => {
      document.title = APP_TITLE
    }
  }, [timeLeft, isRunning, mode])

  return (
    <div className="card pomo-card">
      <div className="pomo-tabs">
        {Object.keys(MODE_LABELS).map((key) => (
          <button
            key={key}
            type="button"
            className={`pomo-tab${mode === key ? ` active--${key}` : ''}`}
            onClick={() => setMode(key)}
          >
            {MODE_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="pomo-ring-wrap">
        <svg viewBox="0 0 120 120" className="pomo-ring">
          <circle cx="60" cy="60" r="54" className="pomo-ring-track" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className={`pomo-ring-progress pomo-ring-progress--${mode}`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="pomo-time">{formatTime(timeLeft)}</div>
      </div>

      <div className="pomo-session-dots">
        {Array.from({ length: SESSIONS_PER_ROUND }, (_, i) => (
          <span
            key={i}
            className={`pomo-dot${i < pomodoroCount ? ' filled' : ''}`}
          />
        ))}
      </div>

      <div className="pomo-controls">
        <button type="button" className="pomo-btn" onClick={reset}>
          Reset
        </button>
        <button
          type="button"
          className="pomo-btn play-pause"
          onClick={isRunning ? pause : start}
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="pomo-btn" onClick={skip}>
          Skip
        </button>
      </div>

      <p className="pomo-sessions-done">Sessions today: {sessionsDone}</p>
    </div>
  )
}
