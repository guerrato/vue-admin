<template>
  <div>
    <section class="content-header">
      <h1>
        Members
        <small>List</small>
      </h1>
    </section>

    <section class="content">
     <div class="row">
        <div class="col-lg-3">
          <v-box>
            <div class="box-body">
              <div class="form-group">
                <label for="ministry">Ministérios:</label>
                <select class="form-control select2" id="ministry" v-model="ministry" data-value="" style="width: 100%;" data-placeholder="Selecione..." ref="ministry">
                  <option value="all" selected>Todos</option>
                  <option v-for="m in ministries" v-bind:key="m.id" v-bind:value="m.id">
                    {{ m.name }}
                  </option>
                </select>
              </div>
            </div>
          </v-box>
        </div>
        <div class="col-lg-9">
          <v-box class="col-md-8">
            <div class="row form-group">
              <div class="col-xs-2">
                <router-link class="btn btn-primary" to="/member/create">Adicionar Novo</router-link>
              </div>
            </div>
            <v-table id="dtmembers" :columns="columns" :rows="members" :options="options"></v-table>
          </v-box>
        </div>
     </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ministry: 'all',
      columns: [
        {
          data: 'id',
          title: 'ID',
          width: '5%'
        },
        {
          data: 'name',
          title: 'Nome',
          width: '50%'
        },
        {
          data: 'nickname',
          title: 'Apelido'
        },
        {
          data: 'actions',
          title: '',
          orderable: false
        }
      ],
      options: {
        searching: true,
        paging: true,
        lengthChange: true,
        ordering: true,
        info: true,
        autoWidth: true
      }
    }
  },
  mounted () {
    const self = this
    $(document).ready(() => {
      $('.select2').select2().on('select2:select', function (e) {
        let selected = $(e.currentTarget).val()
        $(e.currentTarget).attr('data-value', selected)
        if (selected !== self.ministry) {
          console.log(selected)
          if (selected === 'all') {
            self.$store.dispatch('loadMembers', { filter: 'all' })
          } else {
            self.$store.dispatch('loadMembers', { filter: Math.abs(Number.parseInt(selected)) })
          }
        }
        self.ministry = selected
      })
    })
  },
  created () {
    this.$store.dispatch('loadMinistries')
    this.$store.dispatch('loadMembers', { filter: 'all' })
  },
  computed: {
    members () {
      return this.handleDt()
    },
    ministries () {
      let result = []
      let data = this.$store.getters.loadedMinistries

      data.forEach(el => {
        result.push({
          id: el.id,
          name: el.name
        })
      })

      return result
    }
  },
  methods: {
    redirect (url) {
      console.log(url)
    },
    handleDt () {
      let result = []
      let data = this.$store.getters.loadedMembers

      data.forEach(el => {
        result.push({
          id: el.id,
          name: el.name,
          nickname: el.nickname,
          actions: `<span class="text-center btn-block"><button type="button" class="btn btn-sm btn-primary btn-dt" data-to="/member/edit/${el.id}">Edit</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-danger btn-dt" data-to="/member/delete/${el.id}">Delete</button></span>`
        })
      })

      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
