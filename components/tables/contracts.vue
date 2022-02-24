<template>
  <v-data-table :items="contracts" :headers="headers">
    <template #item.start="{item}">
      {{ item.start | date }}
    </template>
    <template #item.end="{item}">
      {{ item.end | date }}
    </template>
  </v-data-table>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {

  data () {
    return {
      headers: [
        {
          text: 'User',
          value: 'id'
        },
        {
          text: 'Start',
          value: 'start'
        },
        {
          text: 'End',
          value: 'end'
        }
      ]
    }
  },
  async fetch () {
    if (this.hospital) {
      await this.fetchContracts(this.hospital)
    }
  },

  computed: {
    ...mapFields('hospitals', ['hospital']),
    ...mapFields('contracts', ['contracts'])
  },

  methods: {
    ...mapActions('contracts', ['fetchContracts'])

  }
}
</script>
