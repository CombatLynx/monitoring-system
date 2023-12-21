<template>
    <div class="doughnut-block">
      <div class="header-item">Кол-вол ядер ЦПУ</div>
      <div class="wrapper-item">
        <div class="doughnut-item">
          <div class="value">
            <div class="max-value">{{ recordsTotalMax.vm_cpu_max }}</div>
            <div class="type-value">шт</div>
          </div>
          <canvas class="canvas-pie" id="myChart"></canvas>
        </div>
      </div>
      <div class="header-item">ОЗУ (Гб)</div>
      <div class="wrapper-item">
        <div class="doughnut-item">
          <div class="value">
            <div class="max-value">{{ recordsTotalMax.vm_memory_max }}</div>
            <div class="type-value">Гб</div>
          </div>
          <canvas class="canvas-pie" id="myChart2"></canvas>
        </div>
      </div>
      <div class="header-item">ПЗУ (Гб)</div>
      <div class="wrapper-item">
        <div class="doughnut-item">
          <div class="value">
            <div class="max-value">{{ recordsTotalMax.vm_disk_size_max }}</div>
            <div class="type-value">Гб</div>
          </div>
          <canvas class="canvas-pie" id="myChart3"></canvas>
        </div>
      </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
import {dataTable} from "@/data/DataTable"
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: 'PieCharts',
  data: () => ({
    loading: true,
    dataset: dataTable,
    recordsCurrentMax: {
        vm_cpu_max: 1646,
        vm_memory_max: 4009,
        vm_disk_size_max: 159023
    },
    recordsTotalMax: {
        vm_cpu_max: 5000,
        vm_memory_max: 5859,
        vm_disk_size_max: 200000
    },
    records: [
      {
        id: 1,
        vm_cpu: 4,
        vm_memory: 8192,
        vm_memory_beauty: '8G',
        vm_disk_size: 310,
        vm_disk_size_beauty: '310G'
      },
      {
        id: 2,
        vm_cpu: 4,
        vm_memory: 49152,
        vm_memory_beauty: '48G',
        vm_disk_size: 32,
        vm_disk_size_beauty: '32G'
      },
      {
        id: 3,
        vm_cpu: 8,
        vm_memory: 65536,
        vm_memory_beauty: '64G',
        vm_disk_size: 32,
        vm_disk_size_beauty: '32G'
      },
    ]
  }),
  mounted() {
    const ctx = document.getElementById('myChart')
    const ctx2 = document.getElementById('myChart2')
    const ctx3 = document.getElementById('myChart3')

    const test = ctx.getContext("2d");
    console.log(test)

    // this.records = fetch(' https://api.github.com/search/users?q=all')
    //     .then(res => res.json())
    //     .then(res => res)

    // const category = this.records
    // const vm_cpu = category.map(elem => elem.vm_cpu)
    // const vm_memory = category.map(elem => elem.vm_memory)
    // const vm_disk_size = category.map(elem => elem.vm_disk_size)

    const percentFull = 100

    const recordsCurrentMaxCpu = this.recordsCurrentMax.vm_cpu_max
    const recordsCurrentMaxMemory = this.recordsCurrentMax.vm_memory_max
    const recordsCurrentMaxDiskSize = this.recordsCurrentMax.vm_disk_size_max

    const recordsTotalMaxCpu = this.recordsTotalMax.vm_cpu_max
    const recordsTotalMaxMemory =  this.recordsTotalMax.vm_memory_max
    const recordsTotalMaxDiskSize = this.recordsTotalMax.vm_disk_size_max

    const percentCpu = ((recordsCurrentMaxCpu / recordsTotalMaxCpu) * 100).toFixed(0)
    const percentMemory = ((recordsCurrentMaxMemory / recordsTotalMaxMemory) * 100).toFixed(0)
    const percentDiskSize = ((recordsCurrentMaxDiskSize / recordsTotalMaxDiskSize) * 100).toFixed(0)

    // Chart.register(ChartDataLabels);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация %', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxCpu, null, recordsTotalMaxCpu - recordsCurrentMaxCpu],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        },
        {
          data: [null, percentCpu, percentFull - percentCpu],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        }]
      },
      plugins: [ChartDataLabels],
      options: {
        cutout: 35,
        plugins: {
          datalabels: {
            color: ['white', 'white', 'black', 'black'],
            font: {
              // weight: 'bold',
              size: '14px'
            }
          },
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
      }
    });

    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация %', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxMemory, null, recordsTotalMaxMemory - recordsCurrentMaxMemory],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        },
        {
          data: [null, percentMemory, percentFull - percentMemory],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        }]
      },
      plugins: [ChartDataLabels],
      options: {
        cutout: 35,
        plugins: {
          datalabels: {
            color: ['white', 'white', 'black', 'black'],
            font: {
              // weight: 'bold',
              size: '14px'
            }
          },
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
      }
    });

    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация %', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxDiskSize, null, recordsTotalMaxDiskSize - recordsCurrentMaxDiskSize],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        },
        {
          data: [null, percentDiskSize, percentFull - percentDiskSize],
          backgroundColor: [
            '#458a45',
            '#656565',
            '#e7e7e7'
          ]
        }]
      },
      plugins: [ChartDataLabels],
      options: {
        cutout: 35,
        plugins: {
          datalabels: {
            color: ['white', 'white', 'black', 'black'],
            font: {
              // weight: 'bold',
              size: '14px'
            }
          },
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
      }
    });
  },
  methods: {
    // maxT: function () {
    //   let sum = 0
    //   this.answer.map(elem => sum += elem.vm_disk_size)
    //   return sum
    // }
  }
}
</script>

<style scoped>
.doughnut-block {
  display: flex;
  flex-direction: column;
  width: 550px;
  align-items: center;
}
.wrapper-item {
  width: 500px;
  height: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0#0d234308;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.doughnut-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  position: relative;
}
.canvas-pie {
  padding: 5px 5px 15px 5px;
}
.doughnut-item:not(:last-child) {
  margin-bottom: 30px;
}
.header-item {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.value {
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 194px;
  left: 96px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: .3s;
  cursor: pointer;
}
.value:hover {
  transform: scale(1.5);
  font-size: 14px;
  background: white;
}
.value:hover .max-value,
.value:hover .type-value {
  font-size: 16px;
}
.max-value {
  font-size: 12px;
}
.type-value {
  font-size: 12px;
}
</style>