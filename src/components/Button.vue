<template>
  <button @click="$emit('btn-click')" :class="color">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
  },
  emits: ['btn-click'],
};
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  width: 100%;

  &.green {
    background-color: #42b983;
    color: black;
  }

  &.red {
    background-color: rgb(222, 78, 78);
    color: white;
  }
}
</style>
