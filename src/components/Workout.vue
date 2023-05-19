<template>
  <ul class="workout">
    <WorkoutExercise
      v-for="exercise in workout.exercises"
      :exercise="exercise"
      :key="exercise.id"
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
};
</script>

<style scoped lang="scss">
.workout {
  list-style: none;
}
</style>
