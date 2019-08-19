<template>
  <div>
    <section class="content-header">
      <h1>
        Ministry
        <small>Editing ministry</small>
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
            <div class="form-group col-md-6 col-lg-8">
              <label for="description">Nome:</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Nome">
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label>Destinado à:</label>
              <select class="form-control select2" id="gender" v-model="gender" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="gender">
                <option value="null" selected>Todos</option>
                <option value="male">Homens</option>
                <option value="female">Mulheres</option>
              </select>
            </div>
            <div class="form-group col-md-12">
              <label>Coordenadores:</label>
              <select class="form-control select2" id="coordinators" v-model="coordinators" data-value="" multiple="multiple" style="width: 100%;" data-placeholder="Selecione..." ref="coordinators">
              </select>
            </div>
            <div class="form-group col-md-12">
              <label for="description">Descriçāo:</label>
              <textarea class="form-control" id="description" v-model="description" rows="7" placeholder="Descriçāo"></textarea>
            </div>
          </div>
          <div class="box-footer">
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
      name: null,
      gender: null,
      description: null,
      coordinators: [],
      stored_members: []
    }
  },
  watch: {
    ministry (val, original) {
      this.id = val.id
      this.name = val.name
      this.description = val.description
      this.gender = val.gender
      this.coordinators = val.coordinators.map((value, index) => {
        return value['id']
      })

      switch (this.gender) {
        case 'male':
          $('#gender').val(this.gender).trigger('change')
          $("#gender option[value='female']").remove()
          break
        case 'female':
          $('#gender').val(this.gender).trigger('change')
          $("#gender option[value='male']").remove()
          break
        default:
          $('#gender').trigger('change')
          break
      }

      this.handleForm()
    },
    members (val, original) {
      val.forEach((el) => {
        this.stored_members.push({
          id: el.id,
          name: `${el.name} (${el.nickname})`
        })
      })

      this.handleForm()
    }
  },
  mounted () {
    $(document).ready(() => {
      $('.select2').select2().on('select2:select', function (e) {
        $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
      }).on('select2:unselect', function (e) {
        if ($(e.currentTarget).attr('id') === 'coordinators') {
          $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
        }
      })
    })
  },
  created () {
    this.$store.dispatch('getMinistry', {
      id: this.$route.params.id
    })
    this.$store.dispatch('loadMembers')
  },
  computed: {
    ...mapState(['ministry', 'members'])
  },
  methods: {
    checkForm: function () {
      this.gender = this.$refs.gender.dataset.value
      this.coordinators = this.$refs.coordinators.dataset.value.split(',')

      this.errors = []

      if (!this.name) {
        this.errors.push('Nome requerido.')
      }

      if (!this.description) {
        this.errors.push('Descrição requerido.')
      }

      if (this.coordinators.length === 0 || this.$refs.coordinators.dataset.value.length === 0) {
        this.errors.push('Ao menos um Coordenador é requerido.')
      }

      if (this.errors.length === 0) {
        return true
      }

      this.alert.title = 'Error!'
      this.alert.type = 'danger'
      this.alert.message = 'Errors were found. Please, solve them before proceed.'

      return false
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.checkForm()) {
        return false
      }

      const ministryData = {
        id: this.id,
        name: this.name,
        description: this.description,
        gender: this.gender === 'null' ? null : this.gender,
        coordinators: this.coordinators
      }

      this.$store.dispatch('updateMinistry', ministryData)
        .then(response => {
          this.errors = []
          this.alert.title = 'Success!'
          this.alert.type = 'success'
          this.alert.message = 'The ministry was updated successfuly.'
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
    },
    handleForm () {
      const self = this
      $(document).ready(() => {
        $('#coordinators').html('')
        self.stored_members.forEach((el) => {
          $('#coordinators').append(new Option(el.name, el.id, false, false)).val(-1).trigger('select')
        })
        $('#coordinators').attr('data-value', self.coordinators)
        $('#coordinators').val(self.coordinators).trigger('change')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  resize: none;
}
</style>
