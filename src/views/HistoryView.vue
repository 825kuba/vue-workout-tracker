<template>
  <div class="history">
    <main>
      <h1>Workout history</h1>
      <ul>
        <HistoryWorkout
          v-for="workout in history"
          :workout="workout"
          :key="workout.id"
          @check-workout="emitCheckWorkout"
        />
      </ul>
    </main>
    <aside>
      <Button
        v-if="checkIfSomeChecked"
        text="Delete selected workouts"
        styles="red floating"
        class="floating"
        @btn-click="$emit('delete-workouts')"
      ></Button>
    </aside>
  </div>
</template>

<script>
import HistoryWorkout from '@/components/HistoryWorkout.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'HistoryView',
  components: {
    HistoryWorkout,
    Button,
  },
  props: {
    history: Array,
  },
  emits: ['check-workout', 'delete-workouts'],
  methods: {
    emitCheckWorkout(workout) {
      this.$emit('check-workout', workout);
    },
  },
  computed: {
    checkIfSomeChecked() {
      return this.history.some(item => item.checked);
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

ul {
  display: flex;
  flex-direction: column;
}
</style>
