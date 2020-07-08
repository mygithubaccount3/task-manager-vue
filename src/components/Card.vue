<template>
    <div class="card">
        <div class="card__header">
            <font-awesome-icon icon="pen" size="2x" name='editTask' :style="{marginRight: '10px'}"/>
            <font-awesome-icon icon="trash" size="2x" @click="deleteCard"/>
        </div>
        <div class="card__content">
            <h1 class="card__title">{{this.title}}</h1>
            <p class="card__description">{{this.text}}</p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    id: String,
    title: String,
    text: String
  },
  methods: {
    deleteCard () {
      if (confirm('Delete an item?')) {
        this.$emit('removeCard', this.id)
      }
    },
    editCard () {
      this.$emit('editCard', this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
    border: 1px solid black;
    padding: 10px;

    &__header {
        border-bottom: 1px solid black;
        padding-bottom: 10px;
        text-align: right;
    }

    &__title, &__description {
        text-align: left;
    }
}
</style>
