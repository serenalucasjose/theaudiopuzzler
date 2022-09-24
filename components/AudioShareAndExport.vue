<template>
  <v-banner>
    Thanks for using the software, remember to spread the word :)<br/>
    Leave any comments or improvements you'd like to see in the future.
    <template v-slot:actions>
      <v-btn
        color="primary"
        @click="download"
        text
      >
        Download
      </v-btn>
      <v-btn
        text
        color="secondary"
        @click="$emit('startOver')"
      >
        Go again
      </v-btn>
    </template>
  </v-banner>
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
    download() {
      if (process.client) {
        const wavData = toWav(this.buffer)

        const blob = new Blob([wavData], {type: "audio/wav"})

        saveAs(blob, "Result - TheAudioPuzzler.wav")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>