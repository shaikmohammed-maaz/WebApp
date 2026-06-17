import { useRef, useState } from 'react'
import { parseQuestions } from './utils/parseQuestions.js'

const SAMPLE_CSV = `question,option1,option2,option3,option4,answer
Which language runs in a web browser?,Java,C,Python,JavaScript,4
What does CSS stand for?,Central Style Sheets,Cascading Style Sheets,Cascading Simple Sheets,Cars SUVs Sailboats,2
What year was JavaScript launched?,1996,1995,1994,none of the above,2
Which HTML tag is used for the largest heading?,<h6>,<heading>,<h1>,<head>,3
Which React hook is used for side effects?,useState,useEffect,useMemo,useRef,2
`

export default function CsvUpload({ onLoad, onClear, hasCustom }) {
  const fileInputRef = useRef(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [status, setStatus] = useState('idle')
  const [loadedCount, setLoadedCount] = useState(0)
  const [errorList, setErrorList] = useState([])
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const { questions, errors } = parseQuestions(event.target.result)
      setLoadedCount(questions.length)
      setErrorList(errors)

      if (questions.length === 0) {
        setStatus('error')
        return
      }

      setStatus(errors.length > 0 ? 'partial' : 'success')
      onLoad(questions)
    }
    reader.onerror = () => {
      setStatus('error')
      setLoadedCount(0)
      setErrorList([{ row: 0, message: 'Could not read the selected file' }])
    }
    reader.readAsText(file)
  }

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'sample-questions.csv'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setStatus('idle')
    setLoadedCount(0)
    setErrorList([])
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClear()
  }

  return (
    <div className="card upload-card">
      <div className="upload-header">
        <h2>Upload Question Paper</h2>
        {hasCustom && (
          <span className="badge success">✓ {loadedCount} questions loaded</span>
        )}
      </div>

      <button
        type="button"
        className="format-toggle"
        onClick={() => setIsGuideOpen((open) => !open)}
      >
        📋 How to format your CSV {isGuideOpen ? '▲' : '▼'}
      </button>

      {isGuideOpen && (
        <div className="format-guide">
          <p>Your CSV must have these 6 columns in the header row:</p>
          <table className="guide-table">
            <thead>
              <tr>
                <th>Column</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>question</td>
                <td>The question text</td>
              </tr>
              <tr>
                <td>option1–4</td>
                <td>The four answer choices</td>
              </tr>
              <tr>
                <td>answer</td>
                <td>Correct choice number: 1, 2, 3, or 4</td>
              </tr>
            </tbody>
          </table>
          <p className="guide-example-label">Example:</p>
          <pre className="guide-example">
{`question,option1,option2,option3,option4,answer
Which language runs in a web browser?,Java,C,Python,JavaScript,4`}
          </pre>
          <button
            type="button"
            className="btn secondary"
            onClick={handleDownloadSample}
          >
            ⬇ Download Sample CSV
          </button>
        </div>
      )}

      <label className="file-label" htmlFor="csv-input">
        {hasCustom && fileName ? fileName : 'Choose a CSV file…'}
      </label>
      <input
        id="csv-input"
        type="file"
        accept=".csv,text/csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="file-input"
      />

      {status === 'success' && (
        <p className="upload-feedback success">
          ✓ {loadedCount} questions loaded successfully.
        </p>
      )}
      {status === 'partial' && (
        <p className="upload-feedback warning">
          ⚠ {loadedCount} questions loaded. {errorList.length} row(s) were
          skipped (see below).
        </p>
      )}
      {status === 'error' && (
        <p className="upload-feedback error">
          ✗ No valid questions found. Fix your CSV and try again.
        </p>
      )}

      {errorList.length > 0 && (
        <ul className="error-list">
          {errorList.map((e, i) => (
            <li key={i}>
              Row {e.row}: {e.message}
            </li>
          ))}
        </ul>
      )}

      {hasCustom && (
        <button
          type="button"
          className="btn secondary clear-btn"
          onClick={handleClear}
        >
          ✕ Clear — use default questions
        </button>
      )}
    </div>
  )
}
