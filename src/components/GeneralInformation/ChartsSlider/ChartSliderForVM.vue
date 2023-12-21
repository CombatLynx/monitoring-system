<template>
  <div class="bar-wrapper">
    <div class="bar-block">
      <div class="bar-header">Топ 10 VM по CPU</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-vm_1"></canvas></div>
      <div class="bar-header">Топ 10 VM по ОЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-vm_2"></canvas></div>
      <div class="bar-header">Топ 10 VM по ПЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-vm_3"></canvas></div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import {recordsTop10Cpu} from "@/data/RecordsTop10Cpu"
import {recordsTop10Memory} from "@/data/RecordsTop10Memory"
import {recordsTop10DiskSize} from "@/data/RecordsTop10DiskSize"
export default {
  name: 'ChartSliderForVM',
  data: () => ({
    loading: true,
    recordsTop10Cpu: recordsTop10Cpu,
    recordsTop10Memory: recordsTop10Memory,
    recordsTop10DiskSize: recordsTop10DiskSize,
  }),
  mounted() {
    const barVM1 = document.getElementById('bar-vm_1')
    const barVM2 = document.getElementById('bar-vm_2')
    const barVM3 = document.getElementById('bar-vm_3')

    // const charts = [barVM1, barVM2, barVM3]

    // this.records = fetch(' https://api.github.com/search/users?q=all')
    //     .then(res => res.json())
    //     .then(res => res)

    // const data = this.records
    const dataCpu = this.recordsTop10Cpu
    const dataMemory = this.recordsTop10Memory
    const dataDiskSize = this.recordsTop10DiskSize

    new Chart(barVM1, {
      type: 'bar',
      data: {
        labels: dataCpu.map(row => row.vm_name),
        datasets: [
          {
            label: '',
            data: dataCpu.map(row => row.vm_cpu).reverse(),
            backgroundColor: [
              '#55a955'
            ]
          }
        ]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true
      }
    })

    new Chart(barVM2, {
      type: 'bar',
      data: {
        labels: dataMemory.map(row => row.vm_name),
        datasets: [
          {
            label: '',
            data: dataMemory.map(row => row.vm_memory).reverse(),
            backgroundColor: [
              '#55a955'
            ]
          }
        ]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true
      }
    })

    new Chart(barVM3, {
      type: 'bar',
      data: {
        labels: dataDiskSize.map(row => row.vm_name),
        datasets: [
          {
            label: '',
            data: dataDiskSize.map(row => row.vm_disk_size).reverse(),
            backgroundColor: [
              '#55a955'
            ]
          }
        ]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true
      }
    })
  }
}
</script>

<style>
.bar-wrapper {
  display: flex;
  flex-direction: column;
}
.bar-header {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
.bar-item:not(:last-child)  {
  margin-bottom: 30px;
}
.bar-item {
  width: 1600px;
  height: 300px;
}
.bar-item {
  background: white;
  padding: 5px 5px 15px 5px;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0#0d234308;
}
@media screen and (max-width: 2300px) {
  .bar-item {
    width: 1400px;
    height: 300px;
  }
}
@media screen and (max-width: 2100px) {
  .bar-item {
    width: 1200px;
    height: 300px;
  }
}
@media screen and (max-width: 1900px) {
  .bar-item {
    width: 1000px;
    height: 300px;
  }
}
@media screen and (max-width: 1700px) {
  .bar-item {
    width: 800px;
    height: 300px;
  }
}
@media screen and (max-width: 1500px) {
  .bar-item {
    width: 600px;
    height: 300px;
  }
}
@media screen and (max-width: 1300px) {
  .bar-item {
    width: 400px;
    height: 300px;
  }
}
</style>