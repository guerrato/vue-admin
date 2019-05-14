<template>
  <div>
    <section class="content-header">
      <h1>
        Members
        <small>List</small>
      </h1>
    </section>

    <section class="content">
      <v-box>
        <div class="row form-group">
          <div class="col-xs-2">
            <router-link class="btn btn-primary" to="/member/create">Adicionar Novo</router-link>
          </div>
        </div>
        <v-table id="dtmembers" :columns="columns" :rows="members" :options="options"></v-table>
      </v-box>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          data: 'id',
          title: 'ID'
        },
        {
          data: 'name',
          title: 'Nome'
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
  created () {
    return this.$store.dispatch('loadMembers')
  },
  methods: {
    redirect (url) {
      console.log(url)
    }
  },
  computed: {
    members () {
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
