<template>
  <div class="editTaskDrawer">
    <form @submit.prevent="editTask">
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