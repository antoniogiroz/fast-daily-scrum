<template>
  <div>
    <div class="flex flex-col items-center">
      <p class="text-5xl">Daily Finished! 🎉</p>
      <p class="text-3xl">⏱ Total effective time</p>
      <p class="text-6xl text-gray-100">{{ totalDailyTime | time }}</p>
    </div>

    <section>
      <h2 class="title">Summary</h2>
      <MemberList :members="membersInDaily" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MemberList from '@/components/members/MemberList.vue'

export default {
  components: {
    MemberList,
  },

  middleware: 'daily-finished',

  computed: {
    ...mapState(['membersInDaily', 'totalDailyTime']),
  },
}
</script>
