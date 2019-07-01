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
        let image = el.leader.image ? `<img src="${process.env.VUE_APP_IRONHAND_BASE_URL}/storage${el.leader.image}" width="30" height="30" alt="${el.leader.name}">&nbsp;` : null
        return {
          id: el.id,
          description: el.description,
          leader: `${image}${el.leader.name}`,
          gender: el.gender,
          actions: `<span class="text-center btn-block"> \
          <button type="button" class="btn btn-sm btn-default btn-dt" data-to="/group/1/${el.id}/member">Members</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-primary btn-dt" data-to="/group/1/${el.id}/edit">Edit</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-danger btn-dt" data-to="/group/1/${el.id}/delete">Delete</button></span>`
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
