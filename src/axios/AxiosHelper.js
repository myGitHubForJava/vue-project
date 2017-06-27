import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
import router from '../router'
import store from '../store'

export default class AxiosHelper extends BaseAxiosHelper {
  config () {
    return {
      baseURL: env.get('API'),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.state.user.token.token}`
      }
    }
  }

  error401 (error) {
    super.$error401(error)
    router.push({ name: 'signIn' })
  }

  error404 (error) {
    super.$error404(error)
  }
}
