/**
 * 课程相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface getQueryCoursesParams {
  currentPage: number
  pageSize: number
  courseName?: string
  status?: number
}

interface changeStateParams {
  courseId: string
  status: string | number
}

// 分页查询课程列表
export const getQueryCourses = (params: getQueryCoursesParams) => {
  return request.post('/boss/course/getQueryCourses', params)
}

// 课程上下架
export const changeState = (params: changeStateParams) => {
  return request.get('/boss/course/changeState', { params })
}

// 保存或者更新课程信息
export const saveOrUpdateCourse = (params: any) => {
  return request.post('/boss/course/saveOrUpdateCourse', params)
}

// 图片上传
export const upload = (
  params: any,
  onUploadProgress?: (progressEvent: any) => void
) => {
  return request.post('/boss/course/upload', params, { onUploadProgress })
}

// 根据ID获取课程详情
export const getCourseById = (params: any) => {
  return request.get('/boss/course/getCourseById', { params })
}

// 根据ID获取课程详情
export const getSectionAndLesson = (params: any) => {
  return request.get('/boss/course/section/getSectionAndLesson', { params })
}

// 根据ID获取课程详情
export const saveOrUpdateSection = (params: any) => {
  return request.post('/boss/course/section/saveOrUpdateSection', params)
}

// 根据ID获取课程详情
export const saveOrUpdateLesson = (params: any) => {
  return request.post('/boss/course/lesson/saveOrUpdate', params)
}

// 获取阿里云图片上传token
export const getImageUploadAuthToken = () => {
  return request.get('/boss/course/upload/aliyunImagUploadAddressAdnAuth.json')
}

// 获取阿里云视频上传token
export const getVideoUploadAuthToken = (params: any) => {
  return request.get(
    '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    { params }
  )
}

// 转码进度
export const aliyunTransCodePercent = (lessonId: any) => {
  return request.get('/boss/course/upload/aliyunTransCodePercent.json', {
    params:{lessonId}
  })
}

// 转码请求
export const aliyunTransCode = (params: any) => {
  return request.post('/boss/course/upload/aliyunTransCode.json', params)
}
