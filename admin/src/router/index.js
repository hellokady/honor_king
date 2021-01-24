import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'

import CategoryList from '../views/category/List'
import CategoryDetail from '../views/category/Detail'

import GoodsList from '../views/goods/List'
import GoodsDetail from '../views/goods/Detail'

import SkinsList from '../views/skins/List'
import SkinsDetail from '../views/skins/Detail'

import HerosList from '../views/heros/List'
import HerosDetail from '../views/heros/Detail'

Vue.use(VueRouter)

const routes = [
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
    ]
  },
 
]

const router = new VueRouter({
  routes
})

export default router
