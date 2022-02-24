import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  users: [],
  user: {}
})

export const mutations = {
  updateField,

  users: (state, payload) => {
    state.users = payload
  }
}

export const getters = {
  getField
}

export const actions = {
  async fetchUsers ({ commit }) {
    const response = await this.$admin_operations.$get('list_users')
    commit('users', response)
  },

  async createUserWithContract ({ commit, dispatch }, { user, image }) {
    const response = await this.$admin_operations.$post('create_user_with_contract', user)
    dispatch('uploadUserImage', { user: response, image })
    dispatch('fetchUsers')
    return response
  },

  async createUser ({ commit, dispatch }, { user, image }) {
    const response = await this.$admin_operations.$post('create_user', user)
    dispatch('uploadUserImage', { user: response, image })
    dispatch('fetchUsers')
    return response
  },

  async uploadUserImage ({ commit }, { user, image }) {
    if (image && user.sub) {
      const formData = new FormData()
      formData.append('file', image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      image = await this.$admin_operations.$put(`create_user_image/${user.sub}`, formData)
    }
  }
}
