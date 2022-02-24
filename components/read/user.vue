<template>
  <v-card
    outlined
  >
    <v-list-item two-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ user.email }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ user.first_name }} {{ user.last_name }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <img :src="image" @error="imageAlt">
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {

  props: ['user'],

  computed: {

    image () {
      return process.env.AXIOS_NURSE_OPERATIONS + `image/${this.user.sub}`
    }
  },

  methods: {
    imageAlt (event) {
      event.target.src = 'https://www.kindpng.com/picc/m/144-1447559_profile-icon-missing-profile-picture-icon-hd-png.png'
    }
  }
}
</script>
