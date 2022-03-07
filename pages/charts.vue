<template>
  <section>
    <div class="chart">
      <LineChart :data="timecardImageUsage" :options="options" :height="400" />
    </div>
    <div class="chart">
      <LineChart :data="dataEntryUsageType" :options="options" :height="400" />
    </div>
  </section>
</template>

<script>
import LineChart from '~/components/charts/LineChart.vue'
export default {
  components: { LineChart },

  data () {
    return {
      timecardImageUsage: [],
      dataEntryUsageType: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },

  async fetch () {
    const timecardImageUsage = await this.$charts.$get('timecard_image_usage')
    this.timecardImageUsage = timecardImageUsage

    const dataEntryUsageType = await this.$charts.$get('data_entry_usage_type')
    this.dataEntryUsageType = dataEntryUsageType
  }
}
</script>
