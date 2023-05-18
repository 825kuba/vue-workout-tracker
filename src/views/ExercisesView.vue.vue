<template>
  <div class="exercises">
    <h1>List of exercises</h1>
    <aside>
      <Button
        :text="`${showAddNew ? 'Hide' : 'Add New Excercise'}`"
        @click="toggleShowForm"
      />
      <AddExercise v-if="showAddNew" @add-exercise="passObj" />
    </aside>
    <main>
      <ListContainer :exercises="exercises" />
    </main>
  </div>
</template>

<script>
import AddExercise from '@/components/AddExercise.vue';
// import Exercise from '@/components/Exercise.vue';
import ListContainer from '@/components/ListContainer.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'ExercisesView',
  components: {
    AddExercise,
    // Exercise,
    ListContainer,
    Button,
  },
  emits: ['add-exercise'],
  props: {
    exercises: Array,
  },
  data() {
    return {
      showAddNew: false,
    };
  },
  methods: {
    passObj(obj) {
      this.$emit('add-exercise', obj);
    },
    toggleShowForm() {
      this.showAddNew = !this.showAddNew;
    },
  },
};
</script>

<style scoped>
.exercises {
  padding: 0 20px;
}

h1 {
  margin-bottom: 30px;
}

aside {
  margin-bottom: 30px;
}
</style>
