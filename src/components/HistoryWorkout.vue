<template>
  <li
    :class="`workout ${checkIfChecked ? 'checked' : ''}`"
    @click="emitCheckWorkout"
  >
    <div class="workout__header">
      <p class="workout__heading">
        <strong>{{ getWorkoutTimes.title }}</strong>
        <span v-if="checkIfChecked" class="workout__tick">✔</span>
      </p>
      <p>
        <span>
          {{ getWorkoutTimes.date }}
        </span>
        &nbsp;|&nbsp;
        <span>
          <i class="fa-solid fa-clock"></i>&nbsp;{{ getWorkoutTimes.duration }}
        </span>
      </p>
    </div>
    <div class="workout__content">
      <div v-for="(exercise, i) in workout.exercises" :key="i" class="exercise">
        <p class="exercise__name">{{ exercise.name }}</p>
        <p v-for="set in exercise.sets" :key="set.index" class="set">
          <span class="set__index">{{ set.index }}</span>
          <span
            v-for="(objKey, i) in Object.keys(set.properties)"
            :key="i"
            class="set__property"
          >
            <i v-if="objKey === 'time'" class="fa-solid fa-clock"></i>
            {{
              `${set.properties[objKey]} ${objKey !== 'time' ? objKey : ''}`
            }}</span
          >
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'HistoryWorkout',
  props: {
    workout: Object,
  },
  emits: ['check-workout'],
  methods: {
    emitCheckWorkout() {
      this.$emit('check-workout', this.workout);
    },
  },
  computed: {
    checkIfChecked() {
      return this.workout.checked;
    },

    getWorkoutTimes() {
      // get starting time
      const startingTime = new Date(this.workout.startTime);
      // get the hours digit
      const hours = startingTime.getHours();
      let title = '';
      // set title based on time of the day
      if (hours >= 4 && hours < 12) title = 'Morning workout';
      else if (hours >= 12 && hours < 18) title = 'Afternoon workout';
      else if (hours >= 18 && hours < 22) title = 'Evening workout';
      else if (hours >= 22 && hours < 4) title = 'Night workout';

      // set date string
      const date = startingTime.toLocaleDateString('en-GB', {
        month: 'long',
        weekday: 'long',
        day: 'numeric',
      });

      // get duration hours
      const durationHours = new Date(
        this.workout.finishTime - this.workout.startTime
      ).getUTCHours();

      // get duration minutes
      const durationMinutes = new Date(
        this.workout.finishTime - this.workout.startTime
      ).getUTCMinutes();

      // get duration seconds
      const durationSeconds = new Date(
        this.workout.finishTime - this.workout.startTime
      ).getUTCSeconds();

      let duration;

      // set duration string
      if (durationSeconds) duration = `${durationSeconds}s`;
      if (durationMinutes) duration = `${durationMinutes}m ${durationSeconds}s`;
      if (durationHours) duration = `${durationHours}h ${durationMinutes}m`;

      // return object
      return {
        title: title,
        date: date,
        duration: duration,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.workout {
  cursor: pointer;
  border-bottom: 1px solid gray;
  padding: 15px;

  &:hover {
    background-color: rgb(241, 241, 241);
  }

  &.checked {
    background-color: rgb(241, 241, 241);
  }

  &:first-of-type {
    border-top: 1px solid gray;
  }

  &__heading {
    display: flex;
    justify-content: space-between;

    & strong {
      font-size: 17px;
    }
  }

  &__header {
    text-align: left;
    line-height: 1.5;
  }

  &__tick {
    font-weight: bold;
  }

  &__content {
    padding-top: 20px;
  }
}

.exercise {
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  & p {
    text-align: left;
  }

  &__name {
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: capitalize;
  }
}

.set {
  padding: 0 10px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  margin: 5px 0;

  &__index {
    font-weight: bold;
  }
}
</style>
