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
        <div class="modal-title">Выберете параметры</div>
      </template>
      <template v-slot:body>
      <div class="modal-container">
        <div class="modal-header">
          <div class="header-choice">
            <div>
              <div class="flex-auto">
                <label for="buttondisplay" class="font-bold block mb-2"> Button Display </label>
                <Calendar v-model="buttondisplay" showIcon inputId="buttondisplay" />
              </div>
            </div>
            <div>
              <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
            </div>
          </div>
          <div class="header-selected">
            <Button label="Сохранить шаблон"/>
          </div>
        </div>
        <div class="modal-block">
          <div class="modal-choice">
            <div :key="group"
                 v-for="group in groupedAColumns"
                 class="row-group">
              <div class="row">
                <div v-for="(item, index) in group"
                     :key="index"
                     @click="() => onSelect(item)"
                     :class="{active: item.active}"
                     class="item-list">
                  <span class="item">{{ item.header }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-arrow">
            <button type="submit"
                    @click="() => onSelectAll()"
                    v-bind:disabled="isDisabledLeftButton"
                    class="arrow-right">----x</button>
            <button type="submit"
                    @click="() => onRemoveAll()"
                    v-bind:disabled="!isDisabledRightButton"
                    class="arrow-left">x----</button>
          </div>
          <div class="modal-selected">
            <div v-for="(item, index) in clickedColumns"
                 :key="index"
                 :class="{active: item.active}"
                 class="item-list">
              <span class="item">{{ item.header }}</span>
            </div>
          </div>
        </div>
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
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: 'DataTablePrime',
  components: {ModalWindow},
  mounted() {
    this.toggleModal()
  },
  setup() {
    return ref("")
  },
  data: () => ({
    cities: [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ],
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
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    },
    itemsRow: 9,
    isShowModal: false,
    countClicked: 0,
    records: dataTable,
    clickedColumns: [],
    filteredColumns: []
  }),
  computed: {
    isDisabledLeftButton() {
      return this.clickedColumns.length > 0;
    },
    isDisabledRightButton() {
      return this.clickedColumns.length === this.columns.length;
    },
    groupedAColumns: function() {
      return this.columns.reduce((accumulator, column, index) => {
        if (index % this.itemsRow === 0) {
          accumulator.push([column]);
        } else {
          accumulator[accumulator.length - 1].push(column);
        }

        return accumulator;
      }, []);
    }
  },
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
    onSelectAll() {
      this.columns.forEach(elem => {
        this.clickedColumns.push(elem)
        elem.active = !elem.active
      })
    },
    onRemoveAll() {
      this.clickedColumns = []
      this.columns.forEach(elem => {
        elem.active = !elem.active
      })
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
})
</script>

<style>
.header-choice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 540px;
  width: 100%;
}
.header-selected {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.modal-header {
  display: flex;
  margin-bottom: 20px;
}
.modal-choice {
  width: 100%;
  max-width: 600px;
  padding: 0 5px 0 5px;
  border: 2px solid #e2e2e2;
  display: flex;
  justify-content: space-around;
  border-radius: 8px;
}
.modal-selected {
  border: 2px solid #e2e2e2;
  width: 100%;
  max-width: 340px;
  padding: 0 5px 0 5px;
  border-radius: 8px;
}
.row-group {
  width: 100%;
}
.modal-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 60px;
}
.arrow-left,
.arrow-right {
  cursor: pointer;
}
.calendar .list-item {
  margin-top: 50px;
}
.calendar.card {
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.16);
  width: 400px;
  padding: 20px 30px;
  margin-bottom: 30px;
}
.modal-block {
  display: flex;
}
.calendar select,
.calendar input {
  border: none;
  padding: 10px 15px;
  background-color: #c1c1c1;
  border-radius: 10px;
}
.data-table__prime .p-datatable-wrapper {
  border-radius: 10px;
}
.data-table__prime .p-paginator {
  margin-top: 20px;
  background: #eeeeee;
}
.data-table__prime .item-list {
  cursor: pointer;
  margin: 10px 5px;
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
  text-align: left;
}
.data-table__prime .item-list {
  background: #e2e2e2;
}
.data-table__prime .item-list.active {
  background: #656565;
  border-radius: 5px;
  color: white;
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
  background: #458a45;
  border-color: #458a45;
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
  border-color: #458a45;
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
  padding: 8px 6px 8px 20px;
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