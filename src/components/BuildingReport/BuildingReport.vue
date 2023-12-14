<template>
  <div>BuildingReports</div>
  <DataTable></DataTable>
</template>

<script>

import {defineComponent} from "vue";
import DataTable from "@/components/BuildingReport/DataTable.vue";

export default defineComponent({
  components: {DataTable}
})
</script>