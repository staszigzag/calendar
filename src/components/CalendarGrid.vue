<template>
  <section class="calendar">
    <ul class="calendar__days">
      <li class="calendar__day calendar__day--first" />
      <li
        v-for="(day, i) in days"
        :key="i"
        class="calendar__day"
      >
        <span class="calendar__day-week">{{ day }}</span>
        <br>
        <span class="calendar__day-num">{{ numberDays[i] }}</span>
      </li>
    </ul>
    <div
      ref="viewGrid"
      class="calendar__view-grid"
    >
      <ul class="calendar__col calendar__col--first">
        <li
          v-for="j in 24"
          :key="j"
          class="calendar__cell calendar__cell--first"
        >
          <span
            v-if="j !== 1"
            class="calendar__hour"
          >{{ --j }}:00</span>
        </li>
      </ul>
      <div
        ref="wrapGrid"
        class="calendar__wrap-grid"
      >
        <ul
          v-for="i in 7"
          :key="i"
          class="calendar__col"
        >
          <li
            v-for="j in 24"
            :key="j"
            :data-row="i"
            :data-cell="--j"
            class="calendar__cell"
          />
        </ul>
        <calendar-grid-note
          v-for="note in listNotes"
          :key="note.id + 'note'"
          :note="note"
        />
        <calendar-grid-controller-note
          v-if="dragNote"
          :wrap="$refs.wrapGrid"
          :view="$refs.viewGrid"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CalendarGridNote from './CalendarGridNote'
import CalendarGridControllerNote from './CalendarGridControllerNote'
import { mapState } from 'vuex'

export default {
  name: 'Calendar',
  components: {
    CalendarGridNote,
    CalendarGridControllerNote
  },
  data () {
    return {
      days: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    }
  },
  mounted () {
    this.setSizeCell()
    // следим за размерами окна
    window.onresize = this.setSizeCell
  },
  methods: {
    setSizeCell () {
      const countDays = 7
      const countHours = 24
      this.$store.commit('SET_SIZE_CELL', {
        w: this.$refs.wrapGrid.clientWidth / countDays,
        h: this.$refs.wrapGrid.clientHeight / countHours
      })
    }
  },
  computed: {
    ...mapState(['listNotes', 'numberDays', 'dragNote'])
  }
}
</script>

<style scoped lang="scss">

.calendar {
  min-width: 700px;
  max-width: $maxWidthCalendar;

  &__days {
    display: flex;
    padding-right: 20px;
  }
  &__day {
    flex-grow: 1;
    height: $heightCell;
    &-num{
      font-size: 26px;
    }
    &-week{
      color: #70757a;
      font-size: 12px;
    }
    &--first {
      width: $widthFirstCell;
      flex-grow: 0
    }
  }

  &__view-grid {
    display: flex;
    max-height: 80vh;
    overflow-y: scroll;
  }

  &__wrap-grid {
    position: relative;
    height: 100%;
    flex-grow: 1;
    display: flex;
  }
  &__col {
    flex-grow: 1;
    margin: 0;
    &--first {
      flex-grow: 0;
      width: $widthFirstCell;
    }
  }
  &__cell {
    border: 1px solid $colorBorderCell;
    height: $heightCell;
    &--first {
      border: hidden;
      position: relative;
      &::after {
        content: '';
        width: 15px;
        height: 2px;
        position: absolute;
        right: 0px;
        top: -1px;
        background-color: $colorBorderCell;
      }
    }
  }
  &__hour{
    position: relative;
    top: -10px;
    color: #70757a;
    font-size: 14px;
  }
}
</style>
