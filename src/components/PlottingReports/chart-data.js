export const planetChartData = {
    type: 'line',
    data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril'],
        datasets: [
            { // one line graph
                label: 'Number of users',
                data: [3018, 3407, 3109,1060],
                backgroundColor: [
                    'rgba(54,73,93,.5)', // Blue
                    'rgba(54,73,93,.5)',
                    'rgba(54,73,93,.5)',
                    'rgba(54,73,93,.5)'
                ],
                borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d'
                ],
                borderWidth: 3
            },
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 40,
                }
            }]
        }
    }
}