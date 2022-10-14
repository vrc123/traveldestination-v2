// Travel destination
function tDElement(tD) {
    const element = document.createElement("div");
    element.classList = "tD";

    const title = document.createElement("h3");
    const description = document.createElement("p");
    const dateFrom = document.createElement("p");
    const dateTo = document.createElement("p");
    const country = document.createElement("p");
    const location = document.createElement("p");
    const latitude = document.createElement("p");
    const longitude = document.createElement("p");

    title.textContent = tD.title;
    description.textContent = "Description: " + tD.description;
    dateFrom.textContent = "Date from: " + tD.dateFrom;
    dateTo.textContent = "Date to: " + tD.dateTo;
    country.textContent = "Country: " + tD.country;
    location.textContent = "Location: " + tD.location;
    latitude.textContent = "Latitude: " + tD.latitude;
    longitude.textContent = "Longitude: " + tD.longitude;

    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(dateFrom);
    element.appendChild(dateTo);
    element.appendChild(country);
    element.appendChild(location);
    element.appendChild(latitude);
    element.appendChild(longitude);

    // Button container
    const btnContainer = document.createElement("div");
    btnContainer.classList = "btnContainer";
    element.appendChild(btnContainer);

    // Update button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.id = "updateBtn";
    btnContainer.appendChild(updateBtn);

    element.querySelector("#updateBtn").addEventListener("click", () => {
      window.location.replace(
        "http://127.0.0.1:5500/frontend/html/update.html?id=" + tD._id
      );
    });
    
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "deleteBtn";
    btnContainer.appendChild(deleteBtn);

    element.querySelector("#deleteBtn").addEventListener("click", () => {
      window.location.replace(
        "http://127.0.0.1:5500/frontend/html/delete.html?id=" + tD._id
      );
    });

    return element;
}