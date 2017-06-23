import axios from '../../axios/axios'

export default {
  listTemplates (params = {}) {
    return axios({
      method: 'get',
      url: '/templates',
      params
    })
  }
}
