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
          title: 'Descrição',
          width: '50%'
        },
        {
          data: 'gender',
          title: 'Destinado à',
          className: 'table-cell-center'
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
        let gender = '<span class="label label-default">Todos</span>'
        switch (el.gender) {
          case 'male':
            gender = '<span class="label label-info">Homens</span>'
            break
          case 'female':
            gender = '<span class="label label-info bg-maroon-active">Mulheres</span>'
            break
          default:
            break
        }
        result.push({
          id: el.id,
          name: el.name,
          description: el.description,
          gender: gender,
          actions: `<span class="text-center btn-block"> \
          <button type="button" class="btn btn-sm btn-primary btn-dt" data-to="/ministry/${el.id}/edit">Edit</button>&nbsp; \
          <button type="button" class="btn btn-sm btn-danger btn-dt" data-to="/ministry/${el.id}/delete">Delete</button></span>`
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
