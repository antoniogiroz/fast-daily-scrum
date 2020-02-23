<template>
  <div class="container py-8 mx-auto">
    <!-- <button class="button">
      <IconPreferences class="absolute top-0 right-0 m-4" />
    </button> -->

    <div class="flex justify-center">
      <nuxt-link to="/">
        <Logo class="w-2 text-center" />
      </nuxt-link>
    </div>

    <div class="mt-8">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
// import IconPreferences from '@/components/icons/IconPreferences.vue'

export default {
  components: {
    Logo
    // IconPreferences
  }
}
</script>
