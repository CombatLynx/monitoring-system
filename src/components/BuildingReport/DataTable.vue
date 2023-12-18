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
      <div v-for="(item, index) in records"
           :key="index"
           @click="item.active = !item.active"
           :class="{active: item.active}"
           class="item-list">
        <span class="title" @click="() => onSelect(item)">{{ item.vm_name }}</span>
      </div>
    </template>
    <template v-slot:footer>
      <button class="modal-footer__button" @click="sendDataFunction">Отправить</button>
    </template>
  </ModalWindow>
  <button class="set-modal" @click="toggleModal">Задать параметры</button>
  <div>
    <span>Выберете столбец для поиска:</span>
    <select v-model="searchField">
      <option v-for="(head, index) in headers"
              :key="index"
      >{{ head.value }}
      </option>
    </select>
  </div>
  <div>
    <span>Строка поиска:</span>
    <input type="text" v-model="searchValue">
  </div>
  <div class="wrapper__data-table">
    <EasyDataTable
        v-bind:headers="headers"
        :items="records"
        :search-field="searchField"
        :search-value="searchValue"
        class="customize-table"
    />
  </div>
  <button @click="exportData">Скачать в .xls</button>
</template>

<script>
import exportFromJSON from "export-from-json"
import EasyDataTable from 'vue3-easy-data-table'
import {defineComponent, ref} from "vue"
import ModalWindow from "@/utils/ModalWindow.vue";

