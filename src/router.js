import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import ManageJob from './pages/ManageJob.vue';

const routes = [
    { path: '/protein_turnover', component: Home },
    { path: '/protein_turnover/manage_job', component: ManageJob },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;