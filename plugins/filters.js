import Vue from 'vue'
import moment from 'moment'

function date (date) {
  return date !== '' ? moment(date).format('LL') : ''
}

Vue.filter('date', date)
