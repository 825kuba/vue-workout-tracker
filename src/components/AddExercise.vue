<template>
  <form @submit.prevent="createExercise" action="">
    <fieldset>
      <label for="name">Exercise name</label>
      <input
        type="text"
        id="name"
        placeholder="Exercise name"
        v-model="newName"
        required
      />
    </fieldset>
    <fieldset>
      <label for="type"> Exercise type</label>
      <select name="type" id="type" v-model="newType" required>
        <option value="" selected disabled>--- Select type ---</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength Training</option>
      </select>
    </fieldset>
    <Button type="submit" text="Add exercise" styles="green"></Button>
  </form>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'AddExercise',
  components: {
    Button,
  },
  emits: ['add-exercise'],
  data() {
    return {
      newName: '',
      newType: '',
    };
  },
  methods: {
    createExercise() {
      // simple form validation
      if (this.newName === '' || this.newType === '') {
        alert('Please enter all the exercise details!');
        return;
      }
      // prepare object structure
      const newExercise = {
        name: this.newName,
        type: this.newType,
      };
      // reset model Value
      this.newName = '';
      this.newType = '';
      // emit new exercise
      this.$emit('add-exercise', newExercise);
    },
  },
};
</script>

<style scoped>
form {
  /* margin: 30px 0; */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

fieldset {
  /* padding: 10px 0; */
  border: none;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: flex-start;
}

input,
select {
  width: 100%;
  padding: 5px;
}

label {
  font-weight: bold;
}
</style>
