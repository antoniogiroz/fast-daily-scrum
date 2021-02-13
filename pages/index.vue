<template>
  <div class="flex flex-col items-center justify-center">
    <AppButton class="my-8" @click.native="startDaily">
      {{ buttonText }}
    </AppButton>

    <section>
      <h2 class="title">Available members</h2>
      <MemberList :members="sortedAvailableMembers" />
    </section>

    <section v-if="awayMembers.length > 0">
      <h2 class="title">Away members</h2>
      <MemberList :members="awayMembers" />
    </section>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import MemberList from '@/components/members/MemberList.vue'

export default {
  components: {
    MemberList,
  },

  computed: {
    ...mapState([
      'members',
      'availableMembers',
      'isDailyStarted',
      'isDailyFinished',
    ]),
    ...mapGetters(['awayMembers']),

    buttonText() {
      let buttonText = 'Start daily'
      if (this.isDailyStarted) {
        buttonText = 'Continue'
      } else if (this.isDailyFinished) {
        buttonText = 'Start daily again?'
      }
      return buttonText
    },

    sortedAvailableMembers() {
      return sortBy(this.availableMembers, 'name')
    },
  },

  methods: {
    startDaily() {
      if (!this.isDailyStarted || this.isDailyFinished) {
        this.$store.dispatch('startDaily')
      }
      this.$router.push({
        path: '/daily',
      })
    },
  },
}
</script>
