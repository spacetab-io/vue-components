<template>
  <div id="app">
    <h1>Привет, @spacetab/vue-components!</h1>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  body, html {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
