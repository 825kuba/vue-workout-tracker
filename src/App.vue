<template>
  <nav>
    <router-link to="/history">History</router-link> |
    <router-link to="/">Workout</router-link> |
    <router-link to="/exercises">Exercises</router-link>
  </nav>
  <router-view
    :exercises="exercises"
    @add-exercise="addExercise"
    :showAddNew="showAddNew"
    @toggle-show-add-new="toggleShowAddNew"
  />
</template>

<script>
export default {
  data() {
    return {
      exercises: [
        {
          name: 'Running',
          type: 'cardio',
          id: 1,
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
          properties: {
            weight: 0,
            reps: 0,
          },
        },
      ],
      showAddNew: false,
    };
  },
  methods: {
    toggleShowAddNew() {
      this.showAddNew = !this.showAddNew;
    },
    addExercise(data) {
      console.log('adding exercise');
      const newExercise = data;
      newExercise.id = this.exercises.length + 1;
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
      console.log(this.exercises);
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
</style>
