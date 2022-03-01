<template>
  <v-container fluid>
    <v-data-iterator
      :items="users"
      :search="search"
    >
      <template #header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          />
        </v-toolbar>
      </template>

      <template #default="props">
        <v-container v-for="user in props.items" :key="user.sub" @click="select(user)">
          <user-card :user="user" />
        </v-container>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import userCard from '../read/user'
export default {

  components: {
    userCard
  },

  data () {
    return { search: '' }
  },

  async fetch () {
    await this.fetchUsers()
  },

  computed: {
    ...mapFields('users', ['users']),
    ...mapFields('user', ['user'])
  },

  methods: {
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('user', ['setUser']),

    select (user) {
      this.setUser(user)
      this.$router.push('user')
    }
  }
}
</script>
