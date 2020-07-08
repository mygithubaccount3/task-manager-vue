<template>
  <div class="drawer">
    <form @submit.prevent="createTask">
      <label>
        Title:
        <input type="text" name="titleInput" />
      </label>
      <label>
        Description:
        <textarea rows="10" name="descriptionInput"/>
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
</template>
<script>
export default {
  methods: {
    closeDrawer () {
      this.$emit('closeDrawer')
    },
    createTask () {
      this.$emit('addCard')
    }
  }
}
</script>
<style lang="scss">
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
</style>
