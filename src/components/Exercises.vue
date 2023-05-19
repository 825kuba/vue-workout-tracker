<template>
  <ul class="exercises-container">
    <Exercise
      v-for="exercise in exercises"
      :key="exercise.id"
      :exercise="exercise"
      @check-exercise="emitCheckExercise"
    />
  </ul>
</template>

<script>
import Exercise from './Exercise.vue';

export default {
  name: 'Exercises',
  components: {
    Exercise,
  },
  props: {
    exercises: Array,
  },
  emits: ['check-exercise'],
  methods: {
    emitCheckExercise(exercise, parent) {
      this.$emit('check-exercise', exercise, parent);
    },
  },
};
</script>

<style scoped>
.exercises-container {
  list-style: none;
}
</style>
