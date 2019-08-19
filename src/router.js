import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import ListMember from '@/views/Member/List'
import CreateMember from '@/views/Member/Create'
import EditMember from '@/views/Member/Edit'
import DeleteMember from '@/views/Member/Delete'
import ListMinistry from '@/views/Ministry/List'
import CreateMinistry from '@/views/Ministry/Create'
import EditMinistry from '@/views/Ministry/Edit'
import DeleteMinistry from '@/views/Ministry/Delete'
import ListGroup from '@/views/Group/List'
import CreateGroup from '@/views/Group/Create'
import EditGroup from '@/views/Group/Edit'
import DeleteGroup from '@/views/Group/Delete'
import GroupMember from '@/views/Group/Member'

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
      path: '/member/edit/:id',
      props: true,
      name: 'EditMember',
      component: EditMember
    },
    {
      path: '/member/delete/:id',
      props: true,
      name: 'DeleteMember',
      component: DeleteMember
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
      path: '/ministry/:id/edit',
      name: 'EditMinistry',
      component: EditMinistry
    },
    {
      path: '/ministry/:id/delete',
      props: true,
      name: 'DeleteMinistry',
      component: DeleteMinistry
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
      path: '/group/:ministry_id/:id/edit',
      name: 'EditGroup',
      component: EditGroup
    },
    {
      path: '/group/:ministry_id/:id/delete',
      props: true,
      name: 'DeleteGroup',
      component: DeleteGroup
    },
    {
      path: '/group/:ministry_id/:id/member',
      name: 'GroupMember',
      component: GroupMember
    }
  ]
})
