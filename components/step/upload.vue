<template>
  <v-container class="pa-0">
    <v-banner
      icon="mdi-upload"
      class="text-left mb-4"
      rounded
      color="info"
    >
      <h4 class="text--h4 font-weight-regular">Upload an audio track from your computer</h4>
    </v-banner>
    <v-card
      class="mb-12 pa-8 d-flex justify-center align-center fill-height"
      width="100%"
    >
      <v-file-input
        :rules="rules"
        accept="audio/*"
        placeholder="Choose and audio file..."
        prepend-icon="mdi-speaker"
        label="Audio File"
        @change="(e) => { $emit('fileSelected', e) }"
      ></v-file-input>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 5000000 ||
        "File size should be less than 5 MB!",
    ],
  })
}
</script>