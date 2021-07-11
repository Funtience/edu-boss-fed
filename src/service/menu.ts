/**
 * 菜单相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface SaveMenuParams {
  id?: number
  parentId: number
  name: string
  href: string
  icon: string
  orderNum: number
  description: string
  shown: boolean
}

interface GetRoleMenusPrams {
  roleId: string|number
}

interface allocateRoleMenusParams {
  roleId: string|number
  menuIdList: number[]
}

// 保存菜单
export const saveMenu = (params: SaveMenuParams) => {
  return request.post('/boss/menu/saveOrUpdate', params)
}

// 获取父级菜单列表
export const getEditMenuInfo = (id: string | number = -1) => {
  return request.get('/boss/menu/getEditMenuInfo', { params: { id } })
}

// 获取所有菜单列表
export const getAllMenus = () => {
  return request.get('/boss/menu/getAll')
}

// 删除菜单
export const delMenu = (id: number) => {
  return request.delete(`/boss/menu/${id}`)
}

// 获取菜单详情
export const getMenuDetail = (id: string | number) => {
  return request.delete(`/boss/menu/${id}`)
}

// 获取角色拥有的菜单列表
export const getRoleMenus = (params: GetRoleMenusPrams) => {
  return request.get('/boss/menu/getRoleMenus', { params })
}

// 获取树形菜单
export const getMenuNodeList = () => {
  return request.get('/boss/menu/getMenuNodeList')
}

// 给角色分配菜单
export const allocateRoleMenus = (params: allocateRoleMenusParams) => {
  return request.post('/boss/menu/allocateRoleMenus', params)
}
