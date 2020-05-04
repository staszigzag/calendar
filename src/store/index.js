import Vue from 'vue'
import Vuex from 'vuex'
import { getNotes } from '../api'
import { findDaysOfWeek } from '../services/Date'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    listNotes: [],
    dragNote: null,

    numberDays: [],
    sizeCell: {
      w: 0,
      h: 0
    }
  },
  mutations: {
    SET_NEW_NOTES (state, notes = []) {
      notes.forEach(note => {
        // проверяем есть ли совпадения с другими заметками
        const notesCompetitor = state.listNotes.filter(n => n.dayWeek === note.dayWeek && n.hour === note.hour)
        // нет совпадений
        if (!notesCompetitor.length) state.listNotes.push(note)
        // нет места, игнорируем
        if (notesCompetitor.length > 1) {
          console.warn('not places for note', note)
          return
        }
        // добавлям мини режим и пушим
        if (notesCompetitor.length === 1) {
          notesCompetitor[0].isTimeAm = true
          note.isTimePm = true
          state.listNotes.push(note)
        }
      })
    },
    SET_NUMBER_DAYS (state, numbers) {
      state.numberDays = numbers
    },
    SET_SIZE_CELL (state, { w, h }) {
      state.sizeCell = { w, h }
    },
    SET_DRAG_NOTE (state, note) {
      console.log('SET_DRAG_NOTE')
      state.dragNote = note
    },
    UPDATE_TIME_NOTE (state, { day, hour }) {
      console.log('UPDATE_TIME_NOTE')
      day = Number(day)
      hour = Number(hour)
      // заметки с поле с которого взяли заметку
      const notesFrom = state.listNotes.filter(n => n.dayWeek === state.dragNote.dayWeek && n.hour === state.dragNote.hour)
      console.log('from', notesFrom.length)
      // заметоки на поле на которое положили
      const notesTo = state.listNotes.filter(n => n.dayWeek === day && n.hour === hour)
      console.log('to', notesTo.length)
      // если на поле уже две заметки
      if (notesTo.length > 1) return

      if (notesFrom.length > 1) {
        // сбросить размер заметок
        notesFrom.forEach(n => {
          n.isTimeAm = n.isTimePm = false
        })
      }
      // нет заметки
      if (!notesTo.length) {
        state.dragNote.setTime(hour, day)
        return
      }
      // одна заметка на поле и не та которую тянут
      if (notesTo.length === 1 && notesTo[0].id !== state.dragNote.id) {
        state.dragNote.setTime(hour, day)
        state.dragNote.isTimePm = true

        notesTo[0].isTimeAm = true
      }
    }
  },
  actions: {
    async getNotes ({ commit }) {
      const notes = await getNotes()
      console.log('notes from api', notes)
      commit('SET_NEW_NOTES', notes)
      // на основе первой заметки, находим все числа для недели
      const numberDays = findDaysOfWeek(notes[0].timestamp)
      commit('SET_NUMBER_DAYS', numberDays)
    }
  }
})
