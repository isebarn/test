<template>
  <form action="">
    <v-text-field v-model="user.email" label="Email" />
    <v-text-field v-model="user.first_name" label="Fist name" />
    <v-text-field v-model="user.last_name" label="Last name" />
    <v-file-input v-model="image" label="Image" />
    <v-btn @click="saveUser">
      Save
    </v-btn>
  </form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {

  data () {
    return {
      user: {},
      image: null
    }
  },

  computed: {
    ...mapFields('hospitals', ['hospitals'])
  },

  methods: {
    ...mapActions('users', ['createUser']),
    ...mapActions('hospitals', ['fetchHospitals']),

    async saveUser () {
      await this.createUser({ user: this.user, image: this.image })
    }
  }
}
</script>
