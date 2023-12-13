<template>
  <div class="bar-wrapper">
    <div class="bar-header">Топ 10 VM по</div>
    <div class="bar-block">
      <div class="bar-item"><canvas id="bar-vm_1"></canvas></div>
      <div class="bar-item"><canvas id="bar-vm_2"></canvas></div>
      <div class="bar-item"><canvas id="bar-vm_3"></canvas></div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
  name: 'ChartSliderForVM',
  data: () => ({
    loading: true,
    records: [
      { vm_name: 'vm_1',  vm_cpu: 2,  vm_memory: 2048, vm_disk_size: 4000 },
      { vm_name: 'vm_2',  vm_cpu: 4,  vm_memory: 1024, vm_disk_size: 5000 },
      { vm_name: 'vm_3',  vm_cpu: 16, vm_memory: 2048, vm_disk_size: 4645 },
      { vm_name: 'vm_4',  vm_cpu: 32, vm_memory: 8192, vm_disk_size: 234 },
      { vm_name: 'vm_5',  vm_cpu: 8,  vm_memory: 4096, vm_disk_size: 234 },
      { vm_name: 'vm_6',  vm_cpu: 24, vm_memory: 2048, vm_disk_size: 324 },
      { vm_name: 'vm_7',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 4234 },
      { vm_name: 'vm_8',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 234 },
      { vm_name: 'vm_9',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 234 },
      { vm_name: 'vm_10', vm_cpu: 12, vm_memory: 2048, vm_disk_size: 2343 }
    ]
  }),
  mounted() {
      const barVM1 = document.getElementById('bar-vm_1')
      const barVM2 = document.getElementById('bar-vm_2')
      const barVM3 = document.getElementById('bar-vm_3')

      // const charts = [barVM1, barVM2, barVM3]

      // this.records = fetch(' https://api.github.com/search/users?q=all')
      //     .then(res => res.json())
      //     .then(res => res)

      const data = this.records

      new Chart(barVM1, {
        type: 'bar',
        data: {
          labels: data.map(row => row.vm_name),
          datasets: [
            {
              label: 'ЦПУ',
              data: data.map(row => row.vm_cpu)
            }
          ]
        },
        options: {
          indexAxis: 'y',
        }
      })

      new Chart(barVM2, {
        type: 'bar',
        data: {
          labels: data.map(row => row.vm_name),
          datasets: [
            {
              label: 'ОЗУ',
              data: data.map(row => row.vm_memory)
            }
          ]
        },
        options: {
          indexAxis: 'y',
        }
      })

      new Chart(barVM3, {
        type: 'bar',
        data: {
          labels: data.map(row => row.vm_name),
          datasets: [
            {
              label: 'ПЗУ',
              data: data.map(row => row.vm_disk_size)
            }
          ]
        },
        options: {
          indexAxis: 'y',
        }
      })
  }
}
</script>

<style scoped>
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