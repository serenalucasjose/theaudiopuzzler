<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-stepper class="w-full" v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"> Upload </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"> Cut </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3"> Reorder </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4"> Export & Share </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-12 pa-8 d-flex justify-center align-center"
              height="500px"
              width="100%"
            >
              <v-file-input
                :rules="rules"
                accept="audio/*"
                placeholder="Choose and audio file..."
                prepend-icon="mdi-speaker"
                label="Audio File"
                @change="onChange"
              ></v-file-input>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12 pa-8 d-flex justify-center align-center"
              height="500px"
              width="100%"
            >
              <div id="waveform" class="flex-grow-1"></div>
            </v-card>

            <v-btn
              color="primary"
              @click="e1 = 3; prepareAudioChunks(); clearWaveSurfer();">
              Continue
            </v-btn>

            <v-btn
              text
              @click='onStartOver'
            >
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12 pa-8 d-flex flex-column justify-s align-center"
              minHeight="500px"
              width="100%"
            >
              <!-- Audio Chunks -->
              <AudioPlayground
                v-if="audioChunks.length > 0 && e1 == 3"
                @setSpeechBuffer="onSetSpeechBuffer"
                :chunks="audioChunks"
                :audioCtx="audioCtx"
              />
            </v-card>

            <v-btn
              color="primary"
              @click="e1 = 4;"
            >
              Continue
            </v-btn>

            <v-btn
              text
              @click='onStartOver'
            >
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card
              class="mb-12 pa-8 d-flex flex-column justify-center align-center"
              minHeight="500px"
              width="100%"
            >
              <!-- Audio Chunks -->
              <AudioShareAndExport
                v-if="speechBuffer"
                :buffer="speechBuffer"
                @startOver="onStartOver"
              />
              <!-- Social Share -->
              <v-card-actions class="justify-center">
                <v-btn
                  v-for="(social, i) in socials"
                  :key="i"
                  :color="social.color"
                  class="white--text"
                  fab
                  icon
                  small
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
import util from 'audio-buffer-utils'


const initialState = () => ({
  audioCtx: null,
  wavesurfer: null,
  audioChunks: [],
  e1: 1,
  speechBuffer: null,
  uploadedFile: null,
  rules: [
    (value) =>
      !value ||
      value.size < 5000000 ||
      "File size should be less than 5 MB!",
  ],
  socials: [
    {
      icon: 'mdi-facebook',
      color: 'indigo',
    },
    {
      icon: 'mdi-linkedin',
      color: 'cyan darken-1',
    },
    {
      icon: 'mdi-instagram',
      color: 'red lighten-3',
    },
  ],
})

export default {
  data: () => initialState(),
  created() {
    if (process.client) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
  },
  methods: {
    async onChange(_file) {
      if (!_file) return false

      if (process.client) {
        // Change Step
        this.e1 += 1 
        // Show Waveform
        this.wavesurfer = WaveSurfer.create({
          container: '#waveform',
          audioContext: this.audioCtx,
          interact: true,
          scrollParent: true,
          plugins: [
            RegionsPlugin.create({
              regionsMinLength: .500,
              dragSelection: {
                slop: 1
              }
            })
          ]
        })
        this.wavesurfer.loadBlob(_file)
        // Set keyboard controls
        this.wavesurfer.on('ready', () => {
          this.initKeyboardControls()
        })
      }

      return 0
    },
    initKeyboardControls() {
      // Space (play/stop)
      document.body.onkeyup = (e) => {
        (e.code === 'Space') && this.wavesurfer.playPause()
      }

      return 0
    },
    prepareAudioChunks() {
      // Get regions and extract their start, stop to create the audio chunks
      const regions = this.wavesurfer.regions.list
      const originalBuffer = util.clone(this.wavesurfer.backend.buffer)
      
      for (const region in regions) {
        const { start, end } = regions[region]

        const regionAsSubBuffer = util.slice(originalBuffer, (start*originalBuffer.sampleRate), (end*originalBuffer.sampleRate))

        // Save new Audio Buffer
        this.audioChunks.push({ regionAsSubBuffer, region: regions[region] })
      }

      return 0
    },
    clearWaveSurfer() {
      this.wavesurfer.destroy()
      
      document.body.onkeyup = (e) => {
        (e.code === 'Space') && false
      }
    },
    onSetSpeechBuffer({ buffer }) {
      this.speechBuffer = buffer
    },
    onStartOver() {
      // Tear down Wavesurfer
      this.wavesurfer.destroy()

      // Re init data
      Object.assign(this.$data, initialState())
      
      // Reset audio context
      if (process.client) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      }
    }
  },
}
</script>

<style lang="scss">

</style>

