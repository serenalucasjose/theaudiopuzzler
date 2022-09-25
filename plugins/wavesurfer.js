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
      return new Promise((resolve, reject) => {
        instance.on('ready', () => {
          // Transport
          document.body.onkeyup = (e) => {
            (e.code === 'Space') && instance.playPause()
          }

          // Regions
          instance.on('region-dblclick', region => {
            region.remove()
          })
          instance.on('region-update-end', region => {
            let tag = prompt("Name your clip")
            
            region.update({
              data: {
                tag
              }
            })
          })

          resolve()
        })
      })
    }
  })
}