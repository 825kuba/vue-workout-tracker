<template>
  <li class="exercise">
    <form @submit.prevent action="">
      <!-- exercise title -->
      <div :class="`exercise__heading ${sets.length ? '' : 'margin'}`">
        <p class="exercise__name">{{ exercise.name }}</p>
        <!-- delete exercise btn that shows on heading hover -->
        <Button
          text="Delete"
          class="red narrow"
          type="button"
          @btn-click="deleteExerciseFromWorkout"
        ></Button>
      </div>

      <!-- table for exercise sets display -->
      <table v-if="sets.length">
        <tr>
          <!-- empty cell used to move heading to 2nd and 4rd collumn -->
          <td>&nbsp;</td>
          <!-- cell containg names of exercise properties -->
          <th
            v-for="(objKey, i) in Object.keys(exercise.properties)"
            :key="i"
            class="exercise__properties"
          >
            <!-- the actual label with property name -->
            <label :for="objKey">{{ objKey }}</label>
          </th>
        </tr>

        <!-- input field for each exercise property -->
        <tr v-for="(set, index) in sets" :key="set.index" class="exercise__set">
          <!-- set index number -->
          <th class="exercise__set__index">{{ set.index }}</th>
          <!-- cell containing input field -->
          <td v-for="(objKey, i) in Object.keys(set.properties)" :key="i">
            <input
              type="text"
              :id="objKey"
              v-model="sets[index].properties[objKey]"
              @focus="focusInput"
              @blur="blurInput"
            />
          </td>
        </tr>
      </table>
      <!-- add / remove set btns -->
      <div class="exercise__btns">
        <!-- when there is any sets, this btn gets smaller -->
        <Button
          type="submit"
          :text="`+ ${sets.length ? '' : 'Add'} set`"
          :class="`gray ${sets.length ? 'clipped-left' : ''}`"
          @btn-click="addSet"
        ></Button>
        <!-- when there is any sets, this btn gets rendered -->
        <Button
          v-if="sets.length"
          type="button"
          text="- set"
          class="red clipped-right"
          @btn-click="removeSet"
        ></Button>
      </div>
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
      // used to store exercise sets
      sets: [],
      // used to store set index number
      counter: 0,
    };
  },
  methods: {
    addSet() {
      // increment counter
      this.counter++;
      // prepare set object structure
      const set = {
        index: this.counter,
        properties: { ...this.exercise.properties },
      };
      // add to list of sets
      this.sets.push(set);
    },

    removeSet() {
      // filter sets based on index property - remove the one which equals to the current counter value
      this.sets = this.sets.filter(set => set.index !== this.counter);
      // decrement counter
      this.counter--;
    },

    deleteExerciseFromWorkout() {
      this.$emit('delete-exercise-from-workout', this.exercise);
    },

    focusInput(e) {
      // if user focused input field and the value is still the default value
      if (e.target.value === '0' || e.target.value === '0:00') {
        // empty the input field value
        e.target.value = '';
      }
    },

    blurInput(e) {
            // if user focused blurs field and the value is empty
      if (e.target.value === '') {
        // set the input field value back to the default value
        e.target.value = e.target.id === 'time' ? '0:00' : '0';
      }
    },
  },
  created() {
    // get the sets array from props
    this.sets = this.exercise.sets;
  },

  updated() {
    // prepare the object structure
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


    // easier to set here than in the Button component
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
    & input {
      background-color: rgb(199, 199, 199);
      border-radius: 5px;
    }

    & input {
      border: none;
      padding: 5px 10px;
      text-align: center;

      @media screen and (max-width: 470px) {
        max-width: 100px;
      }
      @media screen and (max-width: 320px) {
        max-width: 80px;
      }
      @media screen and (max-width: 270px) {
        max-width: 50px;
      }
    }
  }

  & table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

  &__btns {
    display: flex;
  }
}
</style>
