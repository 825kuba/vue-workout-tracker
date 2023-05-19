<template>
  <li class="exercise" @click="checkExercise">
    <span class="exercise__letter">{{ firstLetter }}</span>
    <div class="exercise__content">
      <p class="name">
        {{ exercise.name }}
      </p>
      <p class="type">{{ exercise.type }}</p>
    </div>
    <span v-if="checkIfChecked" class="exercise__tick">✔</span>
  </li>
</template>

<script>
export default {
  name: 'Exercise',
  props: {
    exercise: Object,
  },
  emit: ['check-exercise'],
  data() {
    return {
      firstLetter: `${this.exercise.name.slice(0, 1).toUpperCase()}`,
    };
  },
  methods: {
    checkExercise() {
      const parent = `${this.$parent.$parent.$options.name}`;
      this.$emit('check-exercise', this.exercise, parent);
    },
  },
  computed: {
    checkIfChecked() {
      const parent = this.$parent.$parent.$options.name;
      if (parent === 'ExercisesView') {
        return this.exercise.checked.forDelete;
      } else if (parent === 'HomeView') {
        return this.exercise.checked.forAdd;
      } else return false;
    },
  },
};
</script>

<style scoped lang="scss">
.exercise {
  display: flex;
  border-bottom: 1px solid gray;
  padding: 15px 10px;
  cursor: pointer;
  // transition: 0.15s ease-in-out background-color;

  &:hover {
    background-color: rgb(241, 241, 241);
    // background-color: rgb(77, 77, 248, 0.1);
  }

  &:first-of-type {
    border-top: 1px solid gray;
  }

  & span {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  &__letter {
    justify-content: flex-start;
    padding: 0 20px 0 0;
    font-size: 25px;
  }

  &__tick {
    justify-content: flex-end;
  }

  &__content {
    flex: 9;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;

    & p {
      text-transform: capitalize;
      word-break: break-all;
      text-align: left;
    }

    & .name {
      font-weight: bold;
      font-size: 18px;
    }

    & .type {
      font-size: 14px;
    }
  }
}
</style>
