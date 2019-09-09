<template>
  <div>
    <section class="content-header">
      <h1>
        Members
        <small>Inclusão no ministeerio</small>
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
            <div class="form-group col-md-6">
              <label for="name">Nome Completo:</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Nome" disabled>
            </div>
            <div class="form-group col-md-6">
              <label for="email">E-mail:</label>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="alguem@exemplo.com" disabled>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="form-group col-md-6 col-lg-4">
                  <label for="nickname">Apelido:</label>
                  <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="Apelido" disabled>
                </div>
                <div class="form-group col-md-6 col-lg-4">
                  <label for="birthdate">Nascido em:</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="birthdate" disabled>
                  </div>
                </div>
                <div class="form-group col-md-6 col-lg-4">
                  <label>Gênero:</label>
                  <select class="form-control select2" id="gender" v-model="gender" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="gender" disabled>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Telefone:</label>
                  <input type="text" class="form-control" id="phone" v-model="phone" placeholder="Telefone" disabled>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">WhatsApp:</label>
                  <input type="text" class="form-control" id="whatsapp" v-model="whatsapp" placeholder="WhatsApp" disabled>
                </div>
                <div class="form-group col-xs-12">
                  <label for="name">Facebook:</label>
                  <input type="text" class="form-control" id="facebook" v-model="facebook" placeholder="Facebook" disabled>
                </div>
                <div class="form-group col-md-6">
                  <label>Responsabilidade:</label>
                  <select class="form-control select2" id="role" v-model="role" data-value="" :value="role" style="width: 100%;" data-placeholder="Selecione..." ref="role">
                    <option v-for="rl in member_roles" v-bind:key="rl.id" v-bind:value="rl.id">
                      {{ rl.description }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label>Status:</label>
                  <select class="form-control select2" id="status" v-model="status" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="status" disabled>
                    <option v-for="st in member_status" v-bind:key="st.id" v-bind:value="st.id">
                      {{ st.description }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="image">Foto:</label>
              <div class="input-group form-control picture" :style="imageStyle">
              </div>
            </div>
          </div>
          <div class="box-footer">
            <router-link class="btn btn-default" to="/member">Voltar</router-link>
            <button type="submit" class="btn btn-primary pull-right">Salvar</button>
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
      email: null,
      nickname: null,
      birthdate: null,
      gender: null,
      phone: null,
      whatsapp: null,
      facebook: null,
      role: null,
      status: null,
      image_name: null,
      image: null,
      imageStyle: {
        backgroundImage: null,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  watch: {
    member (val, original) {
      this.id = val.id
      this.name = val.name
      this.email = val.email
      this.nickname = val.nickname
      this.birthdate = val.birthdate
      this.gender = val.gender
      this.phone = val.phone
      this.whatsapp = val.whatsapp
      this.facebook = val.facebook
      this.role = val.role_id
      this.status = val.status_id
      this.image_name = val.image_name
      if (val.image) {
        this.image = `${process.env.VUE_APP_IRONHAND_BASE_URL}/storage${val.image}`
        this.imageStyle.backgroundImage = `url('${this.image}')`
      }
      this.handleForm()
    },
    member_roles (val, original) {
      this.handleForm()
    },
    member_status (val, original) {
      this.handleForm()
    }
  },
  mounted () {
    $(document).ready(() => {
      $('.select2').select2().on('change', function (e) {
        $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
      })

      $('#birthdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
      $('#birthdate').focusout(() => {
        this.birthdate = $('#birthdate').val()
      })
    })
  },
  created () {
    this.$store.dispatch('loadMemberRolesByHierarchy')
    this.$store.dispatch('loadMemberStatus')
    this.$store.dispatch('getMember', { id: this.$route.params.id })
  },
  computed: {
    member_roles () {
      let result = []
      let data = this.$store.getters.loadedMemberRoles

      data.map(el => {
        result.push(el)
      })
      return result
    },
    member_status () {
      let result = []
      let data = this.$store.getters.loadedMemberStatus

      data.map(el => {
        result.push(el)
      })
      return result
    },
    ...mapState(['member'])
  },
  methods: {
    checkForm: function () {
      this.role = this.$refs.role.dataset.value
      this.status = this.$refs.status.dataset.value

      if (this.name && this.gender && this.role && this.status) {
        return true
      }

      this.errors = []

      if (!this.role) {
        this.errors.push('Responsabilidade requerido.')
      }

      if (!this.status) {
        this.errors.push('Status requerido.')
      }

      this.alert.title = 'Error!'
      this.alert.type = 'danger'
      this.alert.message = 'Errors were found. Please, solve them before proceed.'
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.checkForm()) {
        return
      }

      const memberData = {
        id: this.id,
        role_id: this.role
      }

      this.$store.dispatch('addMemberInMinistry', memberData)
        .then(response => {
          this.errors = []
          this.alert.title = 'Success!'
          this.alert.type = 'success'
          this.alert.message = 'The member was updated successfuly.'
        }).catch(error => {
          this.errors = []

          if ('data' in error) {
            if ('message' in error.data) {
              if (typeof error.data.message !== 'string') {
                Object.keys(error.data.message).map(key => {
                  error.data.message[key].map(err => {
                    this.errors.push(err)
                  })
                })
              } else {
                this.errors.push(error.data.message)
              }
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
    },
    handleForm () {
      $(document).ready(() => {
        $('#gender').val(this.gender).trigger('change')
        $('#role').val(this.role).trigger('change')
        $('#status').val(this.status).trigger('change')

        if (this.birthdate) {
          $('#birthdate').val(this.birthdate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3$2$1')).inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
          $('#birthdate').focusout(() => {
            this.birthdate = $('#birthdate').val()
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .picture {
    padding: 0;
    max-width: 360px;
    height: 360px;

  }
</style>
