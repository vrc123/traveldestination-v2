// Get id from url
function getIdFromUrl() {
    const location = window.location.toString();
    const splitQuestionmark = location.split("?");
    const routeParams = splitQuestionmark[1];
    const splitIdParam = routeParams.split("=");
    return splitIdParam[1];
}

// Fill form with travel destination info
function fillInTheForm(tD) {
    document.querySelector("#title").value = tD.title;
    document.querySelector("#description").value = tD.description;
    document.querySelector("#dateFrom").value = tD.dateFrom;
    document.querySelector("#dateTo").value = tD.dateTo;
    document.querySelector("#country").value = tD.country;
    document.querySelector("#location").value = tD.location;
    document.querySelector("#latitude").value = tD.latitude;
    document.querySelector("#longitude").value = tD.longitude;
}

// Show specific travel destination in form
window.addEventListener("load", async () => {
    const id = getIdFromUrl();
    const tD = await getSpecificData(id);
    fillInTheForm(tD)

    // Delete traveldestination
    const updateForm = document.querySelector("#updateForm");

    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const tD = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            dateFrom: document.querySelector("#dateFrom").value,
            dateTo: document.querySelector("#dateTo").value,
            country: document.querySelector("#country").value,
            location: document.querySelector("#location").value,
            latitude: document.querySelector("#latitude").value,
            longitude: document.querySelector("#longitude").value,
        };

        if (tD.title !== "") {
            if (!tD.title.match(/^[a-z]/)) {
                if (tD.description !== "") {
                    if (!tD.description.match(/^[a-z]/)) {
                        if (tD.country !== "") {
                            if (!tD.country.match(/^[a-z]|[0-9]/g)) {
                                if (tD.location !== "") {
                                    if (!tD.location.match(/^[a-z]/)) {
                                        const response = await putData(tD, id);

                                        if (response.status === 201) {
                                            alert("Travel destination is updated")
                                            window.location.replace(
                                                "http://127.0.0.1:5500/frontend/html/index.html"
                                            );
                                        } else {
                                            alert("ERROR: Something went wrong!")    
                                        }
                                    } else {
                                        alert("ERROR: The first charecter in location needs to be upparcase or a number!")
                                    } 
                                } else {
                                    alert("ERROR: Location is required!")
                                }                        
                            } else {
                                alert("ERROR: Country must not include a number, and the first character has to be uppercase?")
                            }
                        } else {
                            alert("ERROR: Country is required!")
                        }
                    } else {
                        alert("ERROR: The first charecter in description needs to be upparcase or a number!")
                    }
                } else {
                    alert("ERROR: Description is required!")
                }
            } else {
                alert("ERROR: The first charecter in titel needs to be upparcase or a number!")
            }
        } else {
            alert("ERROR: Title is required!")
        }
    });
});