<template>
  <v-container align-center justify-center>
    <hospitalCard v-if="hospital" />
    <contractTable v-if="hospital" />

    <weekReport v-if="hospital" />
    <hospitalList v-else />
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import hospitalList from '../components/lists/hospitals'
import hospitalCard from '../components/overviews/hospital'
import contractTable from '../components/tables/contracts'

import weekReport from '../components/reports/weekly'

export default {
  components: {
    hospitalList,
    hospitalCard,
    contractTable,

    weekReport
  },
  computed: {
    ...mapFields('hospitals', ['hospital'])
  }

}
</script>
