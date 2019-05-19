import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    member_roles: [],
    member_status: [],
    members: [],
    member: null,
    coordinators: [],
    ministries: []
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
    setLoadedMinistries (state, payload) {
      state.ministries = payload
    }
  },
  actions: {
    loadMembers ({ commit }) {
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member`)
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
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/${payload.id}`)
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
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/role/listRolesByHierarchy/3`)
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
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/status`)
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
      axios.get(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/notallocatedcoordinators/${payload.ministry_id}`, {
        params: {
          gender: ['male', 'female'].includes(payload.gender) ? payload.gender : null
        }
      })
        .then((response) => {
          const coord = []
          const obj = response.data.data
          console.log(response.data.data)
          obj.map(item => {
            coord.push(item)
          })

          commit('setLoadedNotAllocatedCoordinators', coord)
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
              coordinator: item.coordinator.name
            })
          })

          commit('setLoadedMinistries', ministries)
        })
        .catch((error) => {
          console.log(error)
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

        axios.post(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member`, member)
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

        axios.put(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/${payload.id}`, member)
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

        axios.delete(`${process.env.VUE_APP_IRONHAND_BASE_URL}/api/member/${payload.id}`, member)
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
    loadedMinistries (state) {
      return state.ministries.sort((ministryA, ministryB) => {
        return ministryA.id > ministryB.id
      })
    }
  }
})
