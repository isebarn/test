<template>
  <v-container>
    <v-card
      tile
    >
      <v-list shaped>
        <v-subheader>Hospitals</v-subheader>
        <v-list-item-group
          v-model="hospital"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in hospitals"
            :key="i"
            :value="item"
            @click="$router.push('hospital')"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  async fetch () {
    await this.fetchHospitals()
  },

  computed: {
    ...mapFields('hospitals', [
      'hospitals',
      'hospital'
    ])
  },

  methods: {
    ...mapActions('hospitals', ['fetchHospitals'])
  }
}

</script>
