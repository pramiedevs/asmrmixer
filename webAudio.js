document.addEventListener("DOMContentLoaded", () => {
    const leftPlayer = document.getElementById("left-player");
    const rightPlayer = document.getElementById("right-player");
    const panLeftSlider = document.getElementById("pan-left");
    const panRightSlider = document.getElementById("pan-right");
    const tinglesButton = document.getElementById("tingles-button");

    // Create Audio Context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create Gain and Panner Nodes for Left and Right
    const leftGain = audioContext.createGain();
    const rightGain = audioContext.createGain();

    const leftPanner = audioContext.createStereoPanner();
    const rightPanner = audioContext.createStereoPanner();

    // Connect Nodes
    leftPanner.connect(leftGain).connect(audioContext.destination);
    rightPanner.connect(rightGain).connect(audioContext.destination);

    // Initialize Panning Values
    leftPanner.pan.value = -1; // 100% Left
    rightPanner.pan.value = 1;  // 100% Right

    // Function to update panning from sliders
    panLeftSlider.addEventListener("input", (event) => {
        const panValue = parseFloat(event.target.value);
        leftPanner.pan.value = panValue;
    });

    panRightSlider.addEventListener("input", (event) => {
        const panValue = parseFloat(event.target.value);
        rightPanner.pan.value = panValue;
    });

    // "Tingles" Button: Randomize Panning Softly
    tinglesButton.addEventListener("click", () => {
        const randomLeftPan = parseFloat((Math.random() * 2 - 1).toFixed(2)); // Between -1 and 1
        const randomRightPan = parseFloat((Math.random() * 2 - 1).toFixed(2)); // Between -1 and 1

        // Update panner nodes
        leftPanner.pan.value = randomLeftPan;
        rightPanner.pan.value = randomRightPan;

        // Reflect randomized values on the sliders
        panLeftSlider.value = randomLeftPan;
        panRightSlider.value = randomRightPan;

        // Log for confirmation
        console.log(`Tingles activated! Left: ${randomLeftPan}, Right: ${randomRightPan}`);
    });

    // Note: Audio Source Nodes (videos) would be connected to the panners when loaded.
    // Example:
    // const leftSource = audioContext.createMediaElementSource(leftVideoElement);
    // leftSource.connect(leftPanner);
    // 
    // const rightSource = audioContext.createMediaElementSource(rightVideoElement);
    // rightSource.connect(rightPanner);
});
