<template>
  <v-container
    class="pa-0"
    id="audio-playground"
  >
    <v-banner
      icon="mdi-gesture-swipe-down"
      class="text-left mb-4"
      rounded
      color="info"
    >
      <h4 class="text--h4 font-weight-regular">Drag'n drop clips</h4>
    </v-banner>
    <!-- Audio Clips Wrapper -->
    <div class="canvas-wrapper mb-4" ref="regionsWrapper">
      <draggable
        :group="{
          name: 'chunks',
          pull: 'clone',
          put: false
        }"
        @start="drag=true"
        @end="drag=false"
        :list="chunks"
        draggable=".region-card"
      >
        <v-card
          v-for="(chunk, i) in chunks"
          :key="i"
          elevation="2"
          color="white"
          class="pa-2 region-card"
          ripple
          @click="playRegion(chunk.regionAsSubBuffer)"
        >
          <div class="tag-overlay">
            {{ chunk.region.data.tag }}  
          </div> 
          <canvas
            :id="`audio-chunk-${chunk.regionAsSubBuffer.length}`"
            :width="canvasSize"
            :height="canvasSize"
          >
          </canvas>
        </v-card>
      </draggable>
    </div>
    <!-- New Speech Wrapper -->
    <div class="speech-wrapper">
      <draggable
        :list="speechChunks"
        group="chunks"
        @change="updateSpeech"
        draggable=".region-card"
      >  
        <v-sheet
          color="transparent"
          :rounded="true"
          elevation="0"
          height="150px"
          width="100%"
          class="mb-4"
        >
          <div
            id="speech-waveform"
            class="scroll--simple"
          >
          </div>
        </v-sheet>
      </draggable>
      <!-- Speech Actions -->
      <v-btn-toggle group>
        <v-btn
          color="secondary"
          class="ml-auto"
          @click="wavesurfer.play()"
          text
          value="left"
          xSmall
        >
          Preview
        </v-btn>

        <v-btn
          value="center"
          color="error"
          text
          @click="initSpeech"
          xSmall
        >
          Clear
        </v-btn>
      </v-btn-toggle>
    </div>
    <!-- Actions -->
    <slot name="actions"></slot>
  </v-container>
</template>

<script>
import drawBuffer from 'draw-wave'
import draggable from 'vuedraggable'

import util from 'audio-buffer-utils'

import responsiveUtils from '~/mixins/responsiveUtils.js'

export default {
  mixins: [responsiveUtils],
  props: {
    chunks: {
      type: Array,
      default: () => [],
    },
    audioCtx: {
      type: AudioContext,
      required: true,
    },
  },
  components: {
    draggable
  },
  data: () => ({
    wavesurferInstances: [],
    speechChunks: [],
    drag: false,
    speechBuffer: null,
    wavesurfer: null,
    playingRegion: false,
    currentSource: null
  }),
  computed: {
    canvasSize: function () {
      return this.isMobile ? '40px' : '80px'
    }
  },
  async mounted() {
    await this.$nextTick()
    // Init UI
    this.initSoundwaves()
    this.initWavesurfer()
    // Init empty Audio Buffer
    this.initSpeech()
  },
  beforeDestroy() {
    this.$emit('setSpeechBuffer', { buffer: util.clone(this.wavesurfer.backend.buffer) })
    
    // Destroy Wavesurfer
    this.$destroyWavesurferInstance(this.wavesurfer)
  },
  methods: {
    async initSoundwaves() {
      if (!process.client) return false

      for (const chunk of this.chunks) {
        const container = `#audio-chunk-${chunk.regionAsSubBuffer.length}`

        drawBuffer.canvas(
          document.querySelector(container), 
          chunk.regionAsSubBuffer, 
          '#999999'
        )
      }

      // Fix Container's height
      let $wrapper = this.$refs?.regionsWrapper
      const { clientHeight } = $wrapper

      $wrapper.style.height = `${clientHeight}px`
    },
    initWavesurfer() {
      // Show Waveform
      this.wavesurfer = this.$createWavesurferInstance({
        container: '#speech-waveform',
        audioContext: this.audioCtx,
        interact: true,
        scrollParent: true
      })

      // Set controls
      this.$tearupWavesurferControls(this.wavesurfer)
    },
    playRegion(region) {
      // Stop region
      if (this.playingRegion) this.currentSource.stop()

      this.playingRegion = true
      
      this.currentSource = this.audioCtx.createBufferSource()
      this.currentSource.buffer = region
      this.currentSource.connect(this.audioCtx.destination)
      this.currentSource.start()
      
      // Update
      this.currentSource.onended = () => {
        this.playingRegion = false
      }
    },
    updateSpeech({ added: { element: chunk }}) {
      let {
        region,
        regionAsSubBuffer
      } = chunk

      // Update AudioBuffer
      const currentBuffer = util.clone(this.wavesurfer.backend.buffer)
      const updatedBuffer = util.concat(currentBuffer, regionAsSubBuffer)

      // Update Wavesurfer
      this.wavesurfer.loadDecodedBuffer(updatedBuffer)
      this.wavesurfer.drawBuffer()

      // Layer new regions
      region.wavesurfer = this.wavesurfer
      region.start = currentBuffer.duration
      region.end = updatedBuffer.duration
      region.color = 'hsla(200, 50%, 70%, 0.4)'

      this.wavesurfer.stop()
    },
    initSpeech() {
      this.wavesurfer.clearRegions()
      this.wavesurfer.loadDecodedBuffer(util.create(1))
    }
  }
}
</script>

<style lang="scss">
#audio-playground {
  width: 100%;
  position: relative;
  // height: 250px;
  .canvas-wrapper > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .speech-wrapper div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

#speech-waveform {
  wave {
    width: 100%!important;
  }
}

.region-card {
  position: relative;
  overflow: hidden;
  canvas {
    position: relative;
    z-index: 1;
  }
  .tag-overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, .5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
  }
}

.sortable-ghost {
  display: none !important;
}
</style>