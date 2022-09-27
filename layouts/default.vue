<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <!-- Theme -->
        <v-list-item class="pa-2 px-4 d-flex justify-start align-center">
          <p class="mb-0 mr-4">Light/Dark</p>
          <v-btn icon  @click="toggleTheme()">
            <v-icon v-if="!$vuetify.theme.dark" class="mr-1" color="blue-grey darken-4"
              >mdi-weather-night</v-icon
            >
            <v-icon v-else color="yellow darken-3">mdi-white-balance-sunny</v-icon>
          </v-btn>
        </v-list-item>
        <!-- Fullscreen -->
        <v-list-item class="pa-2 px-4 d-flex justify-start align-center">
          <p class="mb-0 mr-4">Fullscreen</p>
          <v-switch
            inset
            :value="fullscreenEnabled"
            @change="toggleFullscreen"
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>@theaudiopuzzler</span>
    </v-footer>
  </v-app>
</template>

<script>
import screenfull from 'screenfull'

export default {
  data() {
    return {
      fullscreenEnabled: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "TheAudioPuzzler Inc.",
          to: "/",
        },
      ],
      miniVariant: false,
      title: "TheAudioPuzzler"
    }
  },
  beforeCreate() {
    // Check if Browser supports AudioContext
    if (process.client) {
      if (!window.AudioContext && !window.webkitAudioContext) {
        return this.$nuxt.error({
          message: "Your browser does not meet the minimum requirements for AudioContext"
        })
      }
    }
  },
  created() {
    // Get basic theme config from LS
    if (process.client) {
      try {
        const isWhiteTheme = JSON.parse(window.localStorage.getItem('whiteTheme'))
        // Update theme based on previous selection
        this.$vuetify.theme.dark = !isWhiteTheme
      } catch(e) {
        return false
      }
    }
  },
  mounted() {
    // Attach screenfull events
    if (screenfull.isEnabled) {
      screenfull.on('change', async () => {
        this.fullscreenEnabled = !this.fullscreenEnabled
      })
    }
  },
  beforeDestroy() {
    screenfull.off('change')
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark

      try {
        window.localStorage.setItem('whiteTheme', !this.$vuetify.theme.dark)
      } catch(e) {
        return false
      }
    },
    async toggleFullscreen() {
      if (screenfull.isEnabled) {
        await screenfull.toggle()
      }
    }
  },
}
</script>
