// Get id from url
function getIdFromUrl() {
    const location = window.location.toString();
    const splitQuestionmark = location.split("?");
    const routeParams = splitQuestionmark[1];
    const splitIdParam = routeParams.split("=");
    return splitIdParam[1];
}

// Show selected travel destination
window.addEventListener("load", async () => {
    const id = getIdFromUrl();
    const tDs = await getSpecificData(id);
    const deleteCollection = tDDeleteCollection(tDs);
    tDDeleteRender(deleteCollection);
    
    // Delete traveldestination
    const yesBtn = document.querySelector("#yesBtn");

    yesBtn.addEventListener("click", async () => {
        const id = getIdFromUrl();

        let token = window.localStorage.getItem("token");
        console.log(token)
        if (token == null) {
            alert("You need to login or sign up to delete!")

            window.location.replace(
                "http://127.0.0.1:5500/frontend/html/login.html"
            );
        } else {
            const response = await deleteData(id,token);
    
            if (response.status === 200) {
                alert("Travel destination is deleted")
                window.localStorage.clear();
                window.location.replace(
                    "http://127.0.0.1:5500/frontend/html/index.html"
                );
            } else {
                alert("ERROR: Something went wrong!")    
            }
        }
    });
});