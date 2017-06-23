import http from './http'

const namespace = 'template'

export default {
  [`${namespace}.listTemplates`] ({commit}, params) {
    return http.listTemplates(params)
  }
}
