<template>
  <ModalWindow
      v-show="isShowModal"
      :show="isShowModal"
      :scrollable="true"
      header-id="modalHeader"
      body-id="modalBody"
      @close="toggleModal"
  >
    <template v-slot:header>
      <h3 class="modal-title">Выберете параметры</h3>
    </template>
    <template v-slot:body>
      <div v-for="(item, index) in columns"
           :key="index"
           @click="() => onSelect(item)"
           :class="{active: item.active}"
           class="item-list">
        <span class="item">{{ item.header }}</span>
      </div>
    </template>
    <template v-slot:footer>
      <Button label="Сформировать" class="modal-footer__button" @click="sendDataFunction"/>
    </template>
  </ModalWindow>
  <Button label="Задать параметры" class="set-modal" @click="toggleModal"/>
  <Button label="Скачать в .xls" class="export-data" @click="exportData"/>
  <DataTable v-model:filters="filters"
             paginator :rows="5" :rowsPerPageOptions="[10, 20, 50, 100]"
             :value="records"
             editMode="cell"
             filterDisplay="row">
    <Column v-for="col of filteredColumns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            sortable
            filter>
      <template #filter="{ filterCallback }">
        <InputText v-model="filters.global.value" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import {DataTable} from "@/components/BuildingReport/DataTable"
import {FilterMatchMode} from "primevue/api"
import {excelParser} from "@/utils/ExcelParser"
import ModalWindow from "@/utils/ModalWindow.vue"

export default {
  name: 'DataTablePrime',
  components: {ModalWindow},
  mounted() {
    this.toggleModal()
  },
  data: () => ({
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    },
    isShowModal: false,
    countClicked: 0,
    records: DataTable,
    columns: [
      {header: "Наименование ВМ", field: "vm_name"},
      {header: "Комментарий", field: "vm_comment"},
      {header: "Описание", field: "vm_description"},
      {header: "Количество ядер CPU", field: "vm_cpu"},
      {header: "Объем ОЗУ, Мб", field: "vm_memory"},
      {header: "Объем ОЗУ, ед.изм", field: "vm_memory_beauty"},
      {header: "Объем ПЗУ, Гб", field: "vm_disk_size"},
      {header: "Объем ПЗУ, ед.изм", field: "vm_disk_size_beauty"},
      {header: "Операционная система", field: "vm_os_distribution"},
      {header: "Семейство ОС", field: "vm_os_family"},
      {header: "Версия ОС", field: "vm_os_version"},
      {header: "Кодовое наименование ОС", field: "vm_os_codename"},
      {header: "IP адрес сетевого адаптера", field: "vm_nics"},
      {header: "Наименование ИС", field: "System"},
      {header: "Владелец ", field: "Owner"},
      {header: "Приоритет восстановления", field: "Priority"},
      {header: "Дата отчета", field: "report_date"}
    ],
    clickedColumns: [],
    filteredColumns: []
  }),
  methods: {
    exportData() {
      excelParser().exportDataFromJSON(this.records, null, null)
    },
    filteringColumns() {
      this.filteredColumns = this.clickedColumns
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal
    },
    onSelect(item) {
      item.active = !item.active
      let position = this.clickedColumns.indexOf(item)
      if (!~position) {
        this.clickedColumns.push(item)
      } else {
        this.clickedColumns.splice(position, 1)
      }
      console.log(this.clickedColumns)
    },
    sendDataFunction: function() {
      if (this.clickedColumns.length === 0) {
        alert('Выбери что-то')
      } else {
        this.filteringColumns()
        this.toggleModal()
      }
    }
  }
}
</script>

<style scoped>
.item-list {
  cursor: pointer;
  margin: 10px auto;
  padding: 4px 0 4px 0;
}
.item-list:hover {
  background: #efefef;
  border-radius: 5px;
}
.item-list.active {
  background: #C5C4C4;
  border-radius: 5px;
}
.set-modal {
  padding: 5px;
}
.export-data {
  padding: 5px;
}
</style>