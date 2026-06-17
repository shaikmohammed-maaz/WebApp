/**
 * Pure CSV question-paper parser. No React, no side effects.
 *
 * @typedef {{ question: string, options: string[], answerIndex: number }} Question
 * @typedef {{ row: number, message: string }} RowError
 */

const REQUIRED_COLUMNS = [
  'question',
  'option1',
  'option2',
  'option3',
  'option4',
  'answer',
]

/**
 * Split a single CSV line into fields, honouring double-quoted values
 * (so commas inside quotes are kept intact, and "" is an escaped quote).
 *
 * @param {string} line
 * @returns {string[]}
 */
function splitCSVLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current)
  return fields
}

/**
 * Parse and validate a raw CSV string into quiz questions.
 *
 * @param {string} csvText
 * @returns {{ questions: Question[], errors: RowError[] }}
 */
export function parseQuestions(csvText) {
  /** @type {Question[]} */
  const questions = []
  /** @type {RowError[]} */
  const errors = []

  const rows = String(csvText ?? '')
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')

  if (rows.length < 2) {
    return {
      questions: [],
      errors: [{ row: 0, message: 'File is empty or has no data rows' }],
    }
  }

  const header = splitCSVLine(rows[0]).map((h) => h.trim().toLowerCase())

  const columnIndex = {}
  const missing = []
  for (const name of REQUIRED_COLUMNS) {
    const idx = header.indexOf(name)
    if (idx === -1) {
      missing.push(name)
    } else {
      columnIndex[name] = idx
    }
  }

  if (missing.length > 0) {
    return {
      questions: [],
      errors: [
        {
          row: 0,
          message: `Missing required column(s): ${missing.join(', ')}`,
        },
      ],
    }
  }

  for (let i = 1; i < rows.length; i++) {
    const rowNumber = i + 1
    const fields = splitCSVLine(rows[i]).map((f) => f.trim())

    if (fields.length !== header.length) {
      errors.push({
        row: rowNumber,
        message: `Expected ${header.length} columns but found ${fields.length}`,
      })
      continue
    }

    const question = fields[columnIndex.question]
    const options = [
      fields[columnIndex.option1],
      fields[columnIndex.option2],
      fields[columnIndex.option3],
      fields[columnIndex.option4],
    ]
    const answerRaw = fields[columnIndex.answer]

    if (question === '') {
      errors.push({ row: rowNumber, message: 'Question text is empty' })
      continue
    }

    const emptyOptionIdx = options.findIndex((opt) => opt === '')
    if (emptyOptionIdx !== -1) {
      errors.push({
        row: rowNumber,
        message: `Option ${emptyOptionIdx + 1} is empty`,
      })
      continue
    }

    if (!/^\d+$/.test(answerRaw)) {
      errors.push({
        row: rowNumber,
        message: `Answer "${answerRaw}" must be a number from 1 to 4`,
      })
      continue
    }

    const answer = parseInt(answerRaw, 10)
    if (answer < 1 || answer > 4) {
      errors.push({
        row: rowNumber,
        message: `Answer "${answerRaw}" must be 1, 2, 3, or 4`,
      })
      continue
    }

    questions.push({ question, options, answerIndex: answer - 1 })
  }

  return { questions, errors }
}
