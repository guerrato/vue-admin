<template>
  <div>
    <section class="content-header">
      <h1>
        Group
        <small>Members in group</small>
      </h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <v-alert :title="alert.title" :type="alert.type" v-if="alert.message">
          <p>{{ alert.message }}</p>
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </v-alert>
        </div>
        <div class="col-md-6">
          <v-box type="default">
            <div class="box-header with-border">
              <h3 class="box-title">Not Allocated</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <v-draggable class="products-list product-list-in-box" :list="notAlocated" group="members">
                <div class="item" v-for="(member) in notAlocated" :key="member.id" :id="member.id">
                  <div class="product-img">
                    <img v-if="member.image" :src="member.image" width="50" height="50" :alt="member.name">
                    <img v-else src="/img/default-50x50.gif" width="50" height="50" :alt="member.name">
                  </div>
                  <div class="product-info">
                    <a href="javascript:void(0)" class="product-title">{{ member.name }}
                      <span v-if="member.gender == 'male'" class="label label-info pull-right">Homem</span>
                      <span v-else class="label label-info bg-maroon-active pull-right">Mulher</span>
                    </a>
                    <span class="product-description">
                      {{ member.name }}
                    </span>
                  </div>
                </div>
              </v-draggable>
            </div>
          </v-box>
        </div>
        <div class="col-md-6">
          <v-box type="primary">
            <div class="box-header with-border">
              <h3 class="box-title">Allocated</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <v-draggable class="products-list product-list-in-box" :list="allocated" group="members" :move="checkIsLeader">
                <div class="item" v-for="(member) in allocated" :key="member.id" :id="member.id">
                  <div class="product-img">
                    <img v-if="member.image" :src="member.image" width="50" height="50" :alt="member.name">
                    <img v-else src="/img/default-50x50.gif" width="50" height="50" :alt="member.name">
                  </div>
                  <div class="product-info">
                    <a href="javascript:void(0)" class="product-title">{{ member.name }}
                      <span v-if="member.id == group.leader_id" class="label label-info bg-black-active pull-right">Leader</span>
                      <span v-else-if="member.gender == 'male'" class="label label-info pull-right">Homem</span>
                      <span v-else class="label label-info bg-maroon-active pull-right">Mulher</span>
                    </a>
                    <span class="product-description">
                      {{ member.name }}
                    </span>
                  </div>
                </div>
              </v-draggable>
            </div>
          </v-box>
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary pull-right" @click="submit">Salvar</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      alert: {
        title: null,
        type: 'default',
        message: null
      },
      ministry_id: null,
      notAlocated: [],
      allocated: []
    }
  },
  watch: {
    group (val, original) {
      this.$store.dispatch('loadNotAllocatedMembers', {
        ministry_id: this.$route.params.ministry_id,
        gender: val.gender ? val.gender : null
      })
      this.$store.dispatch('loadAllocatedMembers', {
        ministry_id: this.$route.params.ministry_id,
        id: this.$route.params.id
      })
    },
    members_not_allocated (val, original) {
      this.notAlocated = val.map(el => {
        return {
          id: el.id,
          name: el.name,
          gender: el.gender,
          nickname: el.nickname,
          image: el.image ? `${process.env.VUE_APP_IRONHAND_BASE_URL}/storage${el.image}` : null
        }
      })
    },
    group_members (val, original) {
      this.allocated = val.map(el => {
        return {
          id: el.id,
          name: el.name,
          gender: el.gender,
          nickname: el.nickname,
          image: el.image ? `${process.env.VUE_APP_IRONHAND_BASE_URL}/storage${el.image}` : null
        }
      })
    }
  },
  created () {
    return this.$store.dispatch('getGroup', {
      ministry_id: this.$route.params.ministry_id,
      id: this.$route.params.id
    })
  },
  computed: {
    ...mapState(['group', 'members_not_allocated', 'group_members'])
  },
  methods: {
    checkIsLeader: function (e) {
      if (parseInt(e.dragged.id) === this.group.leader_id) {
        return false
      }
    },
    submit (e) {
      e.preventDefault()

      const groupData = {
        id: this.group.id,
        members: this.allocated,
        ministry: 1
      }

      this.$store.dispatch('arrangeMembers', groupData)
        .then(response => {
          this.errors = []
          this.alert.title = 'Success!'
          this.alert.type = 'success'
          this.alert.message = 'The group was included successfuly.'
        }).catch(error => {
          this.errors = []

          if ('data' in error) {
            if ('message' in error.data) {
              Object.keys(error.data.message).map(key => {
                error.data.message[key].map(err => {
                  this.errors.push(err)
                })
              })
            }
          }

          this.alert.title = 'Error!'
          this.alert.type = 'danger'

          if (this.errors.length) {
            this.alert.message = 'Errors were found. Please, solve them before proceed.'
          } else {
            this.alert.message = 'Errors were found. Please, try later.'
          }
        })
      // this.$router.push('/member')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
