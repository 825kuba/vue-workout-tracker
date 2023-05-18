<template>
  <div class="exercise">
    <span>{{ firstLetter }}</span>
    <div class="exercise__content">
      <p class="name">
        {{ exercise.name }}
      </p>
      <p class="type">{{ exercise.type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exercise',
  props: {
    exercise: Object,
  },
  data() {
    return {
      firstLetter: `${this.exercise.name.slice(0, 1).toUpperCase()}`,
    };
  },
};
</script>

<style scoped lang="scss">
.exercise {
  display: flex;
  border-bottom: 1px solid gray;
  padding: 10px;
  margin: 10px 0;

  &:first-of-type {
    border-top: 1px solid gray;
  }

  & span {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // padding: 0 10px;
    font-weight: bold;
    font-size: 25px;
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
