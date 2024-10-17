<script setup lang="ts">
import { MkrTextButton, MkrContainedButton, MkrOutlinedButton } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'
const iconNames = ["circle-empty", "quote", "thumb-down", "thumb-up", "video-camera-circle", "arrow-narrow-bottom", "arrow-narrow-top", "phone", "video-camera", "bell", "bookmark-empty", "bookmark", "chat-alt", "check-circle", "clock", "download", "reply", "menu", "dots", "dots-vertical", "selector", "target", "copy-id", "dashboard", "directory", "list", "lm-logo", "lock-closed", "lock-open", "editor-bold", "editor-image", "editor-italic", "editor-list", "editor-order-list", "editor-underline", "archive", "arrow-narrow-left", "arrow-narrow-right", "arrows-expand", "arrows-reduce", "chevron-left", "chevron-right", "documents", "information-circle", "link", "microphone", "paper-clip", "pause", "play-backwards", "play-circle", "play-forwards", "play", "plus", "inbox", "paper-airplane", "speakerphone", "trash", "document-download", "pencil", "cross", "cross-circle", "arrow-full-bottom", "arrow-full-top", "book-open", "briefcase", "calendar", "camera", "chat", "check-empty", "check", "cog", "credit-card", "document-text", "exclamation-circle", "eye-off", "eye", "flag", "grid", "mail", "pin-map", "question-mark-circle", "search", "social-facebook", "social-instagram", "social-twitter", "sun", "tribe", "user-group", "user"]


const personalizedSlot = ref('Button');
const propsBinding = ref({}) // no default

const componentProps = [
  { name: 'theme', type: 'select', options: [
    { isGroupName: true, mkr:['TextButton', 'ContainedButton'] },
      'neutral',
    { isGroupName: true, mkr:['TextButton'] },
      'danger',
      'neutral-60',
      'neutral-80',
      'secondary-dark',
    { isGroupName: true, mkr:['ContainedButton'] },
      'danger-light',
      'primary',
      'primary-light',
      'secondary',
      'secondary-light'
    ] },
  { name: 'size', type: 'select', options: ['large', 'medium', { isGroupName: true, mkr:['TextButton', 'ContainedButton'] }, 'small'] },
  { name: 'icon', type: 'select', options: iconNames },
  { name: 'iconSide', type: 'select', options: ['left', 'right']  },
  { name: 'disabled', type: 'boolean', value: false },
  { name: 'activated', type: 'boolean', value: false },
]


const variantProps = {
  TextButton: ['theme', 'size', 'icon', 'iconSide', 'disabled', 'activated'],
  ContainedButton: ['theme', 'size', 'icon', 'iconSide', 'disabled'],
  OutlinedButton: ['size', 'icon', 'iconSide', 'disabled']
}


</script>

<template>

  <section class="variant">
    <div v-for="(variant, index) in [MkrTextButton, MkrContainedButton, MkrOutlinedButton]" :key="index">
      <h6>{{ variant.__name }}</h6>
      <component :is="variant" v-bind="propsBinding">{{ personalizedSlot }}</component>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps @change="propsBinding=$event" :variantProps></PropParameters>
  </ParametersTable>

</template>
