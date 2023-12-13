<template>
    <div class="doughnut-block">
      <div class="doughnut-item"><canvas id="myChart"></canvas></div>
      <div class="doughnut-item"><canvas id="myChart2"></canvas></div>
      <div class="doughnut-item"><canvas id="myChart3"></canvas></div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'PieCharts',
  data: () => ({
    loading: true,
    records: [
      {
        id: 1,
        vm_memory: 4096,
        vm_disk_size: 310
      },
      {
        id: 2,
        vm_memory: 8192,
        vm_disk_size: 1000
      },
      {
        id: 3,
        vm_memory: 16384,
        vm_disk_size: 1000
      },
    ]
  }),
  mounted() {
    const ctx = document.getElementById('myChart')
    const ctx2 = document.getElementById('myChart2')
    const ctx3 = document.getElementById('myChart3')

    // this.records = fetch(' https://api.github.com/search/users?q=all')
    //     .then(res => res.json())
    //     .then(res => res)

    const category = this.records
    const ar = category.map(elem => elem.vm_memory)

    const data = {
      labels: [
        'Текущие значения',
        'Текущая утилизация'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: ar,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: data
    });

    new Chart(ctx2, {
      type: 'doughnut',
      data: data
    });

    new Chart(ctx3, {
      type: 'doughnut',
      data: data
    });
  },
  methods: {
  }
}
</script>

<style scoped>
.doughnut-block {
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
}
.doughnut-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  max-width: 300px;
  width: 100%;
}
.doughnut-item:not(:last-child) {
  margin-bottom: 50px;
}
</style>