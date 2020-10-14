<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages';

export default {
  name: 'EmptyLayoyt',
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(errFb) {
      this.$error(messages[errFb.code]);
    },
  },
};
</script>
