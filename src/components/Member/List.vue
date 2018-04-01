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
        searching: true
      }
    }
  },
  created () {
    return this.$store.dispatch('loadMembers')
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
