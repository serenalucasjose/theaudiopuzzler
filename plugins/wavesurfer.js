import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'

export default ({ app }, inject) => {
  inject('createWavesurferInstance', (config) => {
    // Default plugins
    config.plugins = [
      RegionsPlugin.create({
        regionsMinLength: .500,
        dragSelection: {
          slop: 1
        }
      })
    ]
    // Return instance
    return WaveSurfer.create(config)
  })

  inject('destroyWavesurferInstance', (instance) => {
    instance.destroy()

    // Remove controls
    if (process.client) {
      document.body.onkeyup = (e) => {
        (e.code === 'Space') && false
      }
    }
  })

  inject('tearupWavesurferControls', (instance) => {
    if (process.client) {
      instance.on('ready', () => {
        // Play/Pause Desktop
        document.body.onkeyup = (e) => {
          (e.code === 'Space') && instance.playPause()
        }
        // TODO: Delete region on dblclick ...
      })
    }
  })
}