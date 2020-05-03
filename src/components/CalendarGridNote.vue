<template>
  <div
    class="note"
    :data-id="note.id"
    :style="{
      left: sizeCell.w * (note.dayWeek - 1 ) + 'px',
      top: sizeCell.h * note.hour + 'px'
    }"
    @click="handlerClickNote"
  >
    {{ note.title }}
    <br>
    {{ note.hour }}:00 - {{ note.hour + 1 }}:00
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CalendarGridNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    handlerClickNote () {
    }
  },
  computed: {
    ...mapState(['sizeCell'])
  }

}
</script>

<style scoped lang="scss">
.note {
  height: $heightCell;
  width: calc((100% / 7));
  border-radius: 5px;
  position: absolute;
  background-color: $colorNote;
  color: $colorTextNote;
  z-index: 999;
  &--drag {
    background-color: $colorNoteDrag;
  }
  &--small {
    height: $heightCell/2;
  }
}
</style>
