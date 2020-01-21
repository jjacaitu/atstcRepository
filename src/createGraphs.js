import Chart from "chart.js";

const createGraph = (information) => {

    const genderChartCanvas = document.getElementById('genderChart');
    const ageChartCanvas = document.getElementById('ageChart');

    const backgroundColor = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
    ];

    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    

    const genderLabels = [];
    const genderData = [];
    const ageLabels = ["< 30", "30 - 45", "45 - 60", "> 60"];
    const ageData = [0, 0, 0, 0];

    information.forEach((row) => {
        const gender = row[5]
        if (gender !== undefined) {

            if (genderLabels.includes(gender)) {
                genderData[genderLabels.indexOf(gender)]++;
            } else {
                genderLabels.push(gender)
                genderData.push(1);
            }

            const age = parseInt(row[14])

            if (age < 30) {
                ageData[0]++;
            } else if (age > 30 && age < 45) {
                ageData[1]++;

            } else if (age > 45 && age < 60) {
                ageData[2]++;

            } else {
                ageData[3]++;
            }

        }
    });

    new Chart(genderChartCanvas, {
        type: 'pie',
        data: {
            labels: genderLabels,
            datasets: [{
                label: '# of Votes',
                data: genderData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Distribution by Gender',
                fontSize: 20
            }
        }
    });



    new Chart(ageChartCanvas, {
        type: 'pie',
        data: {
            labels: ageLabels,
            datasets: [{
                label: '# of Votes',
                data: ageData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Distribution by Age',
                fontSize: 20
            }
        }
    });


}

export default createGraph;