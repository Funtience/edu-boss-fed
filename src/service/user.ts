/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export interface ResData {
  content: string
  message: string
  state: number
  success: boolean
}

interface GetUserPagesParams {
  currentPage: number
  pageSize: number
  phone?: string
  userId?: number
  startCreateTime?: string
  endCreateTime?: string
}

interface OperateUser {
  userId: string
}

// 登录
export const login = (params: User) => {
  return request({
    method: 'post',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params)
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/front/user/getInfo')
}

// 登出
export const logout = () => {
  return request.post('/front/user/logout')
}

// 分页查询用户信息
export const getUserPages = (params: GetUserPagesParams) => {
  return request.post('/boss/user/getUserPages', params)
}

// 启用用户
export const enableUser = (params: OperateUser) => {
  return request.get('/boss/user/enableUser', { params })
}

// 封禁用户
export const forbidUser = (params: OperateUser) => {
  return request.post('/boss/user/forbidUser', params)
}
