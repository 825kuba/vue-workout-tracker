<template>
  <nav>
    <router-link to="/history">History</router-link> |
    <router-link to="/">Workout</router-link> |
    <router-link to="/exercises">Exercises</router-link>
  </nav>
  <router-view
    :exercises="exercises"
    :workout="workout"
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
    @finish-workout="finishWorkout"
  />
</template>

<script>
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
          id: 1,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            time: {
              minutes: 0,
              seconds: 0,
            },
            distance: {
              km: 0,
              m: 0,
            },
          },
        },
        {
          name: 'Push up',
          type: 'strength',
          id: 2,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            weight: 0,
            reps: 0,
          },
        },
        {
          name: 'Cycling',
          type: 'cardio',
          id: 3,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            time: {
              minutes: 0,
              seconds: 0,
            },
            distance: {
              km: 0,
              m: 0,
            },
          },
        },
        {
          name: 'Squat',
          type: 'strength',
          id: 4,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            weight: 0,
            reps: 0,
          },
        },
        {
          name: 'Deadlift',
          type: 'strength',
          id: 5,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            weight: 0,
            reps: 0,
          },
        },
        {
          name: 'Pull up',
          type: 'strength',
          id: 6,
          checked: {
            forDelete: false,
            forAdd: false,
          },
          properties: {
            weight: 0,
            reps: 0,
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
        alert('Cancel workout?');
        this.endWorkout();
      } else {
        this.isWorkingOut = true;
        this.workout.time = Date.now();
        console.log(this.workout.time);
      }
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
      newExercise.id = this.exercises.length + 1;
      newExercise.checked = false;
      if (newExercise.type === 'strength') {
        newExercise.properties = {
          weight: 0,
          reps: 0,
        };
      } else if (newExercise.type === 'cardio') {
        newExercise.properties = {
          time: {
            minutes: 0,
            seconds: 0,
          },
          distance: {
            km: 0,
            m: 0,
          },
        };
      }
      this.exercises = [...this.exercises, data];
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
      alert('Delete selected?');
      this.exercises = this.exercises.filter(item => !item.checked.forDelete);
    },
    addExercisesToWorkout() {
      let addedExercises = [];
      this.exercises.forEach(item => {
        if (item.checked.forAdd) {
          addedExercises.push(item);
        }
      });
      this.workout.exercises = [...addedExercises];
      console.log('workout exercises:', this.workout.exercises);
      this.toggleIsSelectingExercise();
    },
    finishWorkout() {
      console.log('finished');
      // do stuff
      this.endWorkout();
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
}
</style>
