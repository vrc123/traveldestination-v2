// DELETE
async function deleteData(id,token) {
    const response = await fetch("http://127.0.0.1:3000/travel-destination/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": token
      },
    });
    return response;
}