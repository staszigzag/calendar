<template>
  <div class="calendar">
    Calendar
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Calendar',
  mounted () {
    console.log(this.listNotes)
  },
  methods: {
  },
  computed: {
    ...mapState(['listNotes', 'numberDays'])
  }
}
</script>

<style scoped lang="scss">
.calendar {
  color: $color-item;
}
</style>
