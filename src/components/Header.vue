<template>
  <div class="header">
    <AlertModal v-if="showAlertModal" @closeAlertModal="closeAlertModal">{{this.alert}}</AlertModal>
    <span class="header__userEmail">&lt;{{this.email}}&gt;</span>
    <button @click="logout" class="header__btnLogout">LogOut</button>
  </div>
</template>
<script>
import AlertModal from './AlertModal'
export default {
  components: {
    AlertModal
  },
  data () {
    return {
      showAlertModal: false
    }
  },
  props: {
    email: {
      type: String,
      required: true
    }
  },
  methods: {
    logout () {
      if (localStorage) {
        try {
          localStorage.removeItem('email')
          this.$router.replace('login')
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
<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;

  &__userEmail {
    margin-left: 10px;
  }

  &__btnLogout {
    background-color: white;
    border: 1px solid #000000;
    border-radius: 5px;
    margin-right: 10px;
    padding: 5px 30px;
    text-decoration: none;
  }
}
</style>
