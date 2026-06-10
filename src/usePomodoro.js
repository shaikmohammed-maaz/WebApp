import { useCallback, useEffect, useRef, useState } from 'react'

const DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

const SESSIONS_PER_LONG_BREAK = 4
const BEEP_FREQUENCY = 880
const BEEP_DURATION = 0.6

function playBeep() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return
  const ctx = new AudioCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = BEEP_FREQUENCY
  gain.gain.setValueAtTime(0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + BEEP_DURATION)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + BEEP_DURATION)
  osc.onended = () => {
    ctx.close().catch(() => {})
  }
}

export default function usePomodoro() {
  const [mode, setModeState] = useState('work')
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [sessionsDone, setSessionsDone] = useState(0)

  // Refs let the tick callback read current state without rebuilding the
  // interval on every count change (only mode/isRunning rebuild it).
  const pomodoroCountRef = useRef(pomodoroCount)
  pomodoroCountRef.current = pomodoroCount
  const modeRef = useRef(mode)
  modeRef.current = mode

  const totalDuration = DURATIONS[mode]

  // Computes the next mode + counts when the current session ends.
  const advance = useCallback(() => {
    const currentMode = modeRef.current
    if (currentMode === 'work') {
      const newCount = pomodoroCountRef.current + 1
      if (newCount % SESSIONS_PER_LONG_BREAK === 0) {
        setModeState('longBreak')
        setPomodoroCount(0)
      } else {
        setModeState('shortBreak')
        setPomodoroCount(newCount)
      }
      setSessionsDone((n) => n + 1)
    } else {
      setModeState('work')
    }
  }, [])

  const handleSessionEnd = useCallback(() => {
    advance()
    setIsRunning(false)
    playBeep()
  }, [advance])

  // Tick: a pure updater that only decrements. No side effects here, so a
  // double-invoked updater (React StrictMode) cannot double-beep or
  // double-count — it just computes the same clamped value twice.
  useEffect(() => {
    if (!isRunning) return undefined
    const id = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  // Session-end side effects live in their own effect, keyed on timeLeft
  // reaching 0 while running. Effects fire once per committed state change,
  // so the transition + beep happen exactly once.
  useEffect(() => {
    if (!isRunning || timeLeft !== 0) return
    handleSessionEnd()
  }, [isRunning, timeLeft, handleSessionEnd])

  // When the mode changes, reset the countdown to that mode's full duration.
  useEffect(() => {
    setTimeLeft(DURATIONS[mode])
  }, [mode])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(DURATIONS[modeRef.current])
  }, [])

  const skip = useCallback(() => {
    setIsRunning(false)
    advance()
  }, [advance])

  const setMode = useCallback((nextMode) => {
    if (!(nextMode in DURATIONS)) return
    setIsRunning(false)
    setModeState(nextMode)
  }, [])

  return {
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
  }
}
