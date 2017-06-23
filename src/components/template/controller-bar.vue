<template>
  <div class="rb-control-bar">
    <div class="rb-control-bar-prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="rb-control-bar-body">
      <slot></slot>
    </div>
    <div class="rb-control-bar-suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rb-control-bar'
  }
</script>

<style lang="scss">
  @import "../../human/vars.scss";

  .rb-control-bar {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: center;
    background: #eee;
    border-radius: $base-radius;
    padding: 0.5rem;
    // transition: width 0.2s;

    &-prefix {
      flex-shrink: 1;
      margin-right: 0.5rem;
    }

    &-body {
      flex: 1;
    }

    &-suffix {
      flex-shrink: 1;
    }
  }
</style>
