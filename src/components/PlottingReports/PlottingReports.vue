<template>
  <div class="plotting-report">
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
        <div v-for="(item, index) in columns"
             :key="index"
             @click="() => onSelect(item)"
             :class="{active: item.active}"
             class="item-list">
          <span class="title">{{item.header}}</span>
        </div>
      </template>
      <template v-slot:footer>
        <button class="modal-footer__button p-button" @click="sendDataFunction">Отправить</button>
      </template>
    </ModalWindow>
    <div class="data-table__prime_button">
      <Button label="Задать параметры" class="p-button plotting-report_button" @click="toggleModal"/>
    </div>
  </div>
  <div class="bar-wrapper">
    <div class="bar-block">
      <div class="bar-header">ЦПУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="line-system_1"></canvas></div>
      <div class="bar-header">ОЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="line-system_2"></canvas></div>
      <div class="bar-header">ПЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="line-system_3"></canvas></div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
import ModalWindow from "@/utils/ModalWindow.vue"
import {dataTable} from "@/data/DataTable"
import ChartDataLabels from "chartjs-plugin-datalabels";
export default {
  name: 'ChartSliderForSystem',
  components: {ModalWindow},
  data: () => ({
    clickedColumns: [],
    filteredColumns: [],
    isShowModal: false,
    loading: true,
    dataChart: [10, 39, 10, 40, 39, 0, 10],
    records: dataTable,
    columns: [
      {header: "Наименование ВМ", field: "vm_name"},
      {header: "Операционная система", field: "vm_os_distribution"},
      {header: "Семейство ОС", field: "vm_os_family"},
      {header: "Версия ОС", field: "vm_os_version"},
      {header: "Наименование ИС", field: "System"},
      {header: "Владелец ", field: "Owner"},
      {header: "Приоритет восстановления", field: "Priority"}
    ],
  }),
  mounted() {
    this.toggleModal()
    this.renderLineChart()
  },
  methods: {
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
    },
    renderLineChart: function() {
      const lineSystem1 = document.getElementById('line-system_1')
      const lineSystem2 = document.getElementById('line-system_2')
      const lineSystem3 = document.getElementById('line-system_3')

      // const charts = [ctx, ctx2, ctx3]

      const data = this.records
      const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      new Chart(lineSystem1, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: data.map(row => row.vm_cpu),
              backgroundColor: [
                '#458a45'
              ]
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              align: 'top',
              color: ['black'],
              font: {
                size: '14px'
              }
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: '20px'
                }
              }
            }
          },
          indexAxis: 'x',
          maintainAspectRatio: false,
          responsive: true
        }
      })

      new Chart(lineSystem2, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: data.map(row => row.vm_memory),
              backgroundColor: [
                '#458a45'
              ]
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              align: 'top',
              color: ['black'],
              font: {
                size: '14px'
              }
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: '20px'
                }
              }
            }
          },
          indexAxis: 'x',
          maintainAspectRatio: false,
          responsive: true
        }
      })

      new Chart(lineSystem3, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: data.map(row => row.vm_disk_size),
              backgroundColor: [
                '#458a45'
              ]
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              align: 'top',
              color: ['black'],
              font: {
                size: '14px'
              }
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: '20px'
                }
              }
            }
          },
          indexAxis: 'x',
          maintainAspectRatio: false,
          responsive: true
        }
      })
    },
    changeData: function() {
      this.dataChart = [6, 6, 3, 5, 5, 6, 6, 6, 3, 5, 5, 6];
    }
  },
  watch: {
    data: function() {
      this._chart.destroy()
      this.changeData()
    }
  }
}
</script>

<style scoped>
.item-list {
  cursor: pointer;
  margin: 10px auto;
  padding: 5px 0 5px 0;
}
.bar-wrapper {
  display: flex;
  flex-direction: column;
}
.bar-header {
  font-size: 20px;
  font-weight: bold;
}
.bar-block {
  margin: 0 auto;
}
.plotting-report .item-list {
  border-radius: 5px;
}
.plotting-report .item-list:hover {
  background: #efefef;
}
.plotting-report .item-list.active {
  background: #C5C4C4;
}
.data-table__prime_button {
  display: flex;
  margin-bottom: 20px;
}
.bar-header {
  margin-bottom: 20px;
}
.plotting-report_button {
  padding: 5px;
}
.bar-item {
  width: 1600px;
  height: 290px;
}
.bar-item:not(:last-child) {
  margin-bottom: 30px;
}
.modal-footer__button {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 1800px) {
  .bar-item {
    width: 1400px;
  }
}
@media screen and (max-width: 1550px) {
  .bar-item {
    width: 1200px;
  }
}
@media screen and (max-width: 1350px) {
  .bar-item {
    width: 1000px;
  }
}
@media screen and (max-width: 1150px) {
  .bar-item {
    width: 800px;
  }
}
</style>