<template>
  <div class="container">
    <Exercise
      v-for="exercise in exercises"
      :key="exercise.id"
      :exercise="exercise"
    />
  </div>
</template>

<script>
import Exercise from './Exercise.vue';

export default {
  name: 'ListContainer',
  components: {
    Exercise,
  },
  props: ['exercises'],
};
</script>

<style scoped>
.container {
}
</style>
