import sortBy from 'lodash/sortBy'
import shuffle from 'lodash/shuffle'
import { getAllMembers } from '@/services/members.service'

export const state = () => ({
  members: [],
  availableMembers: [],
  currentMemberIndex: 0,
  isDailyStarted: false,
  isDailyFinished: false,
  initialCounterSeconds: 120,
  totalDailyTime: 0,
})

export const getters = {
  awayMembers(state) {
    return state.members.filter(({ isAvailable }) => !isAvailable)
  },

  currentMember(state) {
    return state.availableMembers[state.currentMemberIndex]
  },

  previousMember(state) {
    return state.availableMembers[state.currentMemberIndex - 1]
  },

  nextMember(state) {
    return state.availableMembers[state.currentMemberIndex + 1]
  },
}

export const mutations = {
  initDaily(state) {
    state.members.forEach((member) => {
      member.totalTime = 0
      member.isCompleted = false
    })
    state.currentMemberIndex = 0
    state.availableMembers = shuffle(state.availableMembers)
    state.isDailyStarted = true
    state.isDailyFinished = false
    state.totalDailyTime = 0
  },

  setMember(state, members) {
    state.members = members
  },

  updateAvailableMembers(state) {
    state.availableMembers = state.members.filter(
      ({ isAvailable }) => isAvailable
    )
  },

  toggleMemberAvailability(state, member) {
    const foundMember = state.members.find((m) => m.email === member.email)
    if (foundMember) {
      foundMember.isAvailable = !foundMember.isAvailable
    }
    state.availableMembers = state.members.filter(
      ({ isAvailable }) => isAvailable
    )
  },

  setDailyStarted(state, isStarted) {
    state.isDailyStarted = isStarted
  },

  setDailyFinished(state, isFinished) {
    state.isDailyFinished = isFinished
  },

  updateCurrentMemberTime(state, currentTotalTime) {
    state.availableMembers[
      state.currentMemberIndex
    ].totalTime = currentTotalTime
  },

  setCurrentMemberAsCompleted(state) {
    state.availableMembers[state.currentMemberIndex].isCompleted = true
  },

  selectNextMember(state) {
    state.currentMemberIndex++
  },

  setTotalDailyTime(state, totalDailyTime) {
    state.totalDailyTime = totalDailyTime
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    let members = await getAllMembers()
    members = sortBy(members, 'name')
    commit('setMember', members)
    commit('updateAvailableMembers')
  },

  startDaily({ commit, state }) {
    commit('initDaily')
  },

  nextMember({ commit }) {
    commit('setCurrentMemberAsCompleted')
    commit('selectNextMember')
  },

  finishDaily({ commit, state }) {
    const totalDailyTime = state.availableMembers.reduce(
      (dailyTotalTime, member) => dailyTotalTime + member.totalTime,
      0
    )
    commit('setCurrentMemberAsCompleted')
    commit('setDailyStarted', false)
    commit('setDailyFinished', true)
    commit('setTotalDailyTime', totalDailyTime)
  },
}
