<template>
  <div class="flex flex-col justify-center align-center">
    <div class="flex justify-center font-mono text-8xl md:text-10xl">
      <div class="relative">
        <span :class="counterClasses">{{ totalTime | time }}</span>
      </div>
    </div>

    <div class="flex items-center justify-center mt-12">
      <button
        :disabled="!resetButton"
        class="mx-4 button icon"
        @click="resetTimer"
      >
        <IconReset />
      </button>
      <button
        v-if="!timer"
        class="mx-4 button icon primary"
        @click="startTimer"
      >
        <IconPlay class="ml-1" />
      </button>
      <button v-if="timer" class="mx-4 button icon primary" @click="pauseTimer">
        <IconPause />
      </button>
      <button v-if="nextMember" class="mx-4 button icon" @click="next">
        <IconNext />
      </button>
      <button
        v-else
        class="mx-4 text-xl font-semibold tracking-wider uppercase hover:text-gray-400"
        @click="finish"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      timer: null,
      totalTime: null,
      resetButton: false,
      exceeded: false,
    }
  },

  computed: {
    ...mapState(['initialCounterSeconds']),
    ...mapGetters(['currentMember', 'nextMember']),

    counterClasses() {
      if (this.totalTime < 0 || this.exceeded) {
        return 'text-red-600 exceeded'
      }
      if (this.totalTime <= 5) {
        return 'text-orange-400 blink'
      }
      if (this.totalTime <= 15) {
        return 'text-orange-400'
      }
      return 'text-teal-400'
    },
  },

  created() {
    const currentMemberTime = this.currentMember.totalTime

    if (currentMemberTime > this.initialCounterSeconds) {
      this.exceeded = true
      this.totalTime = currentMemberTime - this.initialCounterSeconds
    } else {
      this.totalTime = this.initialCounterSeconds - currentMemberTime
    }
  },

  beforeDestroy() {
    this.pauseTimer()
  },

  methods: {
    startTimer() {
      if (!this.started) {
        this.started = true
        this.$emit('start')
      }
      this.timer = setInterval(() => this.countdown(), 1000)
      this.resetButton = false
    },

    pauseTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = true
    },

    resetTimer() {
      this.exceeded = false
      this.totalTime = this.initialCounterSeconds
      this.updateMemberTime()
      this.pauseTimer()
    },

    next() {
      const currentTotalTime = this.getCurrentMemberTotalTime()
      if (currentTotalTime === 0) {
        return
      }
      this.updateMemberTime()
      this.$store.dispatch('nextMember')
      this.resetTimer()
      this.startTimer()
    },

    finish() {
      const currentTotalTime = this.getCurrentMemberTotalTime()
      if (currentTotalTime === 0) {
        return
      }
      this.updateMemberTime()
      this.$store.dispatch('finishDaily')
      this.resetTimer()
      this.$router.push({
        path: '/daily/summary',
      })
    },

    getCurrentMemberTotalTime() {
      return this.exceeded
        ? +this.initialCounterSeconds + this.totalTime
        : this.initialCounterSeconds - this.totalTime
    },

    padTime(time) {
      return (time < 10 ? '0' : '') + time
    },

    countdown() {
      if (!this.exceeded && this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.exceeded = true
        this.totalTime++
      }
      this.updateMemberTime()
    },

    updateMemberTime() {
      this.$store.commit(
        'updateCurrentMemberTime',
        this.getCurrentMemberTotalTime()
      )
    },
  },
}
</script>
