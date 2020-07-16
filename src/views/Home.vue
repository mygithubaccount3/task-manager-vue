<template>
  <div class="contentWrapper">
    <AlertModal v-if="showAlertModal" @closeAlertModal="closeAlertModal">{{this.alert}}</AlertModal>
    <Drawer
      @submitForm="submitForm"
      @openDrawer="openDrawer"
      @closeDrawer="closeDrawer"
      :showDrawer="showDrawer"
      :id="id"
      :title="titleInput"
      :text="descriptionInput"
    />
    <Header :email="email" />
    <Cards :cards="cards" @removeCard="removeCard" @openEditingDrawer="openEditingDrawer"/>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AlertModal from '../components/AlertModal'
export default {
  name: 'Home',
  components: {
    Drawer,
    Header,
    Cards,
    AlertModal
  },
  data () {
    return {
      email: '',
      cards: [],
      descriptionInput: '',
      titleInput: '',
      creating: true,
      id: '',
      showDrawer: false,
      showAlertModal: false,
      alert: ''
    }
  },
  created: function () {
    if (localStorage) {
      try {
        this.email = localStorage.getItem('email')
      } catch (e) {
        this.alert = `Error occured: ${e.message}`
        this.showAlertModal = true
      }
    } else {
      this.alert = 'Your browser does not support localStorage. The app will not work'
      this.showAlertModal = true
    }

    if (!this.email) {
      this.$router.replace('login')
    } else {
      const remoteCards = JSON.parse(this.getCards('localStorage'))
      const context = this
      if (remoteCards) {
        context.cards.splice(0, this.length, ...remoteCards)
      }
    }
  },
  methods: {
    openDrawer () {
      this.showDrawer = true
    },

    openEditingDrawer ({ id, title, text }) {
      this.id = id
      this.titleInput = title
      this.descriptionInput = text
      this.creating = false
      this.openDrawer()
    },

    closeDrawer () {
      this.showDrawer = false
      this.id = ''
      this.titleInput = ''
      this.descriptionInput = ''
      this.creating = true
    },

    submitForm (card) {
      if (this.creating) {
        this.cards.push({ ...card, id: uuid.v4() })
      } else {
        const elIndex = this.cards.findIndex((el, i, arr) => el.id === card.id)
        this.cards.splice(elIndex, 1, card)
      }
      this.saveCards('localStorage', this.cards)
      this.closeDrawer()
    },

    saveCards (destination, cards) {
      switch (destination) {
        case 'localStorage':
          if (localStorage) {
            try {
              localStorage.setItem('card-items', JSON.stringify(cards))
            } catch (e) {
              this.alert = `Error occured: ${e.message}`
              this.showAlertModal = true
            }
          } else {
            this.alert = 'Error occured: Your browser does not support localStorage. This app will not work'
            this.showAlertModal = true
          }
          break
        default:
          this.alert = 'Error occured: cards are not saved'
          this.showAlertModal = true
      }
    },

    getCards (destination) {
      switch (destination) {
        case 'localStorage':
          if (localStorage) {
            try {
              return localStorage.getItem('card-items')
            } catch (e) {
              this.alert = `Error occured: ${e.message}`
              this.showAlertModal = true
              return '[]'
            }
          } else {
            this.alert = 'Your browser does not support localStorage'
            this.showAlertModal = true
            return '[]'
          }
        default:
          this.alert = 'Error getting cards'
          this.showAlertModal = true
      }
    },

    removeCard (id) {
      const index = this.cards.findIndex(el => el.id === id)
      this.cards.splice(index, 1)
      this.saveCards('localStorage', this.cards)
    },

    closeAlertModal () {
      this.showAlertModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.contentWrapper {
  min-height: 150px;
  position: relative;
}
</style>
