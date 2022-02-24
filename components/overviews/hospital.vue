<template>
  <v-container>
    <v-card v-if="hospital">
      <v-img />
      <v-card-title>{{ hospital.name }}</v-card-title>
      <v-card-subtitle>{{ hospital.address }}</v-card-subtitle>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            block
            v-on="on"
          >
            Edit
          </v-btn>
        </template>
        <v-container style="background: white;">
          <v-card flat>
            <hospitalEdit />
          </v-card>
        </v-container>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import hospitalEdit from '../edits/hospital'
export default {
  components: {
    hospitalEdit
  },

  data () {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapFields('hospitals', ['hospital'])
  }
}
</script>
