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
      <template v-slot:actions>
        <div class="d-flex justify-space-between align-center ma-0">
          <v-btn
            color="secondary"
            @click="share"
            text
            small
          >
            <v-icon small>mdi-share-variant</v-icon>
          </v-btn>
          <v-btn
            text
            color="secondary"
            @click="$emit('startOver')"
            small
          >
            Go again
          </v-btn>
          <v-btn
            color="primary"
            @click="download"
            large
            text
          >
            Download
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
  methods: {
    getBufferAsBlob() {
      const wavData = toWav(this.buffer)
      const blob = new Blob([wavData], {type: "audio/wav"})
      
      return blob
    },
    download() {
      (process.client) && saveAs(this.getBufferAsBlob(), "Result - TheAudioPuzzler.wav")
    },
    async share() {
      if (process.client && navigator.canShare()) {
        const file = new File([this.getBufferAsBlob()], "Result - TheAudioPuzzler.wav")

        if (navigator.canShare && navigator.canShare(file)) {
          try {
            await navigator.share(file)
          } catch (error) {
            console.error(error)
          }
        } else {
          return this.$nuxt.error({
            message: `Your system doesn't support sharing files.`
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>