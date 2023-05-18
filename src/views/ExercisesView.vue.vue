<template>
  <div class="exercises">
    <h1>List of exercises</h1>
    <aside>
      <Button
        :text="`${showAddNew ? 'Cancel' : 'Add New Excercise'}`"
        :color="`${showAddNew ? 'red' : 'green'}`"
        @btn-click="$emit('toggle-show-add-new')"
      ></Button>
      <AddExercise v-if="showAddNew" @add-exercise="passObj" />
    </aside>
    <main>
      <ListContainer :exercises="exercises" />
    </main>
  </div>
</template>

<script>
import AddExercise from '@/components/AddExercise.vue';
import ListContainer from '@/components/ListContainer.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'ExercisesView',
  components: {
    AddExercise,
    ListContainer,
    Button,
  },
  emits: ['add-exercise', 'toggle-show-add-new'],
  props: {
    exercises: Array,
    showAddNew: Boolean,
  },

  methods: {
    passObj(obj) {
      this.$emit('add-exercise', obj);
    },
  },
};
</script>

<style scoped>
.exercises {
  padding: 0 30px 30px 30px;
}

h1 {
  margin-bottom: 30px;
}

aside {
  margin-bottom: 30px;
}
</style>
