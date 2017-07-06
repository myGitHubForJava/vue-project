import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'
import router from '../router'
import Message from 'vue-human/utils/Message'

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.config.url.indexOf('login') > -1) {
    return Promise.reject(error)
  }

  if (error.response) {
    if (error.response.status === 401) {
      console.log(1111)
      Message.create({type: 'error', message: error.response.data.message}).show()
      router.push({name: 'signIn'})
    } else {
      Message.create({type: 'error', message: error.response.data.message}).show()
    }
  } else {
    Message.create({type: 'error', message: '服务可能断掉了哦,建议稍后重试'}).show()
  }
  return Promise.reject(error)
})

export default function (config) {
  return axios({
    ...{
      baseURL: Vue.env.get('API'),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.state.user.token.token}`
      }
    },
    ...config
  })
}
