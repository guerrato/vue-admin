<template>
  <table :id="id" class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Rendering engine</th>
        <th>Browser</th>
        <th>Platform(s)</th>
        <th>Engine version</th>
        <th>CSS grade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Trident</td>
        <td>Internet Explorer 4.0
        </td>
        <td>Win 95+</td>
        <td> 4</td>
        <td>X</td>
      </tr>
      <tr>
        <td>Trident</td>
        <td>Internet Explorer 5.0
        </td>
        <td>Win 95+</td>
        <td>5</td>
        <td>C</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Rendering engine</th>
        <th>Browser</th>
        <th>Platform(s)</th>
        <th>Engine version</th>
        <th>CSS grade</th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: [
    'id'
  ],
  mounted () {
    $(this.$el).DataTable()
  }
}
</script>
