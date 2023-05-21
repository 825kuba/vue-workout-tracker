import { createRouter, createWebHistory } from 'vue-router';
import WorkoutView from '../views/WorkoutView.vue';
import HistoryView from '@/views/HistoryView.vue';
import ExercisesView from '@/views/ExercisesView.vue';

const routes = [
  {
    path: '/',
    name: 'workout',
    component: WorkoutView,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExercisesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
