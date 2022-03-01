import Vue from 'vue'
import moment from 'moment'

function date (date) {
  return date !== '' ? moment(date).format('LL') : ''
}

function weekly (date) {
  return date !== '' ? moment(date).format('MMMM Do') : ''
}

Vue.filter('date', date)
Vue.filter('weekly', weekly)
