export default {
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.name === 'xs' ||  this.$vuetify.breakpoint.name === 'sm'
    },
    isMobileOrTablet() {
      return this.$vuetify.breakpoint.name === 'xs' ||  this.$vuetify.breakpoint.name === 'sm' ||  this.$vuetify.breakpoint.name === 'md'
    },
    isXl () {
      return this.$vuetify.breakpoint.name === 'xl'
    },
    isLgOrXl () {
      return this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl'
    },
  },
}