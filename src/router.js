import {createRouter, createWebHistory} from 'vue-router'
import MainContentPage from "@/views/MainContentPage.vue";

const routes = [
    {
        path: "/",
        component: MainContentPage,
    },
    {
        path: "/general-information",
        component: () => import('./components/GeneralInformation.vue')
    },
    {
        path: "/building-report",
        component: () => import('./components/BuildingReport.vue')
    },
    {
        path: "/plotting-reports",
        component: () => import('./components/PlottingReports.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;