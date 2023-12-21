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
      <div class="header-item">ОЗУ (Мб)</div>
      <div class="wrapper-item">
        <div class="doughnut-item">
          <div class="value">
            <div class="max-value">{{ recordsTotalMax.vm_memory_max }}</div>
            <div class="type-value">Мб</div>
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

export default {
  name: 'PieCharts',
  data: () => ({
    loading: true,
    dataset: dataTable,
    recordsCurrentMax: {
        vm_cpu_max: 1646,
        vm_memory_max: 4106213,
        vm_disk_size_max: 159023
    },
    recordsTotalMax: {
        vm_cpu_max: 5000,
        vm_memory_max: 6000000,
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
    const recordsTotalMaxMemory = this.recordsTotalMax.vm_memory_max
    const recordsTotalMaxDiskSize = this.recordsTotalMax.vm_disk_size_max

    const percentCpu = ((recordsCurrentMaxCpu / recordsTotalMaxCpu) * 100).toFixed(2)
    const percentMemory = ((recordsCurrentMaxMemory / recordsTotalMaxMemory) * 100).toFixed(2)
    const percentDiskSize = ((recordsCurrentMaxDiskSize / recordsTotalMaxDiskSize) * 100).toFixed(2)

    // const topLabels = {
    //   id: 'topLabels',
    //   afterDatasetsDraw(chart) {
    //     const { ctx } = chart
    //     ctx.font = 'bold 40px sans-serif'
    //     ctx.fillStyle = 'blue'
    //   }
    // }

    // const centerDoughnutPlugin = {
    //   id: "annotateDoughnutCenter",
    //   beforeDraw: (chart) => {
    //     let width = chart.width;
    //     let height = chart.height;
    //     let ctx = chart.ctx;
    //
    //     ctx.restore();
    //     let fontSize = (height / 114).toFixed(2);
    //     ctx.font = fontSize + "em sans-serif";
    //     ctx.textBaseline = "middle";
    //
    //     let text = "75%";
    //     let textX = Math.round((width - ctx.measureText(text).width) / 2);
    //     let textY = height / 1.87;
    //
    //     console.log("text x: ", textX);
    //     console.log("text y: ", textY);
    //
    //     ctx.fillText(text, textX, textY);
    //     ctx.save();
    //   },
    // };
    //
    // // Register Donut Plugin
    // Chart.register(centerDoughnutPlugin);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxCpu, null, recordsTotalMaxCpu - recordsCurrentMaxCpu],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        },
        {
          data: [null, percentCpu, percentFull - percentCpu],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        }]
      },
      options: {
        scales: {
          // x: {
          //   stacked: true
          // },
          // y: {
          //   stacked: true,
          //   beginAtZero: true
          // }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
        // plugins: [ChartDataLabels, topLabels]
      }
    });

    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxMemory, null, recordsTotalMaxMemory - recordsCurrentMaxMemory],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        },
        {
          data: [null, percentMemory, percentFull - percentMemory],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        }]
      },
      options: {
        scales: {
          // x: {
          //   stacked: true
          // },
          // y: {
          //   stacked: true,
          //   beginAtZero: true
          // }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
        // plugins: [ChartDataLabels, topLabels]
      }
    });

    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: [ 'Текущие значения', 'Текущая утилизация', 'Свободное место'],
        datasets: [{
          data: [recordsCurrentMaxDiskSize, null, recordsTotalMaxDiskSize - recordsCurrentMaxDiskSize],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        },
        {
          data: [null, percentDiskSize, percentFull - percentDiskSize],
          backgroundColor: [
            '#55a955',
            '#656565',
            'lightgrey'
          ]
        }]
      },
      options: {
        scales: {
          // x: {
          //   stacked: true
          // },
          // y: {
          //   stacked: true,
          //   beginAtZero: true
          // }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                align: 'end',
              }
            }
          }
        }
        // plugins: [ChartDataLabels, topLabels]
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
  width: 400px;
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
  width: 100px;
  height: 50px;
  bottom: 175px;
  left: 65px;
}
.max-value {
  font-size: 20px;
}
.type-value {
  font-size: 16px;
}
</style>