export const excelParser = () => {
  function exportDataFromJSON(data, newFileName, fileExportType) {
    if (!data) return;
    try {
      const fileName = newFileName || "exported-data";
      const exportType = exportFromJSON.types[fileExportType || "xls"];
      exportFromJSON({data, fileName, exportType});
    } catch (e) {
      throw new Error("Parsing failed!");
    }
  }

  return {
    exportDataFromJSON
  };
};
export default defineComponent({
  components: {
    ModalWindow,
    EasyDataTable: EasyDataTable
  },
  mounted() {
    this.toggleModal()
  },
  setup() {
    const searchField = ref("")
    const searchValue = ref("")

    return {
      searchField, searchValue
    }
  },
  data: () => ({
    clickedItems: [],
    isShowModal: false,
    headlines: ["Наименование ВМ",
      "Комментарий",
      "Описание",
      "Количество ядер CPU",
      "Объем ОЗУ, Мб",
      "Объем ОЗУ, ед.изм",
      "Объем ПЗУ, Гб",
      "Объем ПЗУ, ед.изм",
      "Операционная система",
      "Семейство ОС",
      "Версия ОС",
      "Версия ОС",
      "Версия ОС",
      "Версия ОС",
      "Кодовое наименование ОС",
      "IP адрес сетевого адаптера",
      "Наименование ИС",
      "Владелец",
      "Приоритет восстановления",
      "Дата отчета"
    ],
    headers: [
      {text: "Наименование ВМ", value: "vm_name", sortable: true},
      {text: "Комментарий", value: "vm_comment", sortable: true},
      {text: "Описание", value: "vm_description", sortable: true},
      {text: "Количество ядер CPU", value: "vm_cpu", sortable: true},
      {text: "Объем ОЗУ, Мб", value: "vm_memory", sortable: true},
      {text: "Объем ОЗУ, ед.изм", value: "vm_memory_beauty", sortable: true},
      {text: "Объем ПЗУ, Гб", value: "vm_disk_size", sortable: true},
      {text: "Объем ПЗУ, ед.изм", value: "vm_disk_size_beauty", sortable: true},
      {text: "Операционная система", value: "vm_os_distribution", sortable: true},
      {text: "Семейство ОС", value: "vm_os_family", sortable: true},
      {text: "Версия ОС", value: "vm_os_version", sortable: true},
      {text: "Кодовое наименование ОС", value: "vm_os_codename", sortable: true},
      {text: "IP адрес сетевого адаптера", value: "vm_nics", sortable: true},
      {text: "Наименование ИС", value: "System", sortable: true},
      {text: "Владелец ", value: "Owner", sortable: true},
      {text: "Приоритет восстановления", value: "Priority", sortable: true},
      {text: "Дата отчета", value: "report_date", sortable: true}
    ],
    records: [
      {
        vm_name: "AlphaBI_NFSstorage_246",
        vm_comment: "Сервер файлового хранилища NFS для AlphaBI (прод)",
        vm_description: "Сервер файлового хранилища NFS для AlphaBI (прод)",
        vm_cpu: 4,
        vm_memory: 8192,
        vm_memory_beauty: "8G",
        vm_disk_size: 310,
        vm_disk_size_beauty: "310G",
        vm_os_distribution: "CentOS Linux",
        vm_os_family: "Linux",
        vm_os_version: 7,
        vm_os_codename: "",
        vm_nics: "nic2: 10.76.241.246\n" +
            "nic3: 10.31.6.246",
        System: "AlphaBI",
        Owner: "БАРС_ГРУП",
        Priority: 4,
        report_date: "06.09.2023 15:28:52"
      },
      {
        vm_name: "BettaBI_NFSstorage_247",
        vm_comment: "Сервер файлового хранилища NFS для AlphaBI (прод)",
        vm_description: "Сервер файлового хранилища NFS для AlphaBI (прод)",
        vm_cpu: 8,
        vm_memory: 4096,
        vm_memory_beauty: "4G",
        vm_disk_size: 520,
        vm_disk_size_beauty: "520G",
        vm_os_distribution: "CentOS Linux",
        vm_os_family: "Linux",
        vm_os_version: 8,
        vm_os_codename: "",
        vm_nics: "nic2: 10.76.241.247\n" +
            "nic3: 10.31.6.247",
        System: "AlphaBI",
        Owner: "БАРС_ГРУП",
        Priority: 4,
        report_date: "06.09.2023 15:28:52"
      }
    ]
  }),
  methods: {
    exportData() {
      excelParser().exportDataFromJSON(this.records, null, null);
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    onSelect(item) {
      let position;
      position = this.clickedItems.indexOf(item)
      if (!~position) {
        this.clickedItems.push(item)
      } else {
        this.clickedItems.splice(position, 1)
      }
      console.log(this.clickedItems)
    },
    sendDataFunction: function () {
      this.toggleModal()
      console.log('clickedItems', this.clickedItems)
    }
  }
})
</script>

<style scoped>
div.active {
  background: #efefef;
  border-radius: 5px;
}
.item-list {
  cursor: pointer;
  margin: 10px auto;
  padding: 5px 0 5px 0;
}
.customize-table {
  //--easy-table-border: 1px solid #445269;
  //--easy-table-row-border: 1px solid #445269;

  //--easy-table-header-font-size: 14px;
  --easy-table-header-height: 100px;
  //--easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #74BBE4;

  --easy-table-header-item-padding: 10px 15px;

  //--easy-table-body-even-row-font-color: #fff;
  //--easy-table-body-even-row-background-color: #4c5d7a;

  //--easy-table-body-row-font-color: #c0c7d2;
  //--easy-table-body-row-background-color: #2d3a4f;
  --easy-table-body-row-height: 50px;
  //--easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  //--easy-table-footer-background-color: #2d3a4f;
  //--easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 70px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  /*--easy-table-scrollbar-track-color: #2d3a4f;*/
  /*--easy-table-scrollbar-color: #2d3a4f;*/
  /*--easy-table-scrollbar-thumb-color: #4c5d7a;;*/
  /*--easy-table-scrollbar-corner-color: #2d3a4f;*/

  //--easy-table-loading-mask-background-color: #2d3a4f;
}
.customize-table thead th {
  background-color: #f0f2f5;
}
.customize-table thead th:first-child {
  border-radius: 10px 0 0 0;
}
.customize-table thead th:last-child {
  border-radius: 0 10px 0 0;
}
</style>