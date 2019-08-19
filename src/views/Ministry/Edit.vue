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
              <select class="form-control select2" id="coordinators" v-model="coordinators" multiple="multiple" style="width: 100%;" data-placeholder="Selecione..." ref="coordinators">
                <option value="test" selected>Todos</option>
                <option value="male">Homens</option>
                <option value="female">Mulheres</option>
                <option value="general">general</option>
                <option value="nothing">nothing</option>
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

      // this.leader = val.leader_id

      // this.$store.dispatch('getMember', {
      //   id: this.leader
      // })

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
    // const self = this
    $(document).ready(() => {
      $('.select2').select2().on('select2:select', function (e) {
        $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
        if ($(e.currentTarget).attr('id') === 'gender') {
          // $('#leader').html('')
          // self.getMembers({ gender: $(e.currentTarget).val() })
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

      if (this.name && this.description) {
        return true
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Nome requerido.')
      }

      if (!this.description) {
        this.errors.push('Descrição requerido.')
      }

      this.alert.title = 'Error!'
      this.alert.type = 'danger'
      this.alert.message = 'Errors were found. Please, solve them before proceed.'
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.checkForm()) {
        return false
      }

      // const ministryData = {
      //   name: this.name,
      //   description: this.description,
      //   gender: this.gender === 'null' ? null : this.gender,
      //   coordinators: [1]
      // }

      // this.$store.dispatch('createMinistry', ministryData)
      //   .then(response => {
      //     this.errors = []
      //     this.alert.title = 'Success!'
      //     this.alert.type = 'success'
      //     this.alert.message = 'The ministry was included successfuly.'
      //   }).catch(error => {
      //     this.errors = []

      //     if ('data' in error) {
      //       if ('message' in error.data) {
      //         Object.keys(error.data.message).map(key => {
      //           error.data.message[key].map(err => {
      //             this.errors.push(err)
      //           })
      //         })
      //       }
      //     }

      //     this.alert.title = 'Error!'
      //     this.alert.type = 'danger'

      //     if (this.errors.length) {
      //       this.alert.message = 'Errors were found. Please, solve them before proceed.'
      //     } else {
      //       this.alert.message = 'Errors were found. Please, try later.'
      //     }
      //   })
      // this.$router.push('/member')
    },
    handleForm () {
      const self = this
      $(document).ready(() => {
        $('#coordinators').html('')
        self.stored_members.forEach((el) => {
          $('#coordinators').append(new Option(el.name, el.id, false, false)).val(-1).trigger('select')
        })
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
