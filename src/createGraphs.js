import Chart from "chart.js";

const createGraph = (information, selectedBrand) => {

    // Grab the reference of the 3 canvas for the graphics and store them in variables

    const genderChartCanvas = document.getElementById('genderChart');
    const ageChartCanvas = document.getElementById('ageChart');
    const countrySalesByBrandCanvas = document.getElementById('byBrandChart');
    

    const backgroundColor = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
    ];



    const genderLabels = [];
    const genderData = [];
    const ageLabels = ["< 30", "30 - 45", "45 - 60", "> 60"];
    const ageData = [0, 0, 0, 0];

    // Create a function that returns the countries that have a car of that brand and how many.

    const getDataByCarBrand = (brand) => {
        const dataByCar = {};
        information.forEach((row) => {
            const brandInRow = row[11];
            const country = row[10]
            if (brandInRow === brand) {
                
                    if (dataByCar[country]) {
                        dataByCar[country] = dataByCar[country] + 1;
                    } else {
                        dataByCar[country] = 1;
                    }
                    
                
            }
 
        })

        return dataByCar
    }

    // loop through the information and get the amount of people by gender and by age range

    information.forEach((row) => {

        // By gender
        const gender = row[5]
        if (gender !== undefined) {

            if (genderLabels.includes(gender)) {
                genderData[genderLabels.indexOf(gender)]++;
            } else {
                genderLabels.push(gender)
                genderData.push(1);
            }

            // By age range

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

    // Create the chart for the gender distribution

    new Chart(genderChartCanvas, {
        type: 'pie',
        data: {
            labels: genderLabels,
            datasets: [{
                
                data: genderData,
                backgroundColor: backgroundColor,
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

    // Create the chart for the age distribution

    new Chart(ageChartCanvas, {
        type: 'pie',
        data: {
            labels: ageLabels,
            datasets: [{
                
                data: ageData,
                backgroundColor: backgroundColor,
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


    const countrySalesByBrandObject = getDataByCarBrand(selectedBrand);

    // Create the chart that displays the amount of cars in each country for a brand

    window.chart = new Chart(countrySalesByBrandCanvas, {
        type: 'bar',
        data: {
            labels: Object.keys(countrySalesByBrandObject),
            datasets: [{
                label: `Amount of ${selectedBrand} cars sold by country `,
                data: Object.values(countrySalesByBrandObject),
                backgroundColor: backgroundColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })




}

export default createGraph;