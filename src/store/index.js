import Vue from 'vue'
import Vuex from 'vuex'
import { getNotes } from '../api'
import { findDaysOfWeek } from '../services/Date'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    listNotes: [],
    numberDays: []
  },
  mutations: {
    SET_NOTES (state, notes) {
      state.listNotes = notes
    },
    SET_NUMBER_DAYS (state, numbers) {
      state.numberDays = numbers
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
