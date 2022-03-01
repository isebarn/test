<template>
  <v-container>
    <v-select v-model="hospital" clearable :items="hospitals" @change="select">
      <template slot="item" slot-scope="data">
        {{ data.item.name }} - {{ data.item.address }}
      </template>
      <template slot="selection" slot-scope="data">
        {{ data.item.name }} - {{ data.item.address }}
      </template>
    </v-select>
    <v-select v-model="week" clearable :items="weeks" @change="select">
      <template slot="item" slot-scope="data">
        Week {{ data.item.weekNumber }} - {{ data.item.start | weekly }} - {{ data.item.end | weekly }}
      </template>
      <template slot="selection" slot-scope="data">
        Week {{ data.item.weekNumber }} - {{ data.item.start | weekly }} - {{ data.item.end | weekly }}
      </template>
    </v-select>
    <v-select v-model="user" clearable :items="users" @change="select">
      <template slot="item" slot-scope="data">
        {{ data.item.first_name }} {{ data.item.last_name }} - {{ data.item.email }}
      </template>
      <template slot="selection" slot-scope="data">
        {{ data.item.first_name }} {{ data.item.last_name }} - {{ data.item.email }}
      </template>
    </v-select>
    <v-btn block :disabled="entries.length === 0" @click="downloadCSV">
      <span v-if="entries.length > 0">Export {{ entries.length }} entries</span>
      <span v-else>No entries</span>
    </v-btn>
  </v-container>
</template>

<script>
export default {

  data () {
    return {
      hospitals: [],
      hospital: null,
      year: 2022,
      weeks: null,
      week: null,
      users: [],
      user: null,
      entries: [],
      filters: {}
    }
  },

  async fetch () {
    this.hospitals = await this.$api.$get('hospitals/base')
    this.users = await this.$admin_operations.$get('list_users')
  },

  created () {
    this.weeks = this.$getWeekPeriodsInYear(this.year)
  },

  methods: {
    select (event) {
      this.filters = {}
      if (this.user) {
        this.filters.shift__timecard__contract__user = this.user.sub
      }

      if (this.hospital) {
        this.filters.shift__timecard__contract__hospital = this.hospital.id
      }

      if (this.week) {
        this.filters.shift__timecard__week = this.week.weekNumber
      }

      this.$api.$get('entries/base', { params: this.filters }).then((r) => {
        this.entries = r
      })
    },

    downloadCSV () {
      this.$axios({
        url: process.env.AXIOS_CSV_EXPORT,
        method: 'GET',
        responseType: 'blob',
        params: this.filters
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', `2020-week-${this.week.weekNumber}.csv`)
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    }
  }
}
</script>
