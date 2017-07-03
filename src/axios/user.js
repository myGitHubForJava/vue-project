import axios from 'axios'
import isUndefined from 'lodash/isUndefined'

export function signIn (params = {}) {
  if (isUndefined(params.username)) {
    console.warn('缺少 username')
  }

  if (isUndefined(params.password)) {
    console.warn('缺少 password')
  }

  return axios({
    method: 'POST',
    url: '/login',
    data: {
      username: params.username,
      password: params.password
    }
  })
}
