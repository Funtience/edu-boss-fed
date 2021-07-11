/**
 * 角色相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface GetRolePageParams {
  name: string
  current: number
  size: number
}

interface SaveRoleParams {
  id?: number
  code: string
  name: string
  description: string
  createdBy?: string
  updatedBy?: string
  createdTime?: string
  updatedTime?: string
  operatorId?: number
}

interface AllocateUserRolesParams {
  userId: number|string
  roleIdList: number[]
}

// 按条件查询角色
export const getRolePage = (params: GetRolePageParams) => {
  return request.post('/boss/role/getRolePages', params)
}

// 保存角色
export const saveOrUpdateRole = (params: SaveRoleParams) => {
  return request.post('/boss/role/saveOrUpdate', params)
}

// 获取角色详情
export const getRoleInfo = (id: string) => {
  return request.get(`/boss/role/${id}`)
}

// 获取所有角色
export const getAllRole = () => {
  return request.get('/boss/role/all')
}

// 获取用户角色
export const getUserRole = (userId: string) => {
  return request.get(`/boss/role/user/${userId}`)
}

// 给用户分配角色
export const allocateUserRoles = (params: AllocateUserRolesParams) => {
  return request.post('/boss/role/allocateUserRoles', params)
}
