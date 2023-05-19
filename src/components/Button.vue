<template>
  <button @click="$emit('btn-click')" :class="styles">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    styles: String,
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
  &.blue {
    background-color: rgb(77, 77, 248);
    color: white;
  }

  &.floating {
    position: fixed;
    left: 50;
    transform: translateX(-50%);
    box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.5);
    bottom: 20px;
    width: calc(100% - 60px);
    transition: 0.1s ease-in-out transform;

    &:hover {
      transform: translate(-50%, -2px);
    }
  }

  &.big-font {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
