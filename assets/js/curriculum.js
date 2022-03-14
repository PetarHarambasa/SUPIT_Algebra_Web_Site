// ========================================= //
// VARS
// ========================================= //
const inputAutoComplete = "#findCurriculum";
const tblCuriculums = "#tblCuriculums";

const lblEctsPoints = "#ectsPoints";
const lblHoursPoints = "#hoursPoints";

const getNastavniPlan = "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan"
const getKolegij = "http://www.fulek.com/VUA/supit/GetKolegij/"

let ectsPoints = 0;
let hoursPoints = 0;

let allCirruculums = [];
let selectedCirruculums = [];
// ========================================= //


// ========================================= //
// FUNCTIONS
// ========================================= //

function getAllCuriculums() {
    let response = $.ajax({
        type: "GET",
        dataType: "json", 
        async: false,
        url: getNastavniPlan, 
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    return response.responseJSON;
}

function getCuriculumById(id) {
    let response = $.ajax({
        type: "GET",
        dataType: "json", 
        async: false,
        url: getKolegij+id, 
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    return response.responseJSON;
}

function generateAutoComplete() {
    $(inputAutoComplete).autocomplete({
        source: allCirruculums.map(x => x.label),
        select: selectAutoComplete
    });
}

function selectAutoComplete(event, ui) {
    let findId = allCirruculums.find(y => y.label == ui.item.value).value;
    let curiculumInfo = getCuriculumById(findId);
    selectedCirruculums.push(curiculumInfo);

    if(selectedCirruculums.length != 0) {
        $(tblCuriculums).show();
    }

    calculateData();
    appendData(curiculumInfo);
};

function calculateData() {
    ectsPoints = 0;
    hoursPoints = 0;

    selectedCirruculums.forEach(el => {
        ectsPoints += el.ects;
        hoursPoints += el.sati;
    });

    $(lblEctsPoints).html(ectsPoints);
    $(lblHoursPoints).html(hoursPoints);
}

function appendData(info) {
    $(tblCuriculums).find("tbody").append(`
    <tr data-id="${info.id}">
        <th>${info.kolegij}</th>
        <td>${info.ects}</td>
        <td>${info.sati}</td>
        <td>${info.predavanja}</td>
        <td>${info.vjezbe}</td>
        <td>${info.tip}</td>
        <td>
        <button type="button" class="btn btn-danger btnDelete">
            Obriši
        </button>
        </td>
    </tr>
    `);
}

// ========================================= //


// ========================================= //
// MAIN
// ========================================= //
$(function(){ 
    allCirruculums = getAllCuriculums();
    generateAutoComplete();
});
// ========================================= //


// ========================================= //
// CALLBACK
// ========================================= //
$(document).on("click", ".btnDelete", function() {
    let id = $(this).parent().parent().attr("data-id");
    $(this).parent().parent().remove();
    selectedCirruculums = selectedCirruculums.filter(x => x.id != parseInt(id));
    calculateData();

    if(selectedCirruculums.length != 0) {
        $(tblCuriculums).show();
    } else {
        $(tblCuriculums).hide();
    }
}); 
// ========================================= //

