// Delete travel destination collection
function tDDeleteCollection(tD) {
    const deleteCollection = document.createElement("div");
    deleteCollection.classList = "deleteCollection";

    const deleteElement = tDDeleteElement(tD);
    deleteCollection.appendChild(deleteElement);

    return deleteCollection;
}