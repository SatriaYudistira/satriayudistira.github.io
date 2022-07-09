const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
//Values from the form
const intialAmount = document.getElementById("initialamount");
const monthly = document.getElementById("contribution");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

//Message
const message = document.getElementById("message");

//The calculate button
const button = document.querySelector(".input-group button");
//Attach an event listener
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();
    data.length = 0;
    labels.length = 0;
    let growth = 0;
    try {
        const initial = parseInt(intialAmount.value);
        const contribution = parseInt(monthly.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(compound.value);

        for (let i = 1; i <= period; i++) {
            const first = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            const second = contribution * ((Math.pow((1 + ((interest / 100) / comp)), comp * i) - 1) / ((interest / 100))) * 12;
            const final = first + second;
            data.push(toDecimal(final, 2));
            labels.push("Year " + i);
            growth = toDecimal(final, 2);
        }
        
        message.innerText = `You will have $${growth} after ${period} years`;
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    line.destroy();
    line = new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "compound",
                data,
                fill: true,
                backgroundColor: "rgba(64, 251, 7, 0.7)",
                borderWidth: 3
            }]
        }
    });
}

function toDecimal(value, decimals) {
    return +value.toFixed(decimals);
}