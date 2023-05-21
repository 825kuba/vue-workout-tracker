<template>
  <div class="exercises">
    <h1>List of exercises</h1>

    <!-- add exercises section -->
    <aside>
      <Button
        type="button"
        :text="`${showAddNew ? 'Cancel' : 'Add New Excercise'}`"
        :styles="`${showAddNew ? 'red' : 'green'}`"
        @btn-click="$emit('toggle-show-add-new')"
      ></Button>
      <AddExercise v-if="showAddNew" @add-exercise="emitAddExercise" />
    </aside>

    <main>
      <!-- exercises list -->
      <Exercises
        :exercises="exercises"
        @check-exercise="emitCheckExercise"
        :isFetchingData="isFetchingData"
      />

      <!-- delete btn -->
      <Button
        type="button"
        v-if="checkIfSomeChecked"
        text="Delete selected exercises"
        styles="red floating"
        @btn-click="$emit('delete-exercises')"
        class="floating"
      ></Button>
    </main>
  </div>
</template>

<script>
import AddExercise from '@/components/AddExercise.vue';
import Exercises from '@/components/Exercises.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'ExercisesView',
  components: {
    AddExercise,
    Exercises,
    Button,
  },
  emits: [
    'add-exercise',
    'toggle-show-add-new',
    'check-exercise',
    'delete-exercises',
  ],
  props: {
    exercises: Array,
    showAddNew: Boolean,
    isFetchingData: Boolean,
  },
  methods: {
    emitAddExercise(obj) {
      this.$emit('add-exercise', obj);
    },
    emitCheckExercise(exercise, parent) {
      this.$emit('check-exercise', exercise, parent);
    },
  },
  computed: {
    checkIfSomeChecked() {
      return this.exercises.some(item => item.checked.forDelete);
    },
  },
};
</script>

<style scoped>
.exercises {
  padding: 0 30px 90px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

aside {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
