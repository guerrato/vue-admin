import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    member_roles: [],
    member_status: [],
    members: [],
    members_not_allocated: [],
    group_members: [],
    member: null,
    coordinators: [],
    ministries: [],
    groups: [],
    group: null
  },
  mutations: {
    setLoadedMemberRoles (state, payload) {
      state.member_roles = payload
    },
    setLoadedMemberStatus (state, payload) {
      state.member_status = payload
    },
    setLoadedMembers (state, payload) {
      state.members = payload
    },
    setGottenMember (state, payload) {
      state.member = payload
    },
    setLoadedNotAllocatedCoordinators (state, payload) {
      state.coordinators = payload
    },
    setLoadedNotAllocatedMembers (state, payload) {
      state.members_not_allocated = payload
    },
    setLoadedAllocatedMembers (state, payload) {
      state.group_members = payload
    },
    setLoadedMinistries (state, payload) {
      state.ministries = payload
    },
    setLoadedGroups (state, payload) {
      state.groups = payload
    },
    setGottenGroup (state, payload) {
      state.group = payload
    }
  },
  actions: {
    loadMembers ({ commit }) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member`)
        .then((response) => {
          const members = []
          const obj = response.data.data

          obj.forEach(item => {
            members.push({
              id: item.id,
              name: item.name,
              email: item.email,
              nickname: item.nickname,
              birthdate: item.birthdate,
              gender: item.gender,
              phone: item.phone,
              whatsapp: item.whatsapp,
              facebook: item.facebook,
              role: item.role,
              status: item.status,
              image: item.image,
              image_name: item.image_name
            })
          })

          commit('setLoadedMembers', members)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMember ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member/${payload.id}`)
        .then((response) => {
          let member = null
          const obj = response.data.data

          member = {
            id: obj.id,
            name: obj.name,
            email: obj.email,
            nickname: obj.nickname,
            birthdate: obj.birthdate,
            gender: obj.gender,
            phone: obj.phone,
            whatsapp: obj.whatsapp,
            facebook: obj.facebook,
            role_id: obj.role_id,
            status_id: obj.status_id,
            image: obj.image,
            image_name: obj.image_name
          }

          commit('setGottenMember', member)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadMemberRolesByHierarchy ({ commit }) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member/role/4/listrolesbyhierarchy`)
        .then((response) => {
          const roles = []
          const obj = response.data.data

          obj.forEach(item => {
            roles.push({
              id: item.id,
              description: item.description,
              slug: item.slug
            })
          })

          commit('setLoadedMemberRoles', roles)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadMemberStatus ({ commit }) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member/status`)
        .then((response) => {
          const status = []
          const obj = response.data.data

          obj.map(item => {
            status.push(item)
          })

          commit('setLoadedMemberStatus', status)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadNotAllocatedCoordinators ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry_id}/member/notallocatedcoordinators`, {
        params: {
          gender: ['male', 'female'].includes(payload.gender) ? payload.gender : null
        }
      })
        .then((response) => {
          const coord = []
          const obj = response.data.data
          obj.map(item => {
            coord.push(item)
          })

          commit('setLoadedNotAllocatedCoordinators', coord)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadNotAllocatedMembers ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry_id}/member/notallocatedmembers`, {
        params: {
          gender: ['male', 'female'].includes(payload.gender) ? payload.gender : null
        }
      })
        .then((response) => {
          const members = []
          const obj = response.data.data
          obj.map(item => {
            members.push(item)
          })

          commit('setLoadedNotAllocatedMembers', members)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadAllocatedMembers ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry_id}/group/${payload.id}/getmembers`)
        .then((response) => {
          const members = []
          const obj = response.data.data
          obj.map(item => {
            members.push(item)
          })

          commit('setLoadedAllocatedMembers', members)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadMinistries ({ commit }) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry`)
        .then((response) => {
          const ministries = []
          const obj = response.data.data

          obj.forEach(item => {
            ministries.push({
              id: item.id,
              name: item.name,
              description: item.description,
              gender: item.required_gender
            })
          })

          commit('setLoadedMinistries', ministries)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMinistry ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const ministry = {
          name: payload.name,
          description: payload.description,
          required_gender: payload.gender,
          coordinators: payload.coordinators
        }

        axios.post(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry`, ministry)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    createMember ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const member = {
          name: payload.name,
          email: payload.email,
          nickname: payload.nickname,
          birthdate: payload.birthdate,
          gender: payload.gender,
          phone: payload.phone,
          whatsapp: payload.whatsapp,
          facebook: payload.facebook,
          role_id: payload.role_id,
          status_id: payload.status_id,
          image: payload.image,
          image_name: payload.image_name
        }

        if (member.birthdate != null) {
          if (member.birthdate.trim() !== '') {
            member.birthdate = member.birthdate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')
          }
        }

        axios.post(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member`, member)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateMember ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const member = {
          name: payload.name,
          email: payload.email,
          nickname: payload.nickname,
          birthdate: payload.birthdate,
          gender: payload.gender,
          phone: payload.phone,
          whatsapp: payload.whatsapp,
          facebook: payload.facebook,
          role_id: payload.role_id,
          status_id: payload.status_id,
          image: payload.image,
          image_name: payload.image_name
        }

        if (member.birthdate != null) {
          if (member.birthdate.trim() !== '') {
            member.birthdate = member.birthdate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')
          }
        }

        axios.put(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member/${payload.id}`, member)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteMember ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const member = {
          name: payload.name
        }

        axios.delete(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/1/member/${payload.id}`, member)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    loadGroups ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry}/group/groupsofministry`)
        .then((response) => {
          let groups = null
          const obj = response.data.data

          groups = obj.map(el => {
            return {
              id: el.id,
              description: el.description,
              leader: {
                name: el.leader.name,
                image: el.leader.image
              },
              gender: el.required_gender
            }
          })

          commit('setLoadedGroups', groups)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createGroup ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const group = {
          description: payload.description,
          leader_id: payload.leader,
          required_gender: payload.gender,
          ministry_id: payload.ministry
        }

        axios.post(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry}/group`, group)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getGroup ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry_id}/group/${payload.id}`)
        .then((response) => {
          let group = null
          const obj = response.data.data

          group = {
            id: obj.id,
            description: obj.description,
            slug: obj.slug,
            gender: obj.required_gender,
            ministry: obj.ministry_id,
            leader_id: obj.leader_id
          }

          commit('setGottenGroup', group)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    arrangeMembers ({ commit, getters }, payload) {
      const members = payload.members.map(i => {
        return i.id
      })
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry}/group/${payload.id}/arrangemembers`, {
          members: members
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteGroup ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry_id}/group/${payload.id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateGroup ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        const group = {
          description: payload.description,
          leader_id: payload.leader,
          required_gender: payload.gender,
          ministry_id: payload.ministry
        }

        axios.put(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/ministry/${payload.ministry}/group/${payload.id}`, group)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    loadedMembers (state) {
      return state.members.sort((memberA, memberB) => {
        return memberA.id > memberB.id
      })
    },
    gottenMember (state) {
      return state.member
    },
    loadedMemberRoles (state) {
      return state.member_roles.sort((roleA, roleB) => {
        return roleA.id > roleB.id
      })
    },
    loadedMemberStatus (state) {
      return state.member_status.sort((statusA, statusB) => {
        return statusA.id > statusB.id
      })
    },
    loadedNotAllocatedCoordinators (state) {
      return state.coordinators.sort((coordA, coordB) => {
        return coordA.id > coordB.id
      })
    },
    loadedNotAllocatedMembers (state) {
      return state.members_not_allocated.sort((memberA, memberB) => {
        return memberA.id > memberB.id
      })
    },
    loadedAllocatedMembers (state) {
      return state.group_members.sort((memberA, memberB) => {
        return memberA.id > memberB.id
      })
    },
    loadedMinistries (state) {
      return state.ministries.sort((ministryA, ministryB) => {
        return ministryA.id > ministryB.id
      })
    },
    loadedGroups (state) {
      return state.groups.sort((groupA, groupB) => {
        return groupA.id > groupB.id
      })
    },
    gottenGroup (state) {
      return state.group
    }
  }
})
