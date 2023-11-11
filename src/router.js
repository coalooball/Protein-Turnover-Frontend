import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import About from './pages/About.vue';

const routes = [
    { path: '/protein_turnover', component: Home },
    { path: '/protein_turnover/about', component: About },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;