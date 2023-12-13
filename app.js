document.addEventListener('DOMContentLoaded', function () {
    // Sample tasks data
    var tasks = [
        { id: 1, name: 'Task 1', start: '2023-12-01', end: '2023-12-05' },
        { id: 2, name: 'Task 2', start: '2023-12-03', end: '2023-12-08' },
        { id: 3, name: 'Task 3', start: '2023-12-06', end: '2023-12-12' }
    ];

    // Process data for Chart.js
    var chartData = {
        datasets: [{
            data: tasks.map(task => ({
                x: new Date(task.start),
                y: task.id,
                x2: new Date(task.end),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            })),
            type: 'line'
        }]
    };

    // Chart configuration
    var chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    callback: function (value, index, values) {
                        // 格式化日期显示
                        return moment(value).format('YYYY-MM-DD');
                    }
                }
            },
            y: {
                type: 'category',
                labels: tasks.map(task => task.name),
                position: 'left'
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var task = tasks.find(task => task.id === context.dataset.data[context.dataIndex].y);
                        return `${task.name}: ${task.start} to ${task.end}`;
                    }
                }
            }
        }
    };

    // Create Gantt chart
    var ctx = document.getElementById('ganttChart').getContext('2d');
    var ganttChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
});
