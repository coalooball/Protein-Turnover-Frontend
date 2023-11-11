import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import ManageJob from './pages/ManageJob.vue';
import CreateJob from './pages/CreateJob.vue';
import InspectEnvelopeFit from './pages/InspectEnvelopeFit.vue';
import CompareEnvelopeFit from './pages/CompareEnvelopeFit.vue';
import BatchExport from './pages/BatchExport.vue';
import Preview from './pages/Preview.vue';

const routes = [
    { path: '/protein_turnover', component: Home },
    { path: '/protein_turnover/manage_job', component: ManageJob },
    { path: '/protein_turnover/create_job', component: CreateJob },
    { path: '/protein_turnover/inspect_envelope_fit', component: InspectEnvelopeFit },
    { path: '/protein_turnover/compare_envelope_fit', component: CompareEnvelopeFit },
    { path: '/protein_turnover/batch_export', component: BatchExport },
    { path: '/protein_turnover/preview', component: Preview },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;