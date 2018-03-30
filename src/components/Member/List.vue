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
        <v-table id="example1" :header="header" :rows="members"></v-table>
      </v-box>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          key: 'id',
          label: 'ID',
          oderable: true
        },
        {
          key: 'rendering',
          label: 'Rendering engine',
          oderable: true
        },
        {
          key: 'browser',
          label: 'The Browser',
          oderable: true
        },
        {
          key: 'platform',
          label: 'Platform(s)',
          oderable: true
        },
        {
          key: 'engine',
          label: 'Engine version',
          oderable: true
        },
        {
          key: 'css',
          label: 'CSS grade',
          oderable: true
        }
      ]
    }
  },
  computed: {
    members () {
      return this.$store.dispatch('loadMembers')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
