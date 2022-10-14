// Show travel destinations
window.addEventListener("load", async () => {
    const tDs = await getData();
    const collection = tDCollection(tDs);
    tDRender(collection);
});