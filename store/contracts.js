import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  contracts: [],
  contract: null
})

export const mutations = {
  updateField,

  contracts: (state, payload) => {
    state.contracts = payload
  }
}

export const getters = {
  getField
}

export const actions = {
  async fetchContracts ({ commit }, payload) {
    const response = await this.$api.$get('contracts', { params: { hospital: payload.id } })
    commit('contracts', response)
  },

  async updateContract ({ commit, state }) {
    const response = await this.$api.$put('contracts', state.contract)
    commit('contract', response)
  }
}
