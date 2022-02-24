<template>
  <v-container>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider />

      <v-tab href="#tab-0">
        Users
        <v-icon>mdi-account-details-outline</v-icon>
      </v-tab>

      <v-tab href="#tab-1">
        Create user
        <v-icon>mdi-account-plus</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Contract user
        <v-icon>mdi-card-account-details</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Create contract
        <v-icon>mdi-file-document-edit</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in tabs" :key="i" :value="'tab-' + i">
        <component :is="item" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import userTable from '../components/tables/users'
import createUser from '../components/create/user'
import userWithContract from '../components/create/userWithContract'
import contract from '../components/create/contract'
export default {

  components: {
    userTable,
    createUser,
    userWithContract,
    contract
  },

  data () {
    return {
      tab: null,
      tabs: [userTable, createUser, userWithContract, contract]
    }
  }
}
</script>
