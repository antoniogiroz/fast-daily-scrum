<template>
  <img class="w-12 h-12 rounded-full" :src="avatar" />
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true
    }
  }
}
</script>
