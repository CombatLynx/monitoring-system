<template>
  <div class="data-table__prime">
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
    <div class="data-table__prime_button">
      <Button label="Задать параметры" class="set-modal" @click="toggleModal"/>
      <Button label="Скачать в .xls" class="export-data" @click="exportData"/>
    </div>
    <DataTable v-model:filters="filters"
               paginator :rows="50" :rowsPerPageOptions="[50, 100, 200]"
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
  </div>
</template>

<script>
import {dataTable} from "@/data/DataTable"
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
    records: dataTable,
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

<style>
.data-table__prime .p-datatable-wrapper {
  border-radius: 10px;
}
.data-table__prime .p-paginator {
  margin-top: 20px;
  background: #eeeeee;
}
.data-table__prime .item-list {
  cursor: pointer;
  margin: 10px auto;
  padding: 4px 0 4px 0;
}
.data-table__prime .item-list:hover {
  background: #efefef;
  border-radius: 5px;
}
.data-table__prime .item-list.active {
  background: #C5C4C4;
  border-radius: 5px;
}
.data-table__prime_button {
  display: flex;
  margin-bottom: 20px;
}
.data-table__prime_button button:first-child {
  margin-right: 20px;
}
.data-table__prime .set-modal {
  padding: 5px;
}
.data-table__prime .export-data {
  padding: 5px;
}
.p-paginator .p-paginator-pages .p-paginator-page {
  color: #656565;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: #55a955;
  border-color: #55a955;
  color: white;
}
.p-paginator .p-paginator-pages .p-paginator-page:not(.p-highlight):hover {
  background: #55a95587;
  border-color: #55a95587;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 5px;
}
.p-dropdown {
  border-radius: 5px;
}
.p-dropdown-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
}
.p-dropdown:not(.p-disabled):hover {
  border-color: #55a955;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  background: #55a95587;
}
.p-dropdown:not(.p-disabled).p-focus {
  border-color: #55a95587;
  box-shadow: 0 0 0 0.2rem #55a95587;
}
.p-datatable-table * {
  padding: 4px 6px 4px 6px;
}
.p-datatable-table td {
  padding: 4px 6px 4px 20px;
}
.p-column-header-content svg {
  width: 25px;
  height: 25px;
}
.p-column-filter button {
  display: none;
}
.p-datatable .p-sortable-column:not(.p-highlight):hover,
.p-datatable .p-sortable-column:not(.p-highlight):hover svg {
  background: #495057;
  color: #e9ecef;
}
.p-datatable .p-sortable-column.p-highlight,
.p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
  color: #495057;
}
.p-datatable .p-sortable-column.p-highlight:hover {
  background: #C5C4C4;
}
.p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2rem #C5C4C4;
  border-color: #495057;
}
.p-inputtext:enabled:hover {
  border-color: #495057;
}
</style>