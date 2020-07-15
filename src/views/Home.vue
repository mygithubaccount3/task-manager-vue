<template>
  <div class="contentWrapper" ref="contentWrapper">
    <AlertModal v-if="showAlertModal" @closeAlertModal="closeAlertModal">{{this.alert}}</AlertModal>
    <div class="contentWrapper__overlay" id="overlay" @click="closeDrawer"></div>
    <button class="contentWrapper__btnOpenDrawer" @click="openDrawer">
      <font-awesome-icon icon="plus-circle" size="3x" />
    </button>
    <Drawer
      @submitForm="submitForm"
      @closeDrawer="closeDrawer"
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
      isDrawerOpened: false,
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
      this.alert = 'Your browser does not support localStorage. Program will not work'
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
      this.$refs.contentWrapper.classList.add('drawer-open')
    },

    openEditingDrawer ({ id, title, text }) {
      this.id = id
      this.titleInput = title
      this.descriptionInput = text
      this.creating = false
      this.openDrawer()
    },

    closeDrawer () {
      this.$refs.contentWrapper.classList.remove('drawer-open')
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
      this.saveCard('localStorage', this.cards)
      this.closeDrawer()
    },

    saveCard (destination, cards) {
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
      }
    },

    removeCard (id) {
      const index = this.cards.findIndex(el => el.id === id)
      this.cards.splice(index, 1)
      this.saveCard('localStorage', this.cards)
    },

    closeAlertModal () {
      this.showAlertModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
$drawer-width: 200px;
$content-blur: 2px;
$content-opacity: 0.2;
$speed: 0.1s;
$default-spacing: 30px;

.contentWrapper {
  min-height: 150px;
  position: relative;

  &__overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 500;
    background: rgba(0, 0, 0, 0.2);
  }

  &__btnOpenDrawer {
    transition: all $speed ease-in-out;
    position: absolute;
    right: 20px;
    border: none;
    display: block;
    background: inherit;
    bottom: 20px;
    padding: 0;
    margin: 0;
    outline: none;
  }
}

.drawer-open {
  .drawer {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 0 4px;
    left: 0;
  }
}

.drawer-open .contentWrapper__overlay {
  display: block;
}

.drawer-open .drawer .contentWrapper__btnOpenDrawer {
  right: 20px;
  background: #fff;
  color: #000;
  &:before {
    content: "\f00d";
  }
  &:after {
    content: "Close";
  }
}
</style>
