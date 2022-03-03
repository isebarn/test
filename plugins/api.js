function axios (axios, url) {
  const api = axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    },
    baseURL: url
  })
  api.setBaseURL(url)
  return api
}

export default function ({ $axios }, inject) {
  inject('api', axios($axios, process.env.AXIOS_API))
  inject('admin_operations', axios($axios, process.env.AXIOS_ADMIN_OPERATIONS))
  inject('csv_export', axios($axios, process.env.AXIOS_CSV_EXPORT))
  inject('charts', axios($axios, process.env.AXIOS_CHARTS))
}
