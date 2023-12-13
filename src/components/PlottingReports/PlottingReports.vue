<template>
  <div class="page">
    <button class="show-modal-button" @click="showModal">Показать модальное окно</button>
    <modal-window ref="modal">
      <template v-slot:title>
        <h3 class="modal-title">Выберете параметры</h3>
      </template>
      <template v-slot:body>
        <div v-for="(item, index) in records"
             :key="index"
             @click="item.active = !item.active"
             :class="{active: item.active}"
             class="item-list">
          <span class="title" @click="() => onSelect(item)">{{item.name}}</span>
        </div>
      </template>
      <template v-slot:footer>
        <button class="modal-footer__button" @click="sendDataFunction">Отправить</button>
      </template>
    </modal-window>
  </div>
  <div class="bar-wrapper">
    <div class="bar-block">
      <div class="bar-item"><canvas id="line-system_1"></canvas></div>
      <div class="bar-item"><canvas id="line-system_2"></canvas></div>
      <div class="bar-item"><canvas id="line-system_3"></canvas></div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
import ModalWindow from "@/components/PlottingReports/SettingsWindowForPlottingReports.vue"
export default {
  name: 'ChartSliderForSystem',
  components: {ModalWindow},
  data: () => ({
    clickedItems: [],
    loading: true,
    dataChart: [10, 39, 10, 40, 39, 0, 10],
    records: [
      { id: 1, System: 'system_1',  vm_cpu: 2,  vm_memory: 2048, vm_disk_size: 4000, report_date: '06.09.2023 15:28:52', name: 'Наименование ВМ'},
      { id: 2, System: 'system_2',  vm_cpu: 4,  vm_memory: 1024, vm_disk_size: 5000, report_date: '06.09.2023 15:28:52', name: 'Наименование ИС' },
      { id: 3, System: 'system_3',  vm_cpu: 16, vm_memory: 2048, vm_disk_size: 4645, report_date: '06.09.2023 15:28:52', name: 'Владелец' },
      { id: 4, System: 'system_4',  vm_cpu: 32, vm_memory: 8192, vm_disk_size: 234,  report_date: '06.09.2023 15:28:52', name: 'Приоритет восстановления' },
      { id: 5, System: 'system_5',  vm_cpu: 8,  vm_memory: 4096, vm_disk_size: 234,  report_date: '06.09.2023 15:28:52', name: 'Операционная система' },
      { id: 6, System: 'system_6',  vm_cpu: 24, vm_memory: 2048, vm_disk_size: 324,  report_date: '06.09.2023 15:28:52', name: 'Семейство ОС' },
      { id: 7, System: 'system_7',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 4234, report_date: '06.09.2023 15:28:52', name: 'Версия ОС' }
    ]
  }),
  mounted() {
    this.showModal()
    this.renderLineChart()
  },
  methods: {
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
    showModal: function() {
      this.$refs.modal.show = true
    },
    closeModal: function() {
      this.$refs.modal.show = false
    },
    sendDataFunction: function() {
      this.changeData()
      this.dataChart = [6, 6, 3, 5, 5, 6, 6, 6, 3, 5, 5, 6]
      this.closeModal()
      console.log('clickedItems', this.clickedItems)
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
          labels: this.dataChart,
          datasets: [
            {
              label: 'ЦПУ',
              data: data.map(row => row.vm_cpu)
            }
          ]
        },
        options: {
          indexAxis: 'x',
        }
      })

      new Chart(lineSystem2, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'ОЗУ',
              data: data.map(row => row.vm_memory)
            }
          ]
        },
        options: {
          indexAxis: 'x',
        }
      })

      new Chart(lineSystem3, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'ПЗУ',
              data: data.map(row => row.vm_disk_size)
            }
          ]
        },
        options: {
          indexAxis: 'x',
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
div.active {
  background: yellow;
}
.item-list {
  margin: 10px auto;
}
.bar-wrapper {
  display: flex;
  flex-direction: column;
}
.bar-header {
  margin-bottom: 20px;
}
.bar-item {
  width: 100%;
  min-width: 500px;
  max-width: 600px;
}
.bar-item:not(:last-child) {
  margin-bottom: 50px;
}
.bar-item canvas {
  width: 100%!important;
  height: 100%!important;
}
.bar-item > canvas {
  height: 100%;
}
</style>
}