// PUT
async function putData(tD, id) {
    const response = await fetch("http://127.0.0.1:3000/travel-destination/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify(tD),
    });
    return response;
}