<template>
  <div class="bar-wrapper">
    <div class="bar-block">
      <div class="bar-header">Топ 10 System по CPU</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-system_1"></canvas></div>
      <div class="bar-header">Топ 10 System по ОЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-system_2"></canvas></div>
      <div class="bar-header">Топ 10 System по ПЗУ</div>
      <div class="bar-item"><canvas class="canvas-graph" id="bar-system_3"></canvas></div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
import {recordsTop10Cpu} from "@/data/RecordsTop10Cpu";
import {recordsTop10Memory} from "@/data/RecordsTop10Memory";
import {recordsTop10DiskSize} from "@/data/RecordsTop10DiskSize";
export default {
  name: 'ChartSliderForSystem',
  data: () => ({
    loading: true,
    recordsTop10Cpu: recordsTop10Cpu,
    recordsTop10Memory: recordsTop10Memory,
    recordsTop10DiskSize: recordsTop10DiskSize
  }),
  mounted() {
    const barSystem1 = document.getElementById('bar-system_1')
    const barSystem2 = document.getElementById('bar-system_2')
    const barSystem3 = document.getElementById('bar-system_3')

    // const charts = [ctx, ctx2, ctx3]

    // const data = this.records
    const dataCpu = this.recordsTop10Cpu
    const dataMemory = this.recordsTop10Memory
    const dataDiskSize = this.recordsTop10DiskSize

    new Chart(barSystem1, {
      type: 'bar',
      data: {
        labels: dataCpu.map(row => row.System),
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

    new Chart(barSystem2, {
      type: 'bar',
      data: {
        labels: dataMemory.map(row => row.System),
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

    new Chart(barSystem3, {
      type: 'bar',
      data: {
        labels: dataDiskSize.map(row => row.System),
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