<template>
  <table :id="id" class="table table-bordered table-striped" :rows="rows">
    <thead>
      <tr>
        <th v-for="row in this.columns" :key="row.key">{{row.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="(item, index) in row" :item="item" :index="index" :key="item">{{ item }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th v-for="row in this.columns" :key="row.key">{{row.label}}</th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: [
    'id',
    'columns',
    'rows'
  ],
  computed: {
  },
  updated () {
    $(this.$el).DataTable()
  }
}
</script>
