import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import ListMember from '@/views/Member/List'
import CreateMember from '@/views/Member/Create'
import EditMember from '@/views/Member/Edit'
import ListMinistry from '@/views/Ministry/List'
import CreateMinistry from '@/views/Ministry/Create'
import EditMinistry from '@/views/Ministry/Edit'
import ListGroup from '@/views/Group/List'
import CreateGroup from '@/views/Group/Create'
import EditGroup from '@/views/Group/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/member',
      name: 'ListMembers',
      component: ListMember
    },
    {
      path: '/member/create',
      name: 'CreateMember',
      component: CreateMember
    },
    {
      path: '/member/edit',
      name: 'EditMember',
      component: EditMember
    },
    {
      path: '/ministry',
      name: 'ListMinistries',
      component: ListMinistry
    },
    {
      path: '/ministry/create',
      name: 'CreateMinistry',
      component: CreateMinistry
    },
    {
      path: '/ministry/edit',
      name: 'EditMinistry',
      component: EditMinistry
    },
    {
      path: '/group',
      name: 'ListGroups',
      component: ListGroup
    },
    {
      path: '/group/create',
      name: 'CreateGroup',
      component: CreateGroup
    },
    {
      path: '/group/edit',
      name: 'EditGroup',
      component: EditGroup
    }
  ]
})

