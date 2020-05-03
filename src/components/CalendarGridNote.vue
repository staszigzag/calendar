<template>
  <div
    class="note"
    :class="{
      'note--drag': dragNote ? note.id === dragNote.id : false,
      'note--small': note.isTimeAm || note.isTimePm,
      'note--time-am': note.isTimeAm

    }"
    :data-row="note.dayWeek"
    :data-cell="note.hour"
    :style="{
      left: sizeCell.w * (note.dayWeek - 1) + 'px',
      top: (sizeCell.h * note.hour + 1) + sizeTimePm + 'px',
    }"
  >
    {{ note.title }}
    <br>
    <!-- убрать время когда мини версия -->
    {{ note.isTimeAm || note.isTimePm ? '' : `${note.hour}:00 - ${note.hour + 1}:00` }}
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
  computed: {
    ...mapState(['sizeCell', 'dragNote']),
    sizeTimePm () {
      return this.note.isTimePm ? this.sizeCell.h / 2 : 0
    }
  },
  mounted () {
    this.$el.onmousedown = () => {
      const onMouseMove = () => {
        // при нажатии плюс движение курсора запоминаем эту заметку
        this.$store.commit('SET_DRAG_NOTE', this.note)
        // удалим сразу обработчик
        document.removeEventListener('mousemove', onMouseMove)
      }

      document.addEventListener('mousemove', onMouseMove)
    }
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
  &--time-am{
    border-bottom: 1px solid $colorBorderCell;
  }
}
</style>
