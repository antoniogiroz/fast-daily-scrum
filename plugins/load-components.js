import Vue from 'vue'
import AppButton from '@/components/global/AppButton.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconEyeSlash from '@/components/icons/IconEyeSlash.vue'
import IconNext from '@/components/icons/IconNext.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconPreferences from '@/components/icons/IconPreferences.vue'
import IconReset from '@/components/icons/IconReset.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import IconTimer from '@/components/icons/IconTimer.vue'
import IconTrash from '@/components/icons/IconTrash.vue'

const components = {
  AppButton,
  IconEye,
  IconEyeSlash,
  IconNext,
  IconPause,
  IconPlay,
  IconPreferences,
  IconReset,
  IconShuffle,
  IconTimer,
  IconTrash,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
