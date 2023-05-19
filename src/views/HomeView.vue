<template>
  <div class="home">
    <Button
      :text="`${isWorkingOut ? 'Cancel workout' : 'Start workout'}`"
      :styles="`${isWorkingOut ? 'red' : 'blue'} big-font`"
      @btn-click="$emit('toggle-isWorkingOut')"
    ></Button>
    <Workout v-if="isWorkingOut" :workout="workout"/>
    <Button
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
      />
      <Button
        v-if="checkIfSomeChecked"
        text="Add exercises to workout"
        styles="green floating"
        @btn-click="$emit('add-exercises-to-workout')"
        class="floating"
      ></Button>
    </aside>
    <Button
      v-if="isWorkingOut"
      text="Finish workout"
      class="blue big-font"
      @btn-click="$emit('finish-workout')"
    ></Button>
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
  ],
  methods: {
    emitCheckExercise(exercise, parent) {
      this.$emit('check-exercise', exercise, parent);
    },
  },
  computed: {
    checkIfSomeChecked() {
      return this.exercises.some(item => item.checked.forAdd);
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
