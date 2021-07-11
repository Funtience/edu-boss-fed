/**
 * 资源相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface GetResourcePagesParams {
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: number | null
  endCreateTime?: string
  current?: number
  size?: number
}

interface RoleResourcesPrams {
  roleId: string | number
  resourceIdList?: number[]
}

// 获取资源分类列表
export const getResourceCategory = () => {
  return request.get('/boss/resource/category/getAll')
}

// 获取资源列表
export const getResourceAll = () => {
  return request.get('/boss/resource/getAll')
}

// 获取资源分类列表
export const getResourcePages = (params: GetResourcePagesParams) => {
  return request.post('/boss/resource/getResourcePages', params)
}

// 获取角色资源列表
export const getRoleResources = (params: RoleResourcesPrams) => {
  return request.get('/boss/resource/getRoleResources', { params })
}

// 给角色分配列表
export const allocateRoleResources = (params: RoleResourcesPrams) => {
  return request.post('/boss/resource/allocateRoleResources', params)
}
