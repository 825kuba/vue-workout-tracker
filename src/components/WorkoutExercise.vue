<template class="workout-exercise">
  <li>{{ exercise.name }}</li>
</template>

<script>
export default {
  name: 'WorkoutExercise',
  props: {
    exercise: Object,
  },
};
</script>

<style scoped lang="scss">
.workout-exercise {
}
</style>
