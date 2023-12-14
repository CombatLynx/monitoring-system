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
  <button @click="toggleModal">
    Open Modal
  </button>
  <span>search field:</span>
  <select v-model="searchField">
    <option v-for="(head, index) in headers"
            :key="index"
    >{{ head.value }}
    </option>
  </select>
  <button @click="exportData">Download file</button>
  <span>search value: </span>
  <input type="text" v-model="searchValue">
  <EasyDataTable
      v-bind:headers="headers"
      :items="records"
      :search-field="searchField"
      :search-value="searchValue"
  />
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
      {text: "Наименование ВМ", value: "vm_name"},
      {text: "Комментарий", value: "vm_comment"},
      {text: "Описание", value: "vm_description"},
      {text: "Количество ядер CPU", value: "vm_cpu"},
      {text: "Объем ОЗУ, Мб", value: "vm_memory"},
      {text: "Объем ОЗУ, ед.изм", value: "vm_memory_beauty", sortable: true},
      {text: "Объем ПЗУ, Гб", value: "vm_disk_size"},
      {text: "Объем ПЗУ, ед.изм", value: "vm_disk_size_beauty"},
      {text: "Операционная система", value: "vm_os_distribution"},
      {text: "Семейство ОС", value: "vm_os_family"},
      {text: "Версия ОС", value: "vm_os_version"},
      {text: "Кодовое наименование ОС", value: "vm_os_codename"},
      {text: "IP адрес сетевого адаптера", value: "vm_nics"},
      {text: "Наименование ИС", value: "System"},
      {text: "Владелец ", value: "Owner"},
      {text: "Приоритет восстановления", value: "Priority"},
      {text: "Дата отчета", value: "report_date"}
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
  background: yellow;
}

.item-list {
  cursor: pointer;
  margin: 10px auto;
}
</style>