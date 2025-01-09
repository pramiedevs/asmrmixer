document.addEventListener("DOMContentLoaded", () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create basic structure for effect buttons
    const effectsContainer = document.createElement("div");
    effectsContainer.id = "effects-container";
    effectsContainer.style.textAlign = "center";
    effectsContainer.style.margin = "20px";

    // Create "Effects" button
    const effectsButton = document.createElement("button");
    effectsButton.textContent = "Effects";
    effectsButton.style.padding = "10px 20px";
    effectsButton.style.fontSize = "16px";
    effectsButton.style.cursor = "pointer";

    document.body.appendChild(effectsContainer);
    effectsContainer.appendChild(effectsButton);

    // Delay and Chorus effect variables
    let delayNode, chorusLFO, chorusDepth, delayTimeSlider, chorusMixSlider;

    // When "Effects" button is clicked
    effectsButton.addEventListener("click", () => {
        // Add Delay button
        const delayButton = document.createElement("button");
        delayButton.textContent = "Delay";
        delayButton.style.margin = "10px";
        delayButton.style.padding = "10px 20px";
        delayButton.style.fontSize = "16px";
        delayButton.style.cursor = "pointer";

        // Add Chorus button
        const chorusButton = document.createElement("button");
        chorusButton.textContent = "Chorus";
        chorusButton.style.margin = "10px";
        chorusButton.style.padding = "10px 20px";
        chorusButton.style.fontSize = "16px";
        chorusButton.style.cursor = "pointer";

        effectsContainer.appendChild(delayButton);
        effectsContainer.appendChild(chorusButton);

        // Add Delay Slider
        delayButton.addEventListener("click", () => {
            if (!delayNode) {
                // Create Delay Node
                delayNode = audioContext.createDelay();
                delayNode.delayTime.value = 0.3;

                // Create Slider for Delay Time
                delayTimeSlider = createSlider("Delay Time", 0.1, 1.0, 0.3, (value) => {
                    delayNode.delayTime.value = parseFloat(value);
                });

                effectsContainer.appendChild(delayTimeSlider);
            }
        });

        // Add Chorus Slider
        chorusButton.addEventListener("click", () => {
            if (!chorusLFO) {
                // Create Chorus Nodes
                chorusLFO = audioContext.createOscillator();
                chorusLFO.type = "sine";
                chorusLFO.frequency.value = 1.5;

                chorusDepth = audioContext.createGain();
                chorusDepth.gain.value = 0.01;

                // Connect LFO to Chorus Depth
                chorusLFO.connect(chorusDepth);
                chorusLFO.start();

                // Create Slider for Chorus Mix
                chorusMixSlider = createSlider("Chorus Mix", 0.0, 1.0, 0.01, (value) => {
                    chorusDepth.gain.value = parseFloat(value);
                });

                effectsContainer.appendChild(chorusMixSlider);
            }
        });

        // Disable "Effects" button after adding buttons
        effectsButton.disabled = true;
    });

    // Utility to create sliders with labels
    function createSlider(labelText, min, max, defaultValue, onChangeCallback) {
        const sliderContainer = document.createElement("div");
        sliderContainer.style.margin = "10px";

        const label = document.createElement("label");
        label.textContent = `${labelText}: `;
        label.style.marginRight = "10px";

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.step = 0.01;
        slider.value = defaultValue;
        slider.style.margin = "10px";

        const valueDisplay = document.createElement("span");
        valueDisplay.textContent = defaultValue;

        slider.addEventListener("input", (event) => {
            const value = event.target.value;
            valueDisplay.textContent = parseFloat(value).toFixed(2);
            onChangeCallback(value);
        });

        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(valueDisplay);

        return sliderContainer;
    }
});
