import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    members: []
  },
  mutations: {
    setLoadedMembers (state, payload) {
      state.members = payload
    },
    createMeetup (state, payload) {
      state.members.push(payload)
    }
  },
  actions: {
    loadMembers ({commit}) {
      axios.get('//ironhand.ludlum.lo/api/member')
        .then((response) => {
          const members = []
          const obj = response.data.data

          for (let key in obj) {
            members.push({
              id: key,
              name: obj[key].name,
              email: obj[key].email,
              nickname: obj[key].nickname,
              birthdate: obj[key].birthdate,
              gender: obj[key].gender,
              phone: obj[key].phone,
              whatsapp: obj[key].whatsapp,
              facebook: obj[key].facebook,
              role: obj[key].role,
              status: obj[key].status,
              image: obj[key].image
            })
          }

          commit('setLoadedMembers', members)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMember ({commit, getters}, payload) {
      // const member = {
      //   name: payload.name,
      //   email: payload.email,
      //   nickname: payload.nickname,
      //   birthdate: payload.birthdate,
      //   gender: payload.gender,
      //   phone: payload.phone,
      //   whatsapp: payload.whatsapp,
      //   facebook: payload.facebook,
      //   role: payload.role,
      //   status: payload.status,
      //   image: payload.image
      // }

      //   firebase.database().ref('meetups').push(meetup)
      //     .then((data) => {
      //       key = data.key

      //       return key
      //     })
      //     .then(key => {
      //       const filename = payload.image.name
      //       const ext = filename.slice(filename.lastIndexOf('.'))

      //       return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      //     })
      //     .then(fileData => {
      //       imageUrl = fileData.metadata.downloadURLs[0]
      //       return firebase.database().ref('meetups').child(key).update({
      //         imageUrl: imageUrl
      //       })
      //     })
      //     .then(() => {
      //       commit('createMeetup', {
      //         ...meetup,
      //         imageUrl: imageUrl,
      //         id: key
      //       })
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
      //   console.log(member)
    }
  },
  getters: {
    loadedMembers (state) {
      return state.members.sort((memberA, memberB) => {
        return memberA.id > memberB.id
      })
    }
  }
})
