// GET
async function getData() {
    const response = await fetch("http://127.0.0.1:3000/travel-destination");
    const body = await response.json();
    return body;
}

// GET (specific by id)
async function getSpecificData(id) {
    const response = await fetch("http://127.0.0.1:3000/travel-destination/" + id);
    const body = await response.json();
    return body;
}
