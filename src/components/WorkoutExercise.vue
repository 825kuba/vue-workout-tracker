<template>
  <li class="exercise">
    <form @submit.prevent action="">
      <div :class="`exercise__heading ${sets.length ? '' : 'margin'}`">
        <p class="exercise__name">{{ exercise.name }}</p>
        <Button
          text="Delete"
          class="red narrow"
          @btn-click="deleteExerciseFromWorkout"
        ></Button>
      </div>
      <table v-if="sets.length">
        <tr>
          <td>&nbsp;</td>
          <th
            v-for="(objKey, i) in Object.keys(exercise.properties)"
            :key="i"
            class="exercise__properties"
          >
            <label :for="objKey">{{ objKey }}</label>
          </th>
        </tr>
        <tr v-for="(set, index) in sets" :key="set.index" class="exercise__set">
          <th class="exercise__set__index">{{ set.index }}</th>
          <td v-for="(objKey, i) in Object.keys(set.properties)" :key="i">
            <input
              type="text"
              :id="objKey"
              v-model="sets[index].properties[objKey]"
            />
          </td>
        </tr>
      </table>
      <Button text="+ Add set" class="gray" @btn-click="addSet"></Button>
    </form>
  </li>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'WorkoutExercise',
  components: {
    Button,
  },
  props: {
    exercise: Object,
  },
  emits: ['update-exercise-sets', 'delete-exercise-from-workout'],
  data() {
    return {
      sets: [],
      counter: 0,
    };
  },
  methods: {
    addSet() {
      const set = {
        index: this.counter + 1,
        properties: { ...this.exercise.properties },
      };
      this.sets.push(set);
      this.counter++;
    },
    deleteExerciseFromWorkout() {
      this.$emit('delete-exercise-from-workout', this.exercise);
    },
  },
  created() {
    this.sets = this.exercise.sets;
  },
  updated() {
    const updatedExercise = { ...this.exercise, sets: this.sets };
    this.$emit('update-exercise-sets', updatedExercise);
  },
};
</script>

<style scoped lang="scss">
.exercise {
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }

  &__heading {
    display: flex;
    justify-content: space-between;

    &.margin {
      margin-bottom: 5px;
    }

    & Button.narrow {
      visibility: hidden;
      opacity: 0;
      transition: 0.2s ease-in-out opacity;
    }
    &:hover {
      Button.narrow {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &__name {
    font-weight: bold;
    text-align: left;
    font-size: 17px;
    text-transform: capitalize;
    padding: 5px 0;
  }

  &__properties {
    text-transform: capitalize;
  }

  &__set {
    &__index {
      padding: 0 10px;
    }

    & th,
    input {
      background-color: rgb(199, 199, 199);
      border-radius: 5px;
    }

    & input {
      border: none;
      padding: 5px 10px;
      text-align: center;
    }
  }

  & table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }
}
</style>
