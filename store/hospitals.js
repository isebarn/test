import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  hospitals: [],
  hospital: { name: 'Hospitall 1', address: 'Lemingway rd', icon: ':(', default_contract_length: 12, id: '620bbf510cc355db98f8cdf5' }
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
