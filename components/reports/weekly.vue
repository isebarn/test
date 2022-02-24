<template>
  <v-row justify="center" align="center">
    <v-card>
      <v-slide-group
        v-model="week"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          v-for="(item, i) in weeks"
          :key="i"
          v-slot="{ active, toggle }"
          :value="item"
        >
          <v-card
            :color="active ? undefined : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            @click="toggle"
          >
            <v-card-title>{{ item.weekNumber }}</v-card-title>
            <v-card-subtitle>{{ item.start | date }}</v-card-subtitle>
            <v-card-subtitle>{{ item.end | date }}</v-card-subtitle>
            <v-progress-linear
              v-if="item.loading && loading"
              indeterminate
              color="yellow darken-2"
            />
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                />
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <v-card-actions>
        <v-btn @click="downloadCSV">
          Download CSV
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      week: 0,
      weeks: [],
      loading: false
    }
  },

  computed: {
    disableCSV () {
      return !('data' in this.week)
    }
  },

  created () {
    this.weeks = this.$getWeekPeriodsInYear(2022)
    this.week = this.weeks[this.weeks.length - 1]
  },

  methods: {
    downloadCSV () {
      this.$axios({
        url: 'http://127.0.0.1:5000/csv_export/',
        method: 'GET',
        responseType: 'blob',
        params: {
          shift__timecard__week: this.week.weekNumber,
          shift__timecard__year: 2022
        }
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
