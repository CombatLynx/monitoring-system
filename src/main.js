import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import 'vue3-easy-data-table/dist/style.css'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Calendar from 'primevue/calendar'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import InputText from "primevue/inputtext"
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

createApp(App)
    .use(router)
    .use(PrimeVue)
    .component("DataTable", DataTable)
    .component("Dropdown", Dropdown)
    .component("Calendar", Calendar)
    .component("Column", Column)
    .component("ColumnGroup", ColumnGroup)
    .component('Row', Row)
    .component('InputText', InputText)
    .component('Button', Button)
    .mount('#app')