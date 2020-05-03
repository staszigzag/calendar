import Vue from 'vue'
import Vuex from 'vuex'
import { getNotes } from '../api'
import { findDaysOfWeek } from '../services/Date'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    listNotes: [],
    numberDays: [],
    sizeCell: {
      w: 0,
      h: 0
    }
  },
  mutations: {
    SET_NOTES (state, notes) {
      state.listNotes = notes
    },
    SET_NUMBER_DAYS (state, numbers) {
      state.numberDays = numbers
    },
    SET_SIZE_CELL (state, { w, h }) {
      state.sizeCell = { w, h }
    }
  },
  actions: {
    async getNotes ({ commit }) {
      const notes = await getNotes()
      console.log('notes from api', notes)
      commit('SET_NOTES', notes)
      // на основе первой заметки, находим все числа для недели
      const numberDays = findDaysOfWeek(notes[0].timestamp)
      commit('SET_NUMBER_DAYS', numberDays)
    }
  }
})
