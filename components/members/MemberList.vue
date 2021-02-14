<template>
  <div class="mt-4 list">
    <Member v-for="member in members" :key="member.email" :member="member" />
  </div>
</template>

<script>
import Member from '@/components/members/Member.vue'

export default {
  components: {
    Member,
  },

  props: {
    members: {
      type: Array,
      required: true,
    },
  },
}
</script>
