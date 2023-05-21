<template>
  <div class="home">
    <Button
      type="button"
      :text="`${isWorkingOut ? 'Cancel workout' : 'Start workout'}`"
      :styles="`${isWorkingOut ? 'red' : 'blue'} big-font`"
      @btn-click="$emit('toggle-isWorkingOut')"
    ></Button>
    <Workout
      v-if="isWorkingOut"
      :workout="workout"
      @update-exercise-sets="emitUpdateExerciseSets"
      @delete-exercise-from-workout="emitDeleteExerciseFromWorkout"
    />
    <Button
      type="button"
      v-if="isWorkingOut"
      :text="`${isSelectingExercise ? 'Cancel' : 'Add exercise'}`"
      :styles="`${isSelectingExercise ? 'red' : 'green'}`"
      @btn-click="$emit('toggle-isSelectingExercise')"
    ></Button>
    <aside>
      <Exercises
        v-if="isWorkingOut && isSelectingExercise"
        :exercises="exercises"
        @check-exercise="emitCheckExercise"
        :workout="workout"
      />
      <Button
        type="button"
        v-if="checkIfSomeChecked"
        text="Add exercises to workout"
        styles="green floating"
        @btn-click="$emit('add-exercises-to-workout')"
        class="floating"
      ></Button>
    </aside>
    <Button
      type="button"
      v-if="isWorkingOut && workout.exercises.length && !isSelectingExercise"
      text="Finish workout"
      class="blue big-font"
      @btn-click="finishWorkout"
    ></Button>
    <h2 v-if="!isWorkingOut && isShowingMessage">
      Your workout has been saved!
    </h2>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Exercises from '@/components/Exercises.vue';
import Workout from '@/components/Workout.vue';

export default {
  name: 'HomeView',
  components: {
    Button,
    Exercises,
    Workout,
  },
  props: {
    isWorkingOut: Boolean,
    isSelectingExercise: Boolean,
    exercises: Array,
    workout: Object,
  },
  emits: [
    'toggle-isWorkingOut',
    'toggle-isSelectingExercise',
    'check-exercise',
    'add-exercises-to-workout',
    'finish-workout',
    'update-exercise-sets',
    'delete-exercise-from-workout',
  ],
  data() {
    return {
      isShowingMessage: false,
      timer: null,
    };
  },
  methods: {
    emitCheckExercise(exercise, parent) {
      this.$emit('check-exercise', exercise, parent);
    },
    emitUpdateExerciseSets(exercise) {
      this.$emit('update-exercise-sets', exercise);
    },
    emitDeleteExerciseFromWorkout(exercise) {
      this.$emit('delete-exercise-from-workout', exercise);
    },
    finishWorkout() {
      this.$emit('finish-workout');
      this.showMessage();
    },
    showMessage() {
      clearTimeout(this.timer);
      this.isShowingMessage = true;
      setTimeout(() => {
        this.isShowingMessage = false;
      }, 5000);
    },
  },
  computed: {
    checkIfSomeChecked() {
      return this.exercises.some(item => item.checked.forAdd);
    },
  },
};
</script>

<style scoped lang="scss"></style>
