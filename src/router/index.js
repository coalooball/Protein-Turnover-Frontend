import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@/pages/Home.vue")
const Jobs = () => import("@/pages/Jobs.vue")
const InspectEnvelopeFit = () => import("@/pages/InspectEnvelopeFit.vue")
const CompareEnvelopeFit = () => import("@/pages/CompareEnvelopeFit.vue")
const BatchExport = () => import("@/pages/BatchExport.vue")
const Preparation = () => import("@/pages/Preparation.vue")

const routes = [
  { path: "/protein_turnover", component: Home },
  { path: "/protein_turnover/jobs", component: Jobs },
  { path: "/protein_turnover/inspect_envelope_fit", component: InspectEnvelopeFit },
  { path: "/protein_turnover/compare_envelope_fit", component: CompareEnvelopeFit },
  { path: "/protein_turnover/batch_export", component: BatchExport },
  { path: "/protein_turnover/preparation", component: Preparation },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
