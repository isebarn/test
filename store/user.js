import { getField, updateField } from 'vuex-map-fields'

function reset () {
  return {
    user: {},
    contracts: [],
    timecards: [],
    entries: []
  }
}

export const state = () => (reset())

export const mutations = {
  updateField,

  user: (state, payload) => {
    state.user = payload
  },

  contracts: (state, payload) => {
    state.contracts = payload
  },

  timecards: (state, payload) => {
    state.timecards = payload
  },

  entries: (state, payload) => {
    state.entries = payload
  }
}

export const getters = {
  getField
}

export const actions = {
  async getTimecardsForContract ({ commit }, contract) {
    const timecards = await this.$api.$get('timecards', { params: { contract: contract.id } })
    commit('timecards', timecards)
  },

  async setUser ({ commit }, user) {
    reset()
    commit('user', user)

    const contracts = await this.$api.$get('contracts', { params: { user: user.sub } })
    commit('contracts', contracts)
  }
}
