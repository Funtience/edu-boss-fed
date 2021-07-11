import axios, { AxiosError } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
})

const codeMsg: { [key: number]: string } = {
  401: '登录失效, 请重新登录',
  403: '没有权限, 请联系管理员',
  404: '找不到该资源',
  500: '服务器错误',
  502: '网关错误',
  504: '网关超时'
}

export interface ResData {
  content: string
  message: string
  state: number
  success: boolean
}

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      from: router.currentRoute.path
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'post',
    url: '/front/user/refresh_token',
    data: qs.stringify({ refreshtoken: store.state.user.refresh_token })
  })
}

let isRefreshing = false
let requests: any[] = [] // 存储刷新 token 期间过来的 401 请求
async function handleResponseError (error: AxiosError) {
  if (error.response) {
    if (error.response.status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true
        refreshToken()
          .then(res => {
            if (!res.data.success) {
              throw new Error('刷新 token 失败')
            }
            store.commit('setUser', res.data.content)
            requests.forEach(req => req())
            requests = []
            return request(error.config)
          })
          .catch(() => {
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false
          })
      }
      // 请求挂起
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    }
    Message.error(codeMsg[error.response.status])
  } else if (error.request) {
    Message.error('请求超时, 请刷新重试')
  } else {
    Message.error(`请求失败: ${error.message}`)
  }
}

request.interceptors.request.use(config => {
  Object.assign(config.headers, {
    Authorization: store.state.user?.access_token
  })
  return config
})

request.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },

  error => {
    return handleResponseError(error)
  }
)

export default request
