<template>
  <table :id="id" class="table table-bordered table-striped"></table>
</template>

<script>
export default {
  props: [
    'id',
    'columns',
    'tableData',
    'options'
  ],
  data () {
    return {
      rows: [],
      dtHandle: null
    }
  },
  watch: {
    tableData (val, oldVal) {
      this.rows = []

      val.forEach(item => {
        this.rows.push(item)
      })

      this.dtHandle.clear()
      this.dtHandle.rows.add(this.rows)
      this.dtHandle.draw()
    }
  },
  mounted () {
    this.dtHandle = $(this.$el).DataTable({
      columns: this.columns,
      data: this.rows
      // searching: false,
      // paging: true,
      // info: false
    })
  }
}
</script>
