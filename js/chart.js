var xyValues = [
    {x:2019, y:1000000},
    {x:2020, y:1000000000},
    {x:2021, y:15000000000},
    {x:2022, y:19000000000},
    ];
    
    new Chart("myChart", {
    type: "scatter",
    data: {
        datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        xAxes: [{ticks: {min: 2019, max:2023}}],
        yAxes: [{ticks: {min: 1000000, max:20000000000}}],
        }
    }
});