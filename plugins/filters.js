import Vue from 'vue'

Vue.filter('time', function(value = '') {
  if (value === '') {
    return ''
  }
  const minutes = Math.floor(value / 60)
  const seconds = value - minutes * 60
  return `${padTime(minutes)}:${padTime(seconds)}`
})

function padTime(time) {
  return (time < 10 ? '0' : '') + time
}
