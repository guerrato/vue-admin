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
        <v-table id="example1" :columns="columns" :rows="members"></v-table>
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
          key: 'id',
          label: 'ID'
        },
        {
          key: 'name',
          label: 'Nome'
        },
        {
          key: 'nickname',
          label: 'Apelido'
        },
        {
          key: 'actions',
          label: ''
        }
      ]
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
