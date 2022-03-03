<template>
  <section>
    <div class="chart">
      <LineChart :data="data" :options="options" :height="400" />
    </div>
  </section>
</template>

<script>
import LineChart from '~/components/charts/LineChart.vue'
export default {
  components: { LineChart },

  data () {
    return {
      data: [],
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
    const data = await this.$charts.$get('timecard_image_usage')
    this.data = data
  }
}
</script>
