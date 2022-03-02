<template>
  <v-container>
    <userCard v-if="user" :user="user" />
    <v-tabs v-model="tab">
      <v-tab>Password</v-tab>
      <v-tab>Image</v-tab>
      <v-tab>Details</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-text-field
          v-model="newPassword"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.min]"
          :type="showNewPassword ? 'text' : 'password'"
          label="New password"
          @click:append="showNewPassword = !showNewPassword"
        />
        <v-text-field
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.match]"
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Confirm password"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />
        <v-btn :disabled="newPasswordRequirementsMet" @click="setUserPassword">
          Set new password
        </v-btn>
        <v-btn @click="forgotPassword">
          Send reset link
        </v-btn>
      </v-tab-item>
      <v-tab-item>
        <v-file-input v-model="image" label="Image" @change="saveImage" />
      </v-tab-item>
      <v-tab-item>
        <v-text-field v-model="first_name" label="Fist name" />
        <v-text-field v-model="last_name" label="Last name" />
        <v-btn block @click="updateUser">
          Update
        </v-btn>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import userCard from '../components/read/user'
export default {
  components: {
    userCard
  },
  data () {
    return {
      first_name: '',
      last_name: '',
      tab: null,
      image: null,
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      rules: {
        min: () => this.newPassword.length >= 6 || 'Min 6 characters',
        match: () => this.newPassword === this.confirmPassword || 'Passwords dont match'
      }
    }
  },

  computed: {
    ...mapFields('user', ['user']),

    newPasswordRequirementsMet () {
      return !(this.newPassword.length >= 6 && this.newPassword === this.confirmPassword)
    }

  },

  methods: {
    ...mapActions('users', ['uploadUserImage']),
    ...mapActions('user', ['setUser']),

    async saveImage () {
      await this.uploadUserImage({ user: this.user, image: this.image })
    },

    setUserPassword () {
      if (this.user.email) {
        this.$admin_operations.$post('set_user_password', { username: this.user.email, password: this.newPassword })
      }
    },

    forgotPassword () {
      if (this.user.email) {
        this.$admin_operations.$post('forgot_password', { username: this.user.email })
      }
    },

    updateUser () {
      this.$admin_operations.$patch('update_user', {
        email: this.user.email,
        first_name: this.first_name,
        last_name: this.last_name
      })
    }
  }
}
</script>

<!-- a

What should admins be able to do with users in user_management ?

user
  tabs
    info
    timecard
      expand
      shifts
        expand
        entries

weekly report for user
weekly report for user contract
complete report for user

change user password
regenerate password for user

view contracts
>
view timecards
>
view shifts
>
view entries
edit entries

a -->
