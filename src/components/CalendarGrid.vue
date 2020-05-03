<template>
  <section class="calendar">
    <ul class="calendar__days">
      <li class="calendar__day calendar__day--first">
        time
      </li>
      <li
        v-for="(day, i) in days"
        :key="i"
        class="calendar__day"
      >
        {{ day }}
        <br>
        {{ numberDays[i] }}
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
          {{ --j }}:00
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
          >
            <!-- {{ j }}:{{ i }} -->
          </li>
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
    console.log(this.listNotes)
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
  min-width: 400px;
  max-width: $maxWidthCalendar;

  &__days {
    display: flex;
    padding-right: 20px;
  }
  &__day {
    flex-grow: 1;
    border: 1px solid $colorBorderDay;
    height: $heightCell;
    &--first {
      width: $widthFirstCell;
      flex-grow: 0
    }
  }

  &__view-grid {
    display: flex;
    max-height: 70vh;
    overflow-y: scroll;
    border: 1px solid $colorBorderViewGrid;
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
    // &:hover {
    //   background-color rgba(216, 189, 115, 0.2);
    //   // background-color rgba(216, 189, 115, 0.2);
    &--first {
      border: hidden;
      border-top: 1px solid $colorBorderCell;
      padding-bottom: 30px;
    }
  }
}
</style>
