<template>
  <div>
    <section class="content-header">
      <h1>
        Group
        <small>Editing group</small>
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
              <label for="description">Descriçāo:</label>
              <input type="text" class="form-control" id="description" v-model="description" placeholder="Descriçāo">
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label>Destinado à:</label>
              <select class="form-control select2" id="gender" v-model="gender" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="gender">
                <option value="null" selected>Geral</option>
                <option value="male">Homens</option>
                <option value="female">Mulheres</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>Líder:</label>
              <select class="form-control select2" id="leader" v-model="leader" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="leader"></select>
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
      id: null,
      description: null,
      gender: null,
      leader: null,
      leader_name: null
    }
  },
  watch: {
    coordinators (val, original) {
      this.handleForm()
    },
    group (val, original) {
      this.id = val.id
      this.description = val.description
      this.gender = val.gender
      this.leader = val.leader_id

      this.$store.dispatch('getMember', {
        id: this.leader
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
    },
    member (val, original) {
      this.leader_name = val.name

      this.getCoordinators({ gender: this.gender })
    }
  },
  mounted () {
    const self = this
    $(document).ready(() => {
      $('.select2').select2().on('select2:select', function (e) {
        $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
        if ($(e.currentTarget).attr('id') === 'gender') {
          $('#leader').html('')
          self.getCoordinators({ gender: $(e.currentTarget).val() })
        }
      })
    })
  },
  created () {
    this.$store.dispatch('getGroup', {
      id: this.$route.params.id,
      ministry_id: this.$route.params.ministry_id
    })
  },
  computed: {
    ...mapState(['group', 'member', 'coordinators'])
  },
  methods: {
    checkForm: function () {
      this.gender = this.$refs.gender.dataset.value
      this.leader = this.$refs.leader.dataset.value

      if (this.description) {
        return true
      }

      this.errors = []

      if (!this.description) {
        this.errors.push('Descriçāo requerida.')
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

      const groupData = {
        id: this.id,
        description: this.description,
        gender: this.gender === 'null' ? null : this.gender,
        leader: this.leader,
        ministry: 1
      }

      this.$store.dispatch('updateGroup', groupData)
        .then(response => {
          this.errors = []
          this.alert.title = 'Success!'
          this.alert.type = 'success'
          this.alert.message = 'The group was updated successfuly.'
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
        $('#leader').html('')
        $('#leader').append(new Option(self.leader_name, self.leader, false, false)).val(-1).trigger('select')
        self.coordinators.forEach((el) => {
          $('#leader').append(new Option(el.name, el.id, false, false)).val(-1).trigger('select')
        })
        $('#leader').val(self.leader).trigger('change')
      })
    },
    getCoordinators (filters = null) {
      let params = {
        ministry_id: 1,
        ...filters
      }
      this.$store.dispatch('loadNotAllocatedCoordinators', params)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
