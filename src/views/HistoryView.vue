<template>
  <div class="history">
    <main>
      <h1>Workout history</h1>

      <!-- render list in reverse - to show the latest workout first -->
      <ul>
        <HistoryWorkout
          v-for="workout in history.slice().reverse()"
          :workout="workout"
          :key="workout.id"
          @check-workout="emitCheckWorkout"
        />
      </ul>

      <!-- loading message -->
      <h2 v-if="isFetchingData">Loading workout history...</h2>
      <!-- empty list message -->
      <h2 v-if="!isFetchingData && !history.length">
        Start a workout to see your history!
      </h2>
    </main>
    <!-- delete btn -->
    <aside>
      <Button
        type="button"
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
    isFetchingData: Boolean,
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
.history {
  padding: 0 30px 90px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

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
