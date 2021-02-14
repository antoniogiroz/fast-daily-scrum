<template>
  <div
    class="flex items-center px-3 py-3 list__item"
    :class="{
      'bg-gray-900 text-gray-100': highlighted,
    }"
  >
    <MemberAvatar :avatar="member.avatar" />

    <div class="flex-grow ml-4 text-xl">
      {{ member.name }}
    </div>

    <div v-if="member.totalTime > 0" class="ml-4 text-lg">
      {{ member.totalTime | time }}
    </div>

    <button
      v-if="showToggleMember"
      class="ml-4 list__action"
      @click="toggleMember"
    >
      <IconEye
        v-if="member.isAvailable"
        class="w-6 h-6 text-gray-600 fill-current hover:text-gray-400"
      />
      <IconEyeSlash
        v-else
        class="w-6 h-6 text-gray-600 fill-current hover:text-gray-400"
      />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MemberAvatar from './MemberAvatar.vue'

export default {
  components: {
    MemberAvatar,
  },

  props: {
    member: {
      type: Object,
      required: true,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(['isDailyStarted', 'isDailyFinished']),

    showToggleMember() {
      return !this.isDailyStarted && !this.isDailyFinished
    },
  },

  methods: {
    toggleMember() {
      this.$store.commit('toggleMemberAvailability', this.member)
    },
  },
}
</script>
