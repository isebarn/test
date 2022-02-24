import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  hospitals: [],
  hospital: null
})

export const mutations = {
  updateField,

  hospitals: (state, payload) => {
    state.hospitals = payload
  }
}

export const getters = {
  getField
}

export const actions = {
  async fetchHospitals ({ commit }) {
    const response = await this.$api.$get('hospitals')
    commit('hospitals', response)
  },

  async updateHospital ({ commit, state }) {
    const response = await this.$api.$put('hospitals', state.hospital)
    commit('hospital', response)
  }
}
