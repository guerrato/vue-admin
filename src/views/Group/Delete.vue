<template>
  <div>
    <section class="content-header">
      <h1>
        Group
        <small>Exclusão de grupo</small>
      </h1>
    </section>

    <section class="content">
      <v-box>
        <v-alert :title="alert.title" :type="alert.type" v-if="alert.message">
          <p>{{ alert.message }}</p>
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </v-alert>
        <form @submit="submitForm">
          <div class="box-body">
            <div class="form-group col-md-12">
              <p for="name">The following group will be permanently deleted. Deleted group data cannot be recovered.<br> Please, if you are sure, type "<b>{{ this.refenrece }}</b>" to confirm:</p>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Nome">
            </div>
          </div>
          <div class="box-footer">
            <router-link class="btn btn-default" to="/group">Cancel</router-link>
            <button type="submit" class="btn btn-danger pull-right" v-if="this.name === this.refenrece">Delete</button>
          </div>
        </form>
      </v-box>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      errors: [],
      alert: {
        title: null,
        type: 'default',
        message: null
      },
      id: null,
      name: null,
      refenrece: ''
    }
  },
  watch: {
    group (val, original) {
      this.id = val.id
      this.refenrece = val.description
    }
  },
  created () {
    this.$store.dispatch('getGroup', {
      id: this.$route.params.id,
      ministry_id: this.$route.params.ministry_id
    })
  },
  computed: {
    ...mapState(['group'])
  },
  methods: {
    checkForm: function () {
      if (this.name && this.name === this.refenrece) {
        return true
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Nome requerido.')
      } else {
        if (this.name !== this.refenrece) {
          this.errors.push('The name does not match.')
        }
      }

      return false
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.checkForm()) {
        return
      }

      const groupData = {
        id: this.id
      }

      this.$store.dispatch('deleteGroup', groupData)
        .then(response => {
          this.errors = []
          this.alert.title = 'Success!'
          this.alert.type = 'success'
          this.alert.message = 'The group was deleted successfuly.'
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
