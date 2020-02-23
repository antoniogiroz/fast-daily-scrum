import { sortBy, shuffle } from 'lodash'
import { getAllMembers } from '@/services/members.service'

export const state = () => ({
  members: [],
  currentMemberIndex: 0,
  isDailyStarted: false,
  isDailyFinished: false,
  initialCounterSeconds: 120,
  totalDailyTime: 0
})

export const getters = {
  availableMembers(state) {
    return state.members.filter((member) => member.isAvailable)
  },

  awayMembers(state) {
    return state.members.filter((member) => !member.isAvailable)
  },

  currentMember(state, getters) {
    return getters.availableMembers[state.currentMemberIndex]
  },

  previousMember(state, getters) {
    return getters.availableMembers[state.currentMemberIndex - 1]
  },

  nextMember(state, getters) {
    return getters.availableMembers[state.currentMemberIndex + 1]
  }
}

export const mutations = {
  setMember(state, members) {
    state.members = members
  },

  toggleMember(state, member) {
    const foundMember = state.members.find((m) => m.email === member.email)
    if (foundMember) {
      foundMember.isAvailable = !foundMember.isAvailable
    }
  },

  shuffleMembers(state) {
    state.members = shuffle(state.members)
  },

  setDailyStarted(state, isStarted) {
    state.isDailyStarted = isStarted
  },

  setDailyFinished(state, isFinished) {
    state.isDailyFinished = isFinished
  },

  selectNextMember(state, { currentMember, currentTotalTime }) {
    const currentMemberIndexInCompleteList = state.members.findIndex(
      (member) => member.email === currentMember.email
    )
    state.members[currentMemberIndexInCompleteList].totalTime = currentTotalTime
    state.currentMemberIndex++
  },

  setTotalDailyTime(state, totalDailyTime) {
    state.totalDailyTime = totalDailyTime
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    let members = await getAllMembers()
    members = sortBy(members, 'name')
    commit('setMember', members)
  },

  startDaily({ commit, state }) {
    if (!state.isDailyStarted) {
      commit('setDailyStarted', true)
      commit('shuffleMembers')
    }
  },

  nextMember({ commit, getters, dispatch }, currentTotalTime) {
    commit('selectNextMember', {
      currentMember: getters.currentMember,
      currentTotalTime
    })

    if (!getters.nextMember) {
      dispatch('finishDaily')
    }
  },

  finishDaily({ commit, getters }) {
    const totalDailyTime = getters.availableMembers.reduce(
      (dailyTotalTime, member) => dailyTotalTime + member.totalTime,
      0
    )
    commit('setDailyFinished', true)
    commit('setTotalDailyTime', totalDailyTime)
  }
}
