// Clear create form
function clearCreateForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";    
    document.querySelector("#dateFrom").value = "";
    document.querySelector("#dateTo").value = "";
    document.querySelector("#country").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#latitude").value = "";
    document.querySelector("#longitude").value = "";
}

// Create new traveldestination
const createForm = document.querySelector("#createForm");

createForm.addEventListener("submit", async (event) => {
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
                                    const response = await postData(tD);

                                    if (response.status === 201) {
                                        alert("Travel destination is created")
                                        clearCreateForm();
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