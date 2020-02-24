<template>
  <div>
    <Counter />

    <section class="mt-16">
      <Member
        v-if="previousMember"
        :member="previousMember"
        class="transform scale-95 translate-y-1 bg-gray-900 opacity-25"
      />
      <Member :member="currentMember" highlighted />
      <Member
        v-if="nextMember"
        :member="nextMember"
        class="transform scale-95 -translate-y-1 bg-gray-900 opacity-25"
      />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Counter from '@/components/Counter.vue'
import Member from '@/components/members/Member.vue'

export default {
  components: {
    Counter,
    Member
  },

  computed: {
    ...mapState(['isDailyStarted']),
    ...mapGetters(['previousMember', 'currentMember', 'nextMember'])
  }
}
</script>
