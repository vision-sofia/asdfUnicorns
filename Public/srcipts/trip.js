let destination = "";
let tripData;

function getDestination() {
    return new Promise((resolve, reject) => {
        if(window.location.hash) {
            let hash = window.location.hash;
            hash = hash.replace("#", '');
            hash = hash.replace('%20','');
            hash = hash.replace('%C2%A0','');
            destination = hash;
            resolve();
        } else {
            console.log("no coordinates provided");
            reject();
        }
    })
}

function callApi() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                $.ajax({
                    url: "http://localhost:3000/sports/trip",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "currentLocation": position.coords.latitude + ',' + position.coords.longitude,
                        "destiantionLocation": destination,
                    }
                }).done((data) => {
                    if(data.error) {
                        $('.step-list').append(`<h2 class="error">${data.error}</h2>`);
                        reject();
                    } else {
                        tripData = data;
                    }
                    resolve();
                })
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            reject();
        }
    })
}

function generateTripStep(destination, type, departure, arrival, transportName, destinationCoordinates) {
    return `<li class="mdl-list__item mdl-list__item--three-line step">
                    <span class="mdl-list__item-primary-content">
                    <i class="material-icons">directions_${type}</i>
                    <span>${destination}</span>
                    <span class="mdl-list__item-text-body">
                        Време на тръгване - ${departure}. Време на пристигане - ${arrival}. Транспорт - ${transportName}
                    </span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" href="https://www.google.com/maps/search/?api=1&query=${destinationCoordinates}"><i class="material-icons">info</i></a>
                    </span>
                </li>`
}

function generateInfoCard(duration, energyBurntKcal, co2EmissionsKg, departure, arrival, cost) {
    return `<div class="mdl-card__supporting-text">
                Вашето пътуване ще отнеме ${duration} минути. По време на пътуването си ще изгорите ${energyBurntKcal} kCal от ходене и ще отделите ${co2EmissionsKg} кг. CO2. Пътуването ви ще ви струва ${cost} лв.
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <span>Заминаване: ${departure} -----  Пристигане: ${arrival}</span>
            </div>`
}

function generateTrip() {
    for(let i = 0; i < tripData.travelGuide.length; i++) {
        let step = tripData.travelGuide[i];
        const departureTime = new Date(step.departure);
        const arrivalTime = new Date(step.arrival);
        $('.step-list').append(generateTripStep(step.to, step.type, departureTime.toLocaleTimeString(), arrivalTime.toLocaleTimeString(), step.transportName, step.destinationLatitude + ',' + step.destinationLongitude))
    }
    const departure = new Date(tripData.departure);
    const arrival = new Date(tripData.arrival);
    $('.info-card').append(generateInfoCard(Math.round(tripData.duration/60), tripData.energyBurntKcal, tripData.co2EmissionsKg, departure.toLocaleTimeString(), arrival.toLocaleTimeString(), tripData.fareAmmount))
}

function init() {
    getDestination()
    .then(() => {
        callApi()
        .then(() => {
            generateTrip();
        }, () => { }) 
    })
}

init();