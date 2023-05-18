<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
}
</style>
