// Travel destination collection
function tDCollection(tDs) {
    const collection = document.createElement("div");
    collection.classList = "collection";

    tDs.forEach((tD) => {
        const elements = tDElement(tD);
        collection.appendChild(elements);
    });

    return collection;
}