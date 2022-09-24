<template>
  <div id="audio-playground">
    <h2 class="text--h2">Arrastra los clips para formar un nuevo audio</h2>
    <p class="text--caption mb-8">Tambien podes descargarlos por separado</p>
    <!-- Audio Chunks -->
    <div class="canvas-wrapper mb-8">
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
          <canvas
            width="80px"
            height="80px"
            :id="`audio-chunk-${chunk.regionAsSubBuffer.length}`">
          </canvas>
        </v-card>
      </draggable>
    </div>
    <!-- New Speech -->
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
          <div id="speech-waveform"></div>
        </v-sheet>
      </draggable>
      <v-btn-toggle group>
        <v-btn
          color="secondary"
          class="ml-auto"
          @click="wavesurfer.play()"
          text
          value="left"
        >
          Preview
        </v-btn>

        <v-btn
          value="center"
          color="error"
          text
          @click="initSpeech"
        >
          Clear
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'

import drawBuffer from 'draw-wave'
import draggable from 'vuedraggable'

import util from 'audio-buffer-utils'

export default {
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
    wavesurfer: null
  }),
  async mounted() {
    await this.$nextTick()

    this.initSoundwaves()
    this.initWavesurfer()
  },
  beforeDestroy() {
    this.$emit('setSpeechBuffer', { buffer: util.clone(this.wavesurfer.backend.buffer) })
    
    // Teardown Wavesurfer
    this.wavesurfer.destroy()

    document.body.onkeyup = (e) => {
      (e.code === 'Space') && false
    }
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
    },
    initWavesurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: '#speech-waveform',
        audioContext: this.audioCtx,
        interact: true,
        scrollParent: true,
        plugins: [RegionsPlugin.create({})]
      })

      // Init empty Audio Buffer
      this.initSpeech()

      // Init  Handlers
      this.wavesurfer.on('ready', () => {
        this.initKeyboardControls()
      })
    },
    initKeyboardControls() {
      // Space (play/stop)
      document.body.onkeyup = (e) => {
        (e.code === 'Space') && this.wavesurfer.playPause()
      }

      return 0
    },
    playRegion(region) {
      const source = this.audioCtx.createBufferSource()
      
      source.buffer = region
      source.connect(this.audioCtx.destination)
      source.start()      
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

      // this.wavesurfer.addRegion(region)

      this.wavesurfer.stop()
    },
    initSpeech() {
      this.wavesurfer.loadDecodedBuffer(util.create(1))
    }
  }
}
</script>

<style lang="scss">
#audio-playground {
  width: 100%;
  position: relative;
  height: 250px;
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

.sortable-ghost {
  display: none !important;
}
</style>