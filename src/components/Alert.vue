<template>
  <div class="callout" :class="['callout-' + type]">
    <h4>{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'dismissible',
    'title'
  ]
}
</script>
