<template>
  <div id="app">
    <calendar-grid />
  </div>
</template>

<script>
import CalendarGrid from '@/components/CalendarGrid.vue'

export default {
  name: 'App',
  components: {
    CalendarGrid
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  text-align: center;
  color: #2c3e50;
  margin: 50px;
}
</style>
