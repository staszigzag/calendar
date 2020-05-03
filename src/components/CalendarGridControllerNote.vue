<template>
  <div
    class="note-controller"
  >
    day week {{ d }}<br>
    {{ h }}:00 - {{ Number(h) + 1 }}:00
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CalendarGridControllerNote',
  props: {
    wrap: {
      required: true
    },
    view: {
      required: true
    }

  },
  data () {
    return {
      scrollTopWrap: 0,
      viewLeftDistance: 0,
      viewTopDistance: 0,
      d: 0,
      h: 0
    }
  },
  created () {
    // скрол у видемой части грида дней
    this.handlerScrollViewGrid()
    this.view.onscroll = this.handlerScrollViewGrid

    // растояние видемой части календаря до краев окна
    this.viewLeftDistance = this.wrap.getBoundingClientRect().left
    this.viewTopDistance = this.wrap.getBoundingClientRect().top + this.scrollTopWrap
  },
  mounted () {
    // расчет кординат при появлении контроллера
    this.controlCordinatesControllera(event.pageX - this.viewLeftDistance, event.pageY - this.viewTopDistance)

    document.addEventListener('mousemove', this.handlerMoveMouse)
    document.addEventListener('mouseup', this.handlerUpKeyMouse)
  },
  methods: {
    handlerScrollViewGrid () {
      this.scrollTopWrap = this.view.scrollTop
    },
    controlCordinatesControllera (viewGridX, viewGridY) {
      // если выше view календаря
      if (viewGridY < this.$el.offsetHeight / 2) {
        this.$el.style.top = this.scrollTopWrap + 'px'
      } else {
        // если ниже view календаря
        if (viewGridY > this.view.offsetHeight - this.$el.offsetHeight / 2) {
          this.$el.style.top = Math.floor(this.view.offsetHeight - this.$el.offsetHeight + this.scrollTopWrap) + 'px'
        } else {
          this.$el.style.top = viewGridY - this.$el.offsetHeight / 2 + this.scrollTopWrap + 'px'
        }
      }

      // если курсор левее wrap календаря
      if (viewGridX < this.$el.offsetWidth / 2) {
        this.$el.style.left = '0px'
      } else {
        // если правее wrap календаря
        if (viewGridX > this.wrap.offsetWidth - this.$el.offsetWidth / 2) {
          this.$el.style.left = Math.floor(this.wrap.offsetWidth - this.$el.offsetWidth) + 'px'
        } else {
          this.$el.style.left = viewGridX - this.$el.offsetWidth / 2 + 'px'
        }
      }
    },
    getBelowElem () {
      this.$el.style.visibility = 'hidden'
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY)
      this.$el.style.visibility = 'visible'
      return elemBelow
    },
    handlerMoveMouse (event) {
      // узнать над каким элементом сейчас контроллер
      const elemBelow = this.getBelowElem()

      if (elemBelow && elemBelow.dataset && elemBelow.dataset.row) this.d = elemBelow.dataset.row
      if (elemBelow && elemBelow.dataset && elemBelow.dataset.cell) this.h = elemBelow.dataset.cell

      this.controlCordinatesControllera(event.pageX - this.viewLeftDistance, event.pageY - this.viewTopDistance)
    },
    handlerUpKeyMouse (event) {
      console.log('handlerUpKeyMouse')
      // узнать над каким элементом отпустили кнопку
      const elemBelow = this.getBelowElem()
      if (elemBelow && elemBelow.dataset && elemBelow.dataset.row) {
        this.$store.commit('UPDATE_TIME_NOTE', { day: elemBelow.dataset.row, hour: elemBelow.dataset.cell })
      }

      this.$store.commit('SET_DRAG_NOTE', null)

      // удалим наблюдателей, теперь в них нет необходимости
      document.removeEventListener('mousemove', this.handlerMoveMouse)
      document.removeEventListener('mouseup', this.handlerUpKeyMouse)
    }
  },
  computed: {
    ...mapState(['sizeCell', 'dragNote'])
  }
}
</script>

<style scoped lang="scss">

.note-controller {
  color: $colorTextNote;
  height: $heightCell;
  width: calc((100% / 7));
  background-color: $colorNoteController;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  border-radius: 5px;
  position: absolute;
  z-index: 999;
}
</style>
