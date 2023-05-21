<template>
  <nav>
    <router-link to="/history">History</router-link> |
    <router-link to="/">Workout</router-link> |
    <router-link to="/exercises">Exercises</router-link>
  </nav>
  <router-view
    :exercises="exercises"
    :workout="workout"
    :history="history"
    @add-exercise="addExercise"
    :showAddNew="showAddNew"
    @toggle-show-add-new="toggleShowAddNew"
    :isWorkingOut="isWorkingOut"
    @toggle-isWorkingOut="toggleIsWorkingOut"
    :isSelectingExercise="isSelectingExercise"
    @toggle-isSelectingExercise="toggleIsSelectingExercise"
    @check-exercise="checkExercise"
    @delete-exercises="deleteExercises"
    @add-exercises-to-workout="addExercisesToWorkout"
    @delete-exercise-from-workout="deleteExerciseFromWorkout"
    @update-exercise-sets="updateExerciseSets"
    @finish-workout="finishWorkout"
    @check-workout="checkWorkout"
    @delete-workouts="deleteWorkouts"
  />
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data() {
    return {
      showAddNew: false,
      isWorkingOut: false,
      isSelectingExercise: false,
      workout: {},
      history: [],
      exercises: [
        {
          name: 'Running',
          type: 'cardio',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            time: '',
            km: '',
          },
        },
        {
          name: 'Push up',
          type: 'strength',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            kg: '',
            reps: '',
          },
        },
        {
          name: 'Cycling',
          type: 'cardio',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            time: '',
            km: '',
          },
        },
        {
          name: 'Squat',
          type: 'strength',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            kg: '',
            reps: '',
          },
        },
        {
          name: 'Deadlift',
          type: 'strength',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            kg: '',
            reps: '',
          },
        },
        {
          name: 'Pull up',
          type: 'strength',
          id: uuidv4(),
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            kg: '',
            reps: '',
          },
        },
      ],
    };
  },
  methods: {
    toggleShowAddNew() {
      this.showAddNew = !this.showAddNew;
    },
    toggleIsWorkingOut() {
      if (this.isWorkingOut) {
        if (confirm('Cancel workout?')) {
          this.endWorkout();
        }
      } else {
        this.startWorkout();
      }
    },
    startWorkout() {
      this.isWorkingOut = true;
      this.workout.startTime = Date.now();
      this.workout.exercises = [];
      this.workout.id = uuidv4();
      this.workout.checked = false;
      console.log('current workout: ', this.workout);
    },
    endWorkout() {
      this.isWorkingOut = false;
      this.isSelectingExercise = false;
      this.unselectedExercises();
      this.workout = {};
    },
    unselectedExercises() {
      this.exercises.forEach(item => (item.checked.forAdd = false));
    },
    toggleIsSelectingExercise() {
      if (this.isSelectingExercise) this.unselectedExercises();
      this.isSelectingExercise = !this.isSelectingExercise;
    },
    addExercise(data) {
      const newExercise = data;
      newExercise.id = uuidv4();
      newExercise.checked = {
        forDelete: false,
        forAdd: false,
      };
      if (newExercise.type === 'strength') {
        newExercise.properties = {
          kg: '',
          reps: '',
        };
      } else if (newExercise.type === 'cardio') {
        newExercise.properties = {
          time: '',
          km: '',
        };
      }
      this.exercises = [...this.exercises, data];
      console.log('exercises: ', this.exercises);
    },
    checkExercise(exercise, parent) {
      const index = this.exercises.findIndex(item => item.id === exercise.id);
      if (parent === 'ExercisesView') {
        this.exercises[index].checked.forDelete =
          !this.exercises[index].checked.forDelete;
      } else if (parent === 'HomeView') {
        this.exercises[index].checked.forAdd =
          !this.exercises[index].checked.forAdd;
      }
    },
    deleteExercises() {
      if (confirm('Delete selected?')) {
        this.exercises = this.exercises.filter(item => !item.checked.forDelete);
      }
    },
    addExercisesToWorkout() {
      this.exercises.forEach(item => {
        if (item.checked.forAdd) {
          const newItem = { ...item, id: uuidv4(), sets: [] };
          this.workout.exercises.push(newItem);
        }
      });
      console.log('workout exercises:', this.workout.exercises);
      this.toggleIsSelectingExercise();
    },
    deleteExerciseFromWorkout(exercise) {
      this.workout.exercises = this.workout.exercises.filter(
        item => item.id !== exercise.id
      );
    },
    updateExerciseSets(exercise) {
      const index = this.workout.exercises.findIndex(
        item => item.id === exercise.id
      );
      this.workout.exercises[index].sets = exercise.sets;
      console.log('updated sets:', this.workout);
    },
    finishWorkout() {
      this.workout.finishTime = Date.now();
      // check if there's any empty sets
      // 1) map through all exercises
      this.workout.exercises = this.workout.exercises.map(exercise => {
        // 2) for each exercise filter it's sets
        const filteredSets = exercise.sets.filter(set => {
          // 3) for each set.properties obj check if ALL of it's values are empty
          return Object.values(set.properties).every(
            property => property !== ''
          );
        });
        // 4) return new exercise obj with filtered sets
        return { ...exercise, sets: filteredSets };
      });
      this.history.push(this.workout);
      this.endWorkout();
      console.log('history: ', this.history);
    },
    checkWorkout(workout) {
      const index = this.history.findIndex(item => item.id === workout.id);
      this.history[index].checked = !this.history[index].checked;
      console.log('history: ', this.history);
    },
    deleteWorkouts() {
      if (confirm('Delete selected?')) {
        this.history = this.history.filter(item => !item.checked);
      }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.exercises,
.history,
.home {
  padding: 0 30px 90px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

ul {
  list-style: none;
}

// for now - instead of some responsive design
#app {
  max-width: 768px;
}

button {
  max-width: calc(768px - 60px);
}

#app {
  margin: 0 auto;
}
</style>
