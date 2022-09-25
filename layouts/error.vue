<template>
  <v-app dark>
    <v-container class="pa-0">
      <v-banner two-line class="py-8">
        <v-avatar
          slot="icon"
          color="warning accent-4"
          size="40"
        >
          <v-icon
            icon="mdi-message-alert-outline"
            color="white"
          >
            mdi-message-alert-outline
          </v-icon>
        </v-avatar>
        {{ error.message }}
        <template v-slot:actions>
          <v-btn
            text
            color="warning accent-4"
            href="https://www.google.com/intl/es/chrome/"
            target="_blank"
            exact
            link
          >
            Install latest Chrome version
          </v-btn>
        </template>
      </v-banner>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
