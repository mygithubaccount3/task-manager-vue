<template>
  <div>
    <ul class="cardsWrapper">
      <li class="card" v-for="card in cards" :key="card.id">
        <RemovalModal v-if="showRemovalModal" @closeModal="toggleRemovalModal" @deleteCard="deleteCard" :id="card.id"/>
        <div class="card__header">
          <font-awesome-icon
            icon="pen"
            size="2x"
            @click="editCard({ id: card.id, title: card.title, text: card.text })"
            class="card__penIcon"
          />
          <font-awesome-icon icon="trash" size="2x" @click="toggleRemovalModal" />
        </div>
        <div class="card__content">
          <h1 class="card__title">{{card.title}}</h1>
          <p class="card__description">{{card.text}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import RemovalModal from './RemovalModal.vue'
export default {
  components: {
    RemovalModal
  },
  data () {
    return {
      showRemovalModal: false
    }
  },
  props: {
    cards: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    toggleRemovalModal () {
      this.showRemovalModal = !this.showRemovalModal
    },

    deleteCard (id) {
      this.$emit('removeCard', id)
    },

    editCard (card) {
      this.$emit('openEditingDrawer', card)
    }
  }
}
</script>
<style lang="scss" scoped>
.cardsWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  margin: auto;
  padding: 0;
  width: 90%;
}

.card {
  border: 1px solid black;
  padding: 10px;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 200px;
  width: 30%;

  @media screen and (max-width: 767px) {
    width: 46%;
  }

  @media screen and (max-width: 555px) {
    width: 100%;
  }

  &__header {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    text-align: right;
  }

  &__penIcon {
    margin-right: 10px;
  }

  &__title,
  &__description {
    text-align: left;
    word-break: break-all;
  }
}
</style>
