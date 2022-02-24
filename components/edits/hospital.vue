<template>
  <v-container>
    <v-text-field v-model="name" label="name" />
    <v-text-field v-model="address" label="address" />
    <v-btn block @click="updateHospital">
      Update
    </v-btn>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  computed: {
    ...mapFields('hospitals', ['hospital.name', 'hospital.address'])
  },

  methods: {
    ...mapActions('hospitals', ['updateHospital'])
  }
}
</script>
