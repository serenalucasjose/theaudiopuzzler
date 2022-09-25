<template>
  <v-container class="pa-0">
    <v-banner
      class="text-left mb-4"
      rounded
      color="info"
    >
      <v-list-group v-model="open" dense color="info">
        <template v-slot:activator>
          <v-list-item-title class="text--h4 font-weight-regular">Create clips</v-list-item-title>
        </template>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon class="mb-0">
              <v-icon small v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="pa-0">
              <v-list-item-title class="font-weight-light" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-banner>
    <v-card
      class="mb-4 pa-4 justify-center align-center"
      :class="{'d-flex': !open}"
      v-show="!open"
      width="100%"
    >
      <div
        id="waveform"
        class="flex-grow-1 scroll--simple"
      >
      </div>
    </v-card>
    <!-- Actions -->
    <slot name="actions"></slot>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      open: false,
      items: [
        { text: 'Drag - Create', icon: 'mdi-gesture-swipe-horizontal' },
        { text: 'Dbl Click - Delete', icon: 'mdi-cursor-default-click' },
        { text: 'Hold - Move', icon: 'mdi-gesture-tap-hold' },
      ],
    })
  }
</script>

<style lang="scss">
.v-list-group__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>