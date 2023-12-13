<template>
  <div class="bar-wrapper">
    <div class="bar-header">Топ 10 System по</div>
    <div class="bar-block">
      <div class="bar-item"><canvas id="bar-system_1"></canvas></div>
      <div class="bar-item"><canvas id="bar-system_2"></canvas></div>
      <div class="bar-item"><canvas id="bar-system_3"></canvas></div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
export default {
  name: 'ChartSliderForSystem',
  data: () => ({
    loading: true,
    records: [
      { System: 'system_1',  vm_cpu: 2,  vm_memory: 2048, vm_disk_size: 4000 },
      { System: 'system_2',  vm_cpu: 4,  vm_memory: 1024, vm_disk_size: 5000 },
      { System: 'system_3',  vm_cpu: 16, vm_memory: 2048, vm_disk_size: 4645 },
      { System: 'system_4',  vm_cpu: 32, vm_memory: 8192, vm_disk_size: 234 },
      { System: 'system_5',  vm_cpu: 8,  vm_memory: 4096, vm_disk_size: 234 },
      { System: 'system_6',  vm_cpu: 24, vm_memory: 2048, vm_disk_size: 324 },
      { System: 'system_7',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 4234 },
      { System: 'system_8',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 234 },
      { System: 'system_9',  vm_cpu: 12, vm_memory: 2048, vm_disk_size: 234 },
      { System: 'system_10', vm_cpu: 12, vm_memory: 2048, vm_disk_size: 2343 }
    ]
  }),
  mounted() {
      const barSystem1 = document.getElementById('bar-system_1')
      const barSystem2 = document.getElementById('bar-system_2')
      const barSystem3 = document.getElementById('bar-system_3')

      // const charts = [ctx, ctx2, ctx3]

      const data = this.records

      new Chart(barSystem1, {
        type: 'bar',
        data: {
          labels: data.map(row => row.System),
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

      new Chart(barSystem2, {
        type: 'bar',
        data: {
          labels: data.map(row => row.System),
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

      new Chart(barSystem3, {
        type: 'bar',
        data: {
          labels: data.map(row => row.System),
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

    // this.records = fetch(' https://api.github.com/search/users?q=all')
    //     .then(res => res.json())
    //     .then(res => res)
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
}