function search() {
    const querry = $('#search').val();
    $.ajax({
        url: "http://localhost:3000/search",
        type: "GET",
        data: {
            "searchQuerry": querry
        }
    }).done((data) => {
        $(".infoCards").html('');
        data.forEach(place => {
            $(".infoCards").append(getInformationCard(place._id, place.name, place.address, place.neighbourhood, place.type, place.coordinates))
            if(place.logo)
                $("." + place._id).css("background", `url('${place.logo}') center / cover`);
        });
    })
}

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

$(document).ready(function() {
    $('[name="search"]').click(search);    
 });