<template>
  <v-container>
    <v-row><v-text-field v-model="email" label="Email" /></v-row>
    <v-row><v-text-field v-model="first_name" label="Fist name" /></v-row>
    <v-row><v-text-field v-model="last_name" label="Last name" /></v-row>
    <v-row><v-select v-model="facility_name" :items="hospitals" item-text="name" label="Facility" /></v-row>
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
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {

  data () {
    return {
      email: '',
      facility_name: '',
      start_date: '',
      end_date: '',
      first_name: '',
      last_name: '',
      user_type: 'Nurse'
    }
  },

  async fetch () {
    if (this.hospitals.length === 0) {
      await this.fetchHospitals()
    }
  },

  computed: {
    ...mapFields('hospitals', ['hospitals'])
  },

  methods: {
    ...mapActions('users', ['createUserWithContract']),
    ...mapActions('hospitals', ['fetchHospitals']),

    saveUser () {
      this.createUserWithContract({
        email: this.email,
        facility_name: this.facility_name,
        start_date: this.start_date,
        end_date: this.end_date,
        first_name: this.first_name,
        last_name: this.last_name,
        type: 'Nurse'
      })
    }
  }
}
</script>
