<template>
  <div class="drawer">
    <form @submit.prevent="submitForm" class="drawer__taskForm">
      <label class="drawer__fieldLabel">
        Title:
        <input type="text" :value="this.title" class="drawer__titleInput" ref="title" />
      </label>
      <label class="drawer__fieldLabel">
        Description:
        <textarea
          :value="this.text"
          rows="10"
          class="drawer__descriptionInput"
          ref="text"
        />
      </label>
      <input type="submit" value="submit" class="drawer__btnSubmit" />
    </form>
    <font-awesome-icon icon="times" size="2x" @click="closeDrawer" class="drawer__closeIcon" />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    submitForm () {
      this.$emit('submitForm', { id: this.id, title: this.$refs.title.value, text: this.$refs.text.value })
    },

    closeDrawer () {
      this.$emit('closeDrawer')
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

  &__taskForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
    padding: 30px 9px;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  &__fieldLabel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;
    text-align: left;
  }

  &__titleInput {
    width: 95%;
  }

  &__descriptionInput {
    resize: none;
    width: 95%;
  }

  &__btnSubmit {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 30px;
  }

  &__closeIcon {
    color: black;
    position: absolute;
    bottom: 0;
    left: calc(50% - 11px);
  }
}
</style>
