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
            <!-- Content -->
            <StepUpload
              v-if="!processingAudio"
              @fileSelected="onFileSelected"
            />
            <!-- Loading -->
            <v-progress-linear
              v-else
              class="pb-2"
              indeterminate
              color="info"
            ></v-progress-linear>
          </v-stepper-content>
          <!-- Two (Select Regions) -->
          <v-stepper-content step="2">
            <StepRegions v-show="!processingAudio">
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
                      prepareAudioChunks();
                      $destroyWavesurferInstance(wavesurfer);
                    ">
                    Continue
                  </v-btn>
                </div>
              </template>
            </StepRegions>
            <!-- Loading -->
            <v-progress-linear
              v-show="processingAudio"
              class="pb-2"
              indeterminate
              color="info"
            ></v-progress-linear>
          </v-stepper-content>
          <!-- Three (Re-arrange Regions) -->
          <v-stepper-content step="3">
            <!-- Content -->
            <StepPlayground
              v-if="
                audioChunks.length > 0 && 
                e1 == 3 && 
                !processingAudio
              "
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
            <!-- Loading -->
            <v-progress-linear
              v-else
              class="pb-2"
              indeterminate
              color="info"
            ></v-progress-linear>
          </v-stepper-content>
          <!-- Fourth (Export/Share) -->
          <v-stepper-content step="4">
            <StepShareAndExport
              v-if="speechBuffer"
              :buffer="speechBuffer"
              @startOver="onStartOver"
            />
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
  processingAudio: false
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
        this.processingAudio = true

        // Show Waveform
        this.wavesurfer = this.$createWavesurferInstance({
          container: '#waveform',
          audioContext: this.audioCtx,
          interact: true,
          scrollParent: true
        })
        this.wavesurfer.loadBlob(_file)
        
        // Set controls
        await this.$tearupWavesurferControls(this.wavesurfer)

        // Change Step and set loading
        this.processingAudio = false
        this.e1 += 1
      }
    },
    prepareAudioChunks() {
      this.processingAudio = true

      // Get regions and extract their start, stop to create the audio chunks
      const regions = this.wavesurfer.regions.list
      const originalBuffer = util.clone(this.wavesurfer.backend.buffer)
      
      for (const region in regions) {
        const { start, end } = regions[region]

        const regionAsSubBuffer = util.slice(originalBuffer, (start*originalBuffer.sampleRate), (end*originalBuffer.sampleRate))

        // Save new Audio Buffer
        this.audioChunks.push({ regionAsSubBuffer, region: regions[region] })
      }

      // Go next and update loading
      this.processingAudio = false
      this.e1 = 3

      return 0
    },
    onSetSpeechBuffer({ buffer }) {
      this.processingAudio = true

      this.speechBuffer = buffer

      this.processingAudio = false
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

