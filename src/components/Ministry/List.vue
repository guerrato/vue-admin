<template>
  <div>
    <section class="content-header">
      <h1>
        Ministry
        <small>List</small>
      </h1>
    </section>

    <section class="content">
      <v-box>
        <div class="row form-group">
          <div class="col-xs-2">
            <router-link class="btn btn-primary" to="/ministry/create">Adicionar Novo</router-link>
          </div>
        </div>
        <v-table id="dtministry" :columns="columns" :rows="ministries" :options="options"></v-table>
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
          data: 'description',
          title: 'Descrição'
        },
        {
          data: 'coordinator',
          title: 'Coordenador'
        },
        {
          data: 'actions',
          title: '',
          orderable: false
        }
      ],
      options: {
        searching: true
      }
    }
  },
  created () {
    return this.$store.dispatch('loadMinistries')
  },
  computed: {
    ministries () {
      let result = []
      let data = this.$store.getters.loadedMinistries

      data.forEach(el => {
        result.push({
          id: el.id,
          name: el.name,
          description: el.description,
          coordinator: el.coordinator,
          actions: ''
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
