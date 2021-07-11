import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
          )
      },
      {
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () =>
          import(
            /* webpackChunkName: 'course-create' */ '@/views/course/create.vue'
          )
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () =>
          import(
            /* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () =>
          import(
            /* webpackChunkName: 'course-section' */ '@/views/course/section.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () =>
          import(
            /* webpackChunkName: 'course-video' */ '@/views/course/video.vue'
          ),
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'
          )
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'
          )
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          )
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'
          ),
        meta: { requireAuth: true },
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-resource' */ '@/views/role/alloc-resource.vue'
          ),
        meta: { requireAuth: true },
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/error-page/index.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫: 任何页面的访问都要经过这里
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          from: to.path
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
