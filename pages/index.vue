<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="12" class="fill-height">
      <v-stepper
        class="w-full fill-height mb-4"
        v-model="e1"
        height="auto"
      >
        <!-- Step Headers -->
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"> Upload </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2"> Cut </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> Reorder </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4"> Export & Share </v-stepper-step>
        </v-stepper-header>
        <!-- Step Items -->
        <v-stepper-items>
          <!-- One (Upload) -->
          <v-stepper-content step="1">
            <StepUpload @fileSelected="onFileSelected"/>
          </v-stepper-content>
          <!-- Two (Select Regions) -->
          <v-stepper-content step="2">
            <StepRegions>
              <template #actions>
                <div class="d-flex justify-end align-center">
                  <v-btn
                    text
                    color="alert"
                    small
                    @click='onStartOver'
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    small
                    @click="
                      e1 = 3;
                      prepareAudioChunks();
                      $destroyWavesurferInstance(wavesurfer);
                    ">
                    Continue
                  </v-btn>
                </div>
              </template>
            </StepRegions>
          </v-stepper-content>
          <!-- Three (Re-arrange Regions) -->
          <v-stepper-content step="3">
            <!-- Audio Chunks -->
            <StepPlayground
              v-if="audioChunks.length > 0 && e1 == 3"
              @setSpeechBuffer="onSetSpeechBuffer"
              :chunks="audioChunks"
              :audioCtx="audioCtx"
            >
              <template #actions>
                <div class="d-flex justify-end align-center pt-8">
                  <v-btn
                    text
                    color="alert"
                    small
                    @click='onStartOver'
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    small
                    @click="e1 = 4;"
                  >
                    Continue
                  </v-btn>
                </div>
              </template>
            </StepPlayground>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card
              class="mb-12d-flex flex-column justify-center align-center"
              width="100%"
            >
              <!-- Audio Chunks -->
              <StepShareAndExport
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
import util from 'audio-buffer-utils'

const initialState = () => ({
  audioCtx: null,
  wavesurfer: null,
  audioChunks: [],
  e1: 1,
  speechBuffer: null,
  uploadedFile: null,
  socials: [
    {
      icon: 'mdi-facebook',
      color: 'indigo',
    },
    {
      icon: 'mdi-twitter',
      color: 'green darken-1',
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
    async onFileSelected(_file) {
      if (!_file) return false

      if (process.client) {
        // Change Step
        this.e1 += 1 

        // Show Waveform
        this.wavesurfer = this.$createWavesurferInstance({
          container: '#waveform',
          audioContext: this.audioCtx,
          interact: true,
          scrollParent: true
        })
        this.wavesurfer.loadBlob(_file)
        
        // Set controls
        this.$tearupWavesurferControls(this.wavesurfer)
      }
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
    onSetSpeechBuffer({ buffer }) {
      this.speechBuffer = buffer
    },
    onStartOver() {
      // Destroy Wavesurfer
      this.$destroyWavesurferInstance(this.wavesurfer)

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

