<template>
    <div :id="'block-' + props.blockId" class="block" :class="props.blockType" :data-ref="props.blockData.reference">
      <teleport to="body">
          <!-- <CookieCustom
            :settings="props.blockData"
            @on-accept-all="onSave"
            @on-decline-all="onSave"
            @on-save-preferences="onSave"
          /> -->
      </teleport>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi'
import CookieCustom from './variations/custom.vue';

const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string;
    banner_title: {
      type: String,
      default: 'Cookie settings',
    },
    banner_description: {
      type: String,
      default: 'We use cookies and similar technologies to help personalize content and offer a better experience. You can opt to customize them by clicking the preferences button.',
    },
    preferences_button_label: {
      type: String,
      default: 'Preferences',
    },
    accept_all_button_label: {
      type: String,
      default: 'Accept All',
    },
    decline_all_button_label: {
      type: String,
      default: 'Decline All',
    },
    save_preferences_button_label: {
      type: String,
      default: 'Save',
    },
    modal_title: {
      type: String,
      default: 'Your cookie settings',
    },
    modal_description: {
      type: String,
      default: 'Select cookie you accept',
    },
    cookies: {
      type: [],
      default: () => [],
    },
  };
}>();
  
const onSave = (accepted) => {
  console.log('User accepted the following cookies 📋: ' + accepted.join(', '), props.blockData )
}

</script>
