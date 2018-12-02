let placesNearby = [];

function getInformationCard(id, name, address, neighbourhood = "", type, coordinates) {
    return `<div class="demo-card-wide mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title ${id}">
                    <h2 class="mdl-card__title-text">${name}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                ${neighbourhood} ${address} - ${type}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="trip.html#${coordinates}">
                    Покажи направления
                    </a>
                </div>
            </div>`;
}

function getNearbySportPlaces() {
    return new Promise((resolve, reject) => {
        //if (navigator.geolocation) {
            //navigator.geolocation.getCurrentPosition((position) => {
                $.ajax({
                    url: "http://localhost:3000/sports/nearest",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "latitude": '42.6668677',
                        "longitude": '23.3733428',
                    }
                }).done((data) => {
                    placesNearby = placesNearby.concat(data);
                    resolve();
                })
           // });
        //} else {
        //    console.log("Geolocation is not supported by this browser.");
        //    reject();
        //}
    })
}

function getNearbyCulturePlaces() {
    return new Promise((resolve, reject) => {
        //if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition((position) => {
                $.ajax({
                    url: "http://localhost:3000/culture/nearest",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "latitude": '42.6668677',
                        "longitude": '23.3733428',
                    }
                }).done((data) => {
                    placesNearby = placesNearby.concat(data);
                    resolve();
                })
        //    });
        //} else {
        //    console.log("Geolocation is not supported by this browser.");
        //    reject();
        //}
    })
}

function buildInformationCards() {
    return new Promise((resolve, reject) => {
        for(var place of placesNearby) {
            $(".infoCards").append(getInformationCard(place._id, place.name, place.address, place.neighbourhood, place.type, place.coordinates))
            if(place.logo)
                $("." + place._id).css("background", `url('${place.logo}') center / cover`);
        }
        resolve();
    })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    getNearbySportPlaces()
    .then(() => {
        getNearbyCulturePlaces()
        .then(() => {
            shuffle(placesNearby);
            placesNearby = placesNearby.slice(0, 20);
            buildInformationCards();
        })
    })
}

init();
