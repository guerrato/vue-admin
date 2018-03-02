<template>
  <div class="box" :class="['box-' + type, {'box-solid': isSolid} ]">
    <div v-if="title" class="box-header with-border">
      <h3 class="box-title">
          {{ title }}
      </h3>
      <div class="box-tools pull-right">
        <button v-if="minimizable" type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
          <i class="fa fa-minus"></i>
        </button>
        <button v-if="closable" type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="box-body">
      <slot>
      </slot>
    </div>
    <div v-if="footer" class="box-footer">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'isSolid',
    'closable',
    'minimizable',
    'title',
    'footer'
  ]
}
</script>
