async function checkUID(input_UID) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxCEujj9b1i7wBDFVLYy3O2P56IsY0tG0xRbPrJ4EmmUEI2JnUGzwKBM5cuF1_NdT_WDQ/exec";
    try {
        const response = await fetch(`${scriptURL}?uid=${encodeURIComponent(input_UID)}`);
        if (!response.ok) {
        throw new Error("Network response was not ok");
    }
        const data = await response.json();
        console.log(`UID ${data.uid} found: ${data.found}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

