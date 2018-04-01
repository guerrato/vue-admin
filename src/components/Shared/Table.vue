<template>
  <table :id="id" class="table table-bordered table-striped"></table>
</template>

<script>
export default {
  props: [
    'id',
    'columns',
    'rows',
    'options'
  ],
  data () {
    return {
      dtHandle: null
    }
  },
  watch: {
    rows (val, oldVal) {
      this.dtHandle.clear()
      this.dtHandle.rows.add(this.rows)
      this.dtHandle.draw()
    }
  },
  mounted () {
    let dtOptions = this.options

    dtOptions.columns = this.columns
    dtOptions.data = this.rows

    this.dtHandle = $(this.$el).DataTable(dtOptions)
  }
}
</script>
