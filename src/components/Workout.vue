<template>
  <ul>
    <WorkoutExercise
      v-for="exercise in workout.exercises"
      :exercise="exercise"
      :key="exercise.id"
      @update-exercise-sets="emitUpdateExerciseSets"
      @delete-exercise-from-workout="emitDeleteExerciseFromWorkout"
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
  emits: ['update-exercise-sets', 'delete-exercise-from-workout'],
  methods: {
    emitUpdateExerciseSets(exercise) {
      this.$emit('update-exercise-sets', exercise);
    },
    emitDeleteExerciseFromWorkout(exercise) {
      this.$emit('delete-exercise-from-workout', exercise);
    },
  },
};
</script>
