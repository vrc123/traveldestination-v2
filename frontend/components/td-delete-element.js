// Delete travel destination
function tDDeleteElement(tD) {
  const deleteElement = document.createElement("div");
  deleteElement.classList = "deleteTd";

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

  deleteElement.appendChild(title);
  deleteElement.appendChild(description);
  deleteElement.appendChild(dateFrom);
  deleteElement.appendChild(dateTo);
  deleteElement.appendChild(country);
  deleteElement.appendChild(location);
  deleteElement.appendChild(latitude);
  deleteElement.appendChild(longitude);

  // Info
  const info = document.createElement("p");
  info.id = "info";
  info.textContent = "Are you sure, you want to delete this travel destination?";
  deleteElement.appendChild(info);

  // Button container
  const btnContainer = document.createElement("div");
  btnContainer.classList = "btnContainer";
  deleteElement.appendChild(btnContainer);

  // Show button
  const noBtn = document.createElement("button");
  noBtn.textContent = "No";
  noBtn.id = "noBtn";
  btnContainer.appendChild(noBtn);

  deleteElement.querySelector("#noBtn").addEventListener("click", () => {
    window.location.replace(
      "http://127.0.0.1:5500/frontend/html/index.html"
    );
  });

  // Yes button
  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Yes";
  yesBtn.id = "yesBtn";
  btnContainer.appendChild(yesBtn);
  
  return deleteElement;
}