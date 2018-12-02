let places;

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

function getAllPlaces() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3000/culture/all",
            type: "GET"
        }).done((data) => {
            places = data;
            resolve();
        })
    });
}

function buildInformationCards() {
    return new Promise((resolve, reject) => {
        for(var place of places) {
            $(".infoCards").append(getInformationCard(place._id, place.name, place.address, place.neighbourhood, place.type, place.latitude + ',' + place.longitude))
            if(place.logo)
                $("." + place._id).css("background", `url('${place.logo}') center / cover`);
        }
        resolve();
    })
}

function init() {
    getAllPlaces()
    .then(() => {
        places = places.slice(0, 50);
        buildInformationCards();
    })
}

init();