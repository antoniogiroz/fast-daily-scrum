import sortBy from 'lodash/sortBy'
import shuffle from 'lodash/shuffle'
import { getTeams, getAllMembers } from '@/services/members.service'

export const state = () => ({
  teams: [],
  members: [],
  membersInDaily: [],
  currentMember: null,
  isDailyStarted: false,
  isDailyFinished: false,
  initialCounterSeconds: process.env.INITIAL_COUNTER_SECONDS || 120,
  totalDailyTime: 0,
})

export const getters = {
  availableMembers(state) {
    return state.members.filter(({ isAvailable }) => isAvailable)
  },

  awayMembers(state) {
    return state.members.filter(({ isAvailable }) => !isAvailable)
  },

  currentMemberIndex(state) {
    return state.membersInDaily.findIndex(
      (member) => member.id === state.currentMember.id
    )
  },

  previousMember(state, getters) {
    return state.membersInDaily[getters.currentMemberIndex - 1]
  },

  nextMember(state, getters) {
    return state.membersInDaily[getters.currentMemberIndex + 1]
  },
}

export const mutations = {
  setTeams(state, teams) {
    state.teams = teams
  },

  setMembers(state, members) {
    state.members = members
  },

  setAvailableMembers(state, newMembers) {
    state.members.forEach((member) => {
      member.isAvailable = !!newMembers.find((m) => m.id === member.id)
    })
  },

  setMembersInDaily(state, members) {
    state.membersInDaily = members
  },

  toggleMemberAvailability(state, member) {
    const foundMember = state.members.find((m) => m.id === member.id)
    if (foundMember) {
      foundMember.isAvailable = !foundMember.isAvailable
    }
  },

  setDailyStarted(state, isStarted) {
    state.isDailyStarted = isStarted
  },

  setDailyFinished(state, isFinished) {
    state.isDailyFinished = isFinished
  },

  updateCurrentMemberTime(state, currentTotalTime) {
    state.currentMember.totalTime = currentTotalTime
  },

  setCurrentMemberAsCompleted(state) {
    state.currentMember.isCompleted = true
  },

  setCurrentMember(state, member) {
    state.currentMember = member
  },

  setTotalDailyTime(state, totalDailyTime) {
    state.totalDailyTime = totalDailyTime
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const teams = await getTeams()
    let members = await getAllMembers()

    teams.forEach((team) => {
      team.members = members.filter((member) => member.team === team.id)
    })

    members = sortBy(members, 'name')

    commit('setTeams', teams)
    commit('setMembers', members)
  },

  startDaily({ commit, getters }) {
    const membersInDaily = shuffle(getters.availableMembers).map((member) => ({
      ...member,
      totalTime: 0,
      isCompleted: false,
    }))
    commit('setMembersInDaily', membersInDaily)
    commit('setCurrentMember', membersInDaily[0])
    commit('setDailyStarted', true)
    commit('setDailyFinished', false)
    commit('setTotalDailyTime', 0)
  },

  nextMember({ commit, getters }) {
    commit('setCurrentMemberAsCompleted')
    commit('setCurrentMember', getters.nextMember)
  },

  finishDaily({ commit, state }) {
    const totalDailyTime = state.membersInDaily.reduce(
      (dailyTotalTime, member) => dailyTotalTime + member.totalTime,
      0
    )
    commit('setCurrentMemberAsCompleted')
    commit('setDailyStarted', false)
    commit('setDailyFinished', true)
    commit('setTotalDailyTime', totalDailyTime)
  },
}
