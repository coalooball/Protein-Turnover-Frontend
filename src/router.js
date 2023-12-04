import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Jobs from './pages/Jobs.vue';
import InspectEnvelopeFit from './pages/InspectEnvelopeFit.vue';
import CompareEnvelopeFit from './pages/CompareEnvelopeFit.vue';
import BatchExport from './pages/BatchExport.vue';
import Preparation from './pages/Preparation.vue';

const routes = [
    { path: '/protein_turnover', component: Home },
    { path: '/protein_turnover/jobs', component: Jobs },
    { path: '/protein_turnover/inspect_envelope_fit', component: InspectEnvelopeFit },
    { path: '/protein_turnover/compare_envelope_fit', component: CompareEnvelopeFit },
    { path: '/protein_turnover/batch_export', component: BatchExport },
    { path: '/protein_turnover/preparation', component: Preparation },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;