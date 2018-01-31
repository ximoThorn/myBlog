<template>
  <div class="indexWrap">
    <mynav></mynav>
    <div class="container">
      <info></info>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import mynav from './nav'
import info from './info'

export default {
  components: {
    mynav,
    info
  }
}
</script>

<style lang="scss" scoped>

.container {
  max-width: 960px;
  margin: 0 auto;
}
</style>
