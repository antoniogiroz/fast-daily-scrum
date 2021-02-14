<template>
  <div class="flex flex-col items-center justify-center">
    <AppButton
      class="my-8 primary"
      :disabled="!canStartDaily"
      @click.native="startDaily"
    >
      {{ buttonText }}
    </AppButton>

    <section class="flex justify-evenly">
      <AppButton
        v-for="team in teams"
        :key="team.id"
        class="my-8"
        @click.native="setAvailableMembers(team.members)"
      >
        Team {{ team.name }} ({{ team.members.length }})
      </AppButton>
    </section>

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
import sortBy from 'lodash/sortBy'
import { mapState, mapGetters, mapMutations } from 'vuex'
import MemberList from '@/components/members/MemberList.vue'

export default {
  components: {
    MemberList,
  },

  computed: {
    ...mapState([
      'teams',
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

    canStartDaily() {
      return this.availableMembers && this.availableMembers.length > 0
    },

    sortedAvailableMembers() {
      return sortBy(this.availableMembers, 'name')
    },
  },

  methods: {
    ...mapMutations(['setAvailableMembers']),

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
