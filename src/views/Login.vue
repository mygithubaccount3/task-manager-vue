<template>
  <div class="loginFormWrapper">
    <AlertModal v-if="showAlertModal" @closeAlertModal="closeAlertModal">{{this.alert}}</AlertModal>
    <h1>Login Page</h1>
    <form @submit.prevent="logIn" class="loginForm">
        <label for="emailInput" class="loginForm__label">email:</label>
        <input type="email" v-model="email" class="loginForm__email" />
        <p class="loginForm__error" v-if="error.length">{{this.error}}</p>
        <button type="submit" class="loginForm__btnSubmit" :disabled="!!error">submit</button>
    </form>
  </div>
</template>

<script>
import AlertModal from '../components/AlertModal'
export default {
  components: {
    AlertModal
  },
  data () {
    return {
      email: '',
      error: '',
      alert: '',
      showAlertModal: false
    }
  },
  watch: {
    email: function (val) {
      if (val === '') {
        this.error = 'Enter your email'
      } else if (/^(?=.{1,60}$)[a-zA-Z]+([.+]?[a-zA-Z0-9]+)*@[a-zA-Z]+\.[a-zA-Z]+$/.test(val) === false) {
        this.error = 'Email is invalid'
      } else {
        this.error = ''
      }
    }
  },
  methods: {
    logIn () {
      if (localStorage) {
        try {
          localStorage.setItem('email', this.email)
          this.$router.replace({ name: 'Home', params: { email: this.email } })
        } catch (e) {
          this.alert = `Error occured: ${e.message}`
          this.showAlertModal = true
        }
      } else {
        this.alert = 'Your browser does not support localStorage'
        this.showAlertModal = true
      }
    },

    closeAlertModal () {
      this.showAlertModal = false
    }
  }
}
</script>

<style lang='scss' scoped>
  .loginFormWrapper {
        border: 1px solid black;
        margin: auto;
        min-width: 200px;
        padding: 10px;
        width: 25%;
    }

  .loginForm {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto;
    height: 150px;

    &__label {
      align-self: flex-start;
      margin-bottom: 10px;
    }

    &__email {
      width: 100%;
    }

    &__error {
      align-self: flex-start;
      background-color: red;
      color: white;
      padding: 3px;
      width: 172px;
   }

    &__btnSubmit {
      background-color: white;
      border: 1px solid black;
      border-radius: 5px;
      margin: auto;
      padding: 7px;
      width: 30%;
    }
  }
</style>
