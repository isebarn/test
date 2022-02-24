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
}
