import {createRouter, createWebHistory} from 'vue-router'
import MainContentPage from "@/views/MainContentPage.vue";

const routes = [
    {
        path: "/",
        component: MainContentPage,
    },
    {
        path: "/general-information",
        component: () => import('./components/GeneralInformation/GeneralInformation.vue')
    },
    {
        path: "/building-report",
        component: () => import('./components/BuildingReport/BuildingReport.vue')
    },
    {
        path: "/plotting-reports",
        component: () => import('./components/PlottingReports/PlottingReports.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;