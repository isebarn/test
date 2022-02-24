<template>
  <v-container>
    <v-row>
      <v-autocomplete
        v-model="user"
        :items="users"
        filled
        chips
        color="blue-grey lighten-2"
        label="Select"
      >
        <template #selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar left>
              <img :src="data.item.image" @error="imageAlt">
            </v-avatar>
            {{ data.item.first_name }}
          </v-chip>
        </template>
        <template #item="data">
          <template>
            <v-list-item-avatar>
              <img :src="data.item.image" @error="imageAlt">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ data.item.first_name }} {{ data.item.last_name }}</v-list-item-title>
              <v-list-item-subtitle v-html="data.item.email" />
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-row>
    <v-row>
      <v-autocomplete v-model="hospital" :items="hospitals" item-text="name" item-value="id" />
    </v-row>
    <v-row>
      <v-date-picker v-model="start_date" label="Start date" />
      <v-date-picker v-model="end_date" label="End date" />
    </v-row>
    <v-row>
      <v-btn @click="saveUser">
        Save
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {

  data () {
    return {
      user: '',
      hospital: '',
      start_date: '',
      end_date: ''
    }
  },

  async fetch () {
    if (this.users.length === 0) {
      await this.fetchUsers()
    }
    if (this.hospitals.length === 0) {
      await this.fetchHospitals()
    }
  },

  computed: {
    ...mapFields('users', ['users']),
    ...mapFields('hospitals', ['hospitals'])
  },

  methods: {
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('hospitals', ['fetchHospitals']),

    saveUser () {
      // this.createUserWithContract
      this.$axios.$post('contracts', {
        user: this.user.sub,
        hospital: this.hospital,
        start: this.start_date,
        end: this.end_date
      })
    },

    imageAlt (event) {
      event.target.src = 'https://www.kindpng.com/picc/m/144-1447559_profile-icon-missing-profile-picture-icon-hd-png.png'
    }
  }
}
</script>
