<template>
  <ul class="exercises-container">
    <Exercise
      v-for="exercise in exercises"
      :key="exercise.id"
      :exercise="exercise"
      @check-exercise="emitCheckExercise"
    />
    <!-- loading message -->
    <h2 v-if="isFetchingData">Loading exercises...</h2>
    <!-- empty list message -->
    <h2 v-if="!isFetchingData && !exercises.length">
      No exercises. Start by adding some!
    </h2>
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
    isFetchingData: Boolean,
  },
  emits: ['check-exercise'],
  methods: {
    emitCheckExercise(exercise, parent) {
      this.$emit('check-exercise', exercise, parent);
    },
  },
};
</script>

