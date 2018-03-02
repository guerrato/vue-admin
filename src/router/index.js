import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ListMember from '@/components/Member/List'
import CreateMember from '@/components/Member/Create'
import EditMember from '@/components/Member/Edit'
import ListMinistry from '@/components/Ministry/List'
import CreateMinistry from '@/components/Ministry/Create'
import EditMinistry from '@/components/Ministry/Edit'
import ListGroup from '@/components/Group/List'
import CreateGroup from '@/components/Group/Create'
import EditGroup from '@/components/Group/Edit'

Vue.use(Router)

export default new Router({
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
  ],
  mode: 'history'
})
