<template>
  <div :style="{position: 'relative'}">
    <div class="overlay" @click="closeDrawer"></div>
    <button class="btn-toggle" name="addTask" @click="openDrawer">
      <font-awesome-icon icon="plus-circle" size="3x" />
    </button>
    <!-- <Drawer /> -->
    <div class="drawer">
      <form @submit.prevent="addCard">
        <label>
          Title:
          <input type="text" name="titleInput" />
        </label>
        <label>
          Description:
          <textarea rows="10" name="descriptionInput" />
        </label>
        <input type="submit" value="submit" />
      </form>
      <font-awesome-icon
        icon="times"
        size="2x"
        @click="closeDrawer"
        :style="{color: 'black', position: 'absolute', bottom: '10px'}"
      />
    </div>
    <header>
      &lt;{{this.email}}&gt;
      <router-link to="/login" @click.native="logout()" replace class="logoutButton">LogOut</router-link>
    </header>
    <ul>
      <li v-for="card in cards" :key="card.id">
        <Card :id="card.id" :title="card.title" :text="card.text" @removeCard='removeCard' @editCard='openDrawer' />
      </li>
    </ul>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import Card from './Card'
export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      email: localStorage.getItem('email'),
      cards: []
    }
  },
  created: function () {
    if (!this.email) {
      this.$router.replace('login')
    } else {
      const remouteCards = JSON.parse(localStorage.getItem('card-items'))
      this.cards.splice(0)
      const context = this
      if (remouteCards) {
        remouteCards.forEach(el => context.cards.push(el))
      }
    }
  },
  methods: {
    openDrawer (e) {
      const root = document.getElementById('app')
      root.classList.add('drawer-open')

      if (e.target.name === 'editTask') {

      }
    },
    closeDrawer () {
      const root = document.getElementById('app')
      root.classList.remove('drawer-open')
    },
    logout () {
      this.$emit('logout')
    },
    addCard (e) {
      const title = e.target.titleInput.value
      const text = e.target.descriptionInput.value
      this.cards.push({
        id: uuid.v4(),
        title,
        text
      })
      localStorage.setItem('card-items', JSON.stringify(this.cards))
    },
    removeCard (id) {
      const index = this.cards.findIndex(el => el.id === id)
      this.cards.splice(index, 1)
      localStorage.setItem('card-items', JSON.stringify(this.cards))
    }
    /* editCard () {
      this.openDrawer()
    } */
  }
}
</script>

<style lang="scss" scoped>
$drawer-width: 200px;
$content-blur: 2px;
$content-opacity: 0.2;
$speed: 0.1s;
$default-spacing: 30px;

.drawer {
  transition: all $speed ease-in-out;
  display: block;
  z-index: 1000;
  background: white;
  color: #fff;
  width: $drawer-width;
  position: fixed;
  top: 0;
  left: -$drawer-width;
  bottom: 0;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
    padding: 30px 9px;
    position: absolute;
    top: 0;
    bottom: 0;

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: black;
      text-align: left;

      input {
        width: 95%;
      }

      textarea {
        resize: none;
        width: 95%;
      }
    }

    input[type="submit"] {
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px 30px;
    }
  }
}

.drawer-open {
  .drawer {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 0 4px;
    left: 0;
  }
}

.drawer-open .overlay {
  display: block;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 500;
  background: rgba(0, 0, 0, 0.2);
}

.btn-toggle {
  transition: all $speed ease-in-out;
  position: absolute;
  right: 20px;
  border: none;
  display: block;
  background: inherit;
  bottom: 20px;
  padding: 0;
  margin: 0;
  //width:50px;
  outline: none;
}

.drawer-open .drawer .btn-toggle {
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
header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
}

.logoutButton {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 30px;
  text-decoration: none;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;

  & > li {
    display: inline-block;
    margin: 10px;
    min-width: 200px;
    width: 25%;
  }
}
</style>
