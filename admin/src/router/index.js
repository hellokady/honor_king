import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'

import Login from '../views/login'

import CategoryList from '../views/category/List'
import CategoryDetail from '../views/category/Detail'

import GoodsList from '../views/goods/List'
import GoodsDetail from '../views/goods/Detail'

import SkinsList from '../views/skins/List'
import SkinsDetail from '../views/skins/Detail'

import HerosList from '../views/heros/List'
import HerosDetail from '../views/heros/Detail'

import ArticlesList from '../views/articles/List'
import ArticlesDetail from '../views/articles/Detail'

import AdList from '../views/ads/List'
import AdDetail from '../views/ads/Detail'

import AdminUsersList from '../views/admin_users/List'
import AdminUsersDetail from '../views/admin_users/Detail'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/category/create', name: 'category_create', component: CategoryDetail },
      { path: '/category/edit/:id', name: 'category_edit', component: CategoryDetail, props: true },
      { path: '/category/list', name: 'category_list', component:  CategoryList },

      { path: '/goods/create', name: 'goods_create', component: GoodsDetail },
      { path: '/goods/edit/:id', name: 'goods_edit', component: GoodsDetail, props: true },
      { path: '/goods/list', name: 'goods_list', component:  GoodsList },

      { path: '/skins/create', name: 'skins_create', component: SkinsDetail },
      { path: '/skins/edit/:id', name: 'skins_edit', component: SkinsDetail, props: true },
      { path: '/skins/list', name: 'skins_list', component:  SkinsList },

      { path: '/heros/create', name: 'heros_create', component: HerosDetail },
      { path: '/heros/edit/:id', name: 'heros_edit', component: HerosDetail, props: true },
      { path: '/heros/list', name: 'heros_list', component:  HerosList },

      { path: '/articles/create', name: 'articles_create', component: ArticlesDetail },
      { path: '/articles/edit/:id', name: 'articles_edit', component: ArticlesDetail, props: true },
      { path: '/articles/list', name: 'articles_list', component:  ArticlesList },
    
      { path: '/ads/create', name: 'ad_create', component: AdDetail },
      { path: '/ads/edit/:id', name: 'ad_edit', component: AdDetail, props: true },
      { path: '/ads/list', name: 'ad_list', component:  AdList },

      { path: '/admin_users/create', name: 'admin_users_create', component: AdminUsersDetail },
      { path: '/admin_users/edit/:id', name: 'admin_users_edit', component: AdminUsersDetail, props: true },
      { path: '/admin_users/list', name: 'admin_users_list', component:  AdminUsersList },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
