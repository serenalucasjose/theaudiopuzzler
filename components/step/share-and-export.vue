<template>
  <v-container class="pa-0">
    <v-banner>
      <div class="px-0 py-6">
        <p class="text--caption mb-2">
          Thanks for using the software!
        </p>
        <p class="text--caption mt-0">
          Leave any comments or improvements you'd like to see in the future :)
        </p>
      </div>
      <!-- Share actions -->
      <div class="share-actions text-right">
        <v-btn
          v-for="(social, i) in socials"
          :key="i"
          :color="social.color"
          class="white--text"
          fab
          icon
          small
          @click="share"
        >
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </div>
      <template v-slot:actions>
        <div class="d-flex justify-space-between align-center ma-0">
          <v-btn
            color="primary"
            @click="download"
            text
            small
          >
            Download
          </v-btn>
          <v-btn
            text
            color="secondary"
            @click="$emit('startOver')"
            small
          >
            Go again
          </v-btn>
        </div>
      </template>
    </v-banner>
  </v-container>
</template>

<script>
import { saveAs } from 'file-saver'
import toWav from 'audiobuffer-to-wav'

export default {
  props: {
    buffer: {
      type: AudioBuffer
    }
  },
  data: () => ({
    socials: [
      {
        icon: 'mdi-share-variant',
        color: 'secondary',
      }
    ],
  }),
  methods: {
    getBufferAsBlob() {
      const wavData = toWav(this.buffer)
      const blob = new Blob([wavData], {type: "audio/wav"})
      
      return blob
    },
    download() {
      (process.client) && saveAs(this.getBufferAsBlob(), "Result - TheAudioPuzzler.wav")
    },
    share() {
      if (process.client && navigator.canShare()) {
        const file = new File([this.getBufferAsBlob()], "Result - TheAudioPuzzler.wav")

        navigator.share(file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>