<template>
  <ul class="workout">
    <WorkoutExercise
      v-for="exercise in workout.exercises"
      :exercise="exercise"
      :key="exercise.id"
      @update-exercise-sets="emitUpdateExerciseSets"
    />
  </ul>
</template>

<script>
import WorkoutExercise from './WorkoutExercise.vue';

export default {
  name: 'Workout',
  components: {
    WorkoutExercise,
  },
  props: {
    workout: Object,
  },
  emits: ['update-exercise-sets'],
  methods: {
    emitUpdateExerciseSets(exercise) {
      this.$emit('update-exercise-sets', exercise);
    },
  },
};
</script>

<style scoped lang="scss">
// .workout {
// }
</style>
