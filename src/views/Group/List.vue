<template>
  <div>
    <section class="content-header">
      <h1>
        Group
        <small>List</small>
      </h1>
    </section>

    <section class="content">
      <v-box>
        <div class="row form-group">
          <div class="col-xs-2">
            <router-link class="btn btn-primary" to="/group/create">Adicionar Novo</router-link>
          </div>
        </div>
        <v-table id="dtgroups" :columns="columns" :rows="groups" :options="options"></v-table>
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
          data: 'description',
          title: 'Descriçāo'
        },
        {
          data: 'leader',
          title: 'Responsável'
        },
        {
          data: 'gender',
          title: 'Genero'
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
    return this.$store.dispatch('loadGroups', { ministry: 1 })
  },
  methods: {
    redirect (url) {
      console.log(url)
    }
  },
  computed: {
    groups () {
      let data = this.$store.getters.loadedGroups

      return data.map(el => {
        return {
          id: el.id,
          description: el.description,
          leader: el.leader,
          gender: el.gender,
          actions: `<span class="text-center btn-block"><button type="button" class="btn btn-sm btn-primary btn-dt" data-to="/member/edit/${el.id}">Edit</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-danger btn-dt" data-to="/member/delete/${el.id}">Delete</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-default btn-dt" data-to="/group/${el.id}/member">Members</button></span>`
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
