<template>
  <div class="flex flex-col items-center justify-center">
    <AppButton class="my-8" @click.native="startDaily">
      {{ buttonText }}
    </AppButton>

    <section>
      <h2 class="title">Available members</h2>
      <MemberList :members="availableMembers" />
    </section>

    <section v-if="awayMembers.length > 0">
      <h2 class="title">Away members</h2>
      <MemberList :members="awayMembers" />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MemberList from '@/components/members/MemberList.vue'

export default {
  components: {
    MemberList
  },

  computed: {
    ...mapState(['members', 'isDailyStarted', 'isDailyFinished']),
    ...mapGetters(['availableMembers', 'awayMembers']),

    buttonText() {
      return this.isDailyStarted && !this.isDailyFinished
        ? 'Continue'
        : 'Start Daily'
    }
  },

  methods: {
    startDaily() {
      this.$router.push({
        path: '/daily'
      })
    }
  }
}
</script>
