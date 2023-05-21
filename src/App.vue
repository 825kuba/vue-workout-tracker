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
    :isFetchingData="isFetchingData"
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
      isFetchingData: false,
      workout: {},
      history: [],
      exercises: [],
    };
  },

  // fetch data from backend on reload
  async created() {
    const [exercises, history] = await Promise.all([
      this.getData('exercises'),
      this.getData('history'),
    ]);
    // make sure data isn't empty
    if (exercises) this.exercises = [...exercises];
    if (history) this.history = [...history];
  },

  methods: {
    // show add new exercise form
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
      // prepare new workout object structure
      this.workout.startTime = Date.now();
      this.workout.exercises = [];
      this.workout.id = uuidv4();
      this.workout.checked = false;
    },

    endWorkout() {
      this.isWorkingOut = false;
      this.isSelectingExercise = false;
      this.unselectedExercises();
      this.workout = {};
    },

    // used to make sure items checked state doesn't persist
    unselectedExercises() {
      this.exercises.forEach(item => (item.checked.forAdd = false));
    },

    toggleIsSelectingExercise() {
      if (this.isSelectingExercise) this.unselectedExercises();
      this.isSelectingExercise = !this.isSelectingExercise;
    },

    async addExercise(data) {
      // prepare new exercise object structure
      const newExercise = { ...data };
      newExercise.id = uuidv4();
      newExercise.checked = {
        forDelete: false,
        forAdd: false,
      };
      // these properties are filled in by user when working out
      if (newExercise.type === 'strength') {
        newExercise.properties = {
          kg: '0',
          reps: '0',
        };
      } else if (newExercise.type === 'cardio') {
        newExercise.properties = {
          time: '0:00',
          km: '0',
        };
      }
      // add new exercise to list
      this.exercises = [...this.exercises, newExercise];
      // post new exercise to Firebase
      await this.postData('exercises', newExercise);
    },

    // used to check exercise in 2 diffferent views
    checkExercise(exercise, parent) {
      // find the right exercise
      const index = this.exercises.findIndex(item => item.id === exercise.id);
      // based on where the check (click on exercise) happened, change the right property
      if (parent === 'ExercisesView') {
        this.exercises[index].checked.forDelete =
          !this.exercises[index].checked.forDelete;
      } else if (parent === 'WorkoutView') {
        this.exercises[index].checked.forAdd =
          !this.exercises[index].checked.forAdd;
      }
    },

    async deleteExercises() {
      if (confirm('Delete selected?')) {
        // delete selected(checked) exercises from list
        this.exercises = this.exercises.filter(item => !item.checked.forDelete);
        // PUT the whole list to Firebase
        await this.updateData('exercises', this.exercises);
      }
    },

    addExercisesToWorkout() {
      // loop through all exercises
      this.exercises.forEach(item => {
        // if the right property checked
        if (item.checked.forAdd) {
          // prepare new object structure
          const newItem = { ...item, id: uuidv4(), sets: [] };
          // push exercises to list
          this.workout.exercises.push(newItem);
        }
      });
      // toggle the selecting process
      this.toggleIsSelectingExercise();
    },

    deleteExerciseFromWorkout(exercise) {
      // filter list based on argument object's ID
      this.workout.exercises = this.workout.exercises.filter(
        item => item.id !== exercise.id
      );
    },

    updateExerciseSets(exercise) {
      // find the right exercise
      const index = this.workout.exercises.findIndex(
        item => item.id === exercise.id
      );
      // updated it's sets
      this.workout.exercises[index].sets = exercise.sets;
    },

    async finishWorkout() {
      // get finishing time
      this.workout.finishTime = Date.now();
      // push workout to list
      this.history.push(this.workout);
      // post workout to Firebase
      await this.postData('history', this.workout);
      this.endWorkout();
    },

    checkWorkout(workout) {
      // find the correct workout
      const index = this.history.findIndex(item => item.id === workout.id);
      //toggle checked property
      this.history[index].checked = !this.history[index].checked;
    },

    async deleteWorkouts() {
      if (confirm('Delete selected?')) {
        // filter workouts list
        this.history = this.history.filter(item => !item.checked);
        // PUT the whole list to Firebase
        await this.updateData('history', this.history);
      }
    },

    async getData(url) {
      try {
        // toggle fetching state - used to display loading message
        this.isFetchingData = true;
        const response = await fetch(
          `https://workout-tracker-fb5f9-default-rtdb.europe-west1.firebasedatabase.app/${url}.json`
        );
        if (!response.ok) throw new Error('Something went wrong');
        const data = await response.json();
        // data could be empty
        if (!data) {
          this.isFetchingData = false;
          return null;
        }
        // convert reciebed object into array
        const dataArr = Object.values(data);
        this.isFetchingData = false;
        return dataArr;
      } catch (err) {
        this.isFetchingData = false;
        alert(err.message);
      }
    },

    async postData(url, data) {
      // post the data to the coresponding url
      try {
        const response = await fetch(
          `https://workout-tracker-fb5f9-default-rtdb.europe-west1.firebasedatabase.app/${url}.json`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) throw new Error('Something went wrong');
      } catch (err) {
        alert(err.message);
      }
    },

    async updateData(url, data) {
      // update data - used with whole lists
      try {
        const res = await fetch(
          `https://workout-tracker-fb5f9-default-rtdb.europe-west1.firebasedatabase.app/${url}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        if (!res.ok) throw new Error('Something went wrong');
      } catch (err) {
        alert(err.message);
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

  // replacement for responsive design
  max-width: 768px;
  margin: 0 auto;
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

ul {
  list-style: none;
}
</style>
