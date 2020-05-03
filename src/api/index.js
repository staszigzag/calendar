import NoteModel from '../models/Note.js'

export function getNotes () {
  const url = '/assets/date.json'
  return fetch(url)
    .then(response => response.json())
    .then(notes => {
      notes.forEach((el, idx) => (el.id = ++idx))
      return notes.map(n => new NoteModel(n))
    })
    .catch(er => console.error(er.message))
}
