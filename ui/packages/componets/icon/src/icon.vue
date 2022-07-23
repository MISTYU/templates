<template>
  <i class="c-icon" :style="style" >
    <slot>hello lch</slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { iconProps } from './icon'
const $props =  defineProps(iconProps)
const style = computed(() => {
  if (!$props.size && !$props.color) {
    return {}
  }
  return {
    ...($props.size ? { 'font-size': $props.size + 'px' } : {}),
    ...($props.color ? { 'color': $props.color } : {})
  }
})
</script>

<script lang="ts">
export default {
  name: 'CIcon'
}
</script>
