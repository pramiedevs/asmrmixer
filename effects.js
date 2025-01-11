document.addEventListener("DOMContentLoaded", function () {
    const soundButtons = document.querySelectorAll(".fx");
    const pauseButton = document.getElementById("pause-button");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeDisplay = document.getElementById("volume-display");
    let currentAudio = null;
    let isPaused = false;

    // Set default volume to 80%
    volumeSlider.value = 0.8;
    volumeDisplay.textContent = "80%";

    // Map button labels to sound file paths
    const soundMap = {
        "Fire Crackling": "./sounds/fire.mp3",
        "Rain": "./sounds/rain.mp3",
        "Forest Sounds": "./sounds/forest.mp3",
        "Typewriter": "./sounds/typewriter.mp3",
        "New Year Fireworks": "./sounds/fireworks.mp3",
        "Waves": "./sounds/waves.mp3"
    };

    soundButtons.forEach(button => {
        button.addEventListener("click", function () {
            const soundName = this.textContent.trim();
            const soundSrc = soundMap[soundName];

            if (soundSrc) {
                // Stop current audio if playing
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }

                // Play the new audio with looping
                currentAudio = new Audio(soundSrc);
                currentAudio.loop = true;  // Enable looping
                currentAudio.volume = volumeSlider.value; // Set initial volume to 80%
                currentAudio.play();

                // Reset pause button state when a new sound starts
                isPaused = false;
                pauseButton.textContent = "Pause";
            } else {
                console.error(`Sound not found for: ${soundName}`);
            }
        });
    });

    // Pause/Resume Button
    pauseButton.addEventListener("click", function () {
        if (currentAudio) {
            if (isPaused) {
                currentAudio.play();
                pauseButton.textContent = "Pause";  // Set to Pause when playing
            } else {
                currentAudio.pause();
                pauseButton.textContent = "Resume";  // Set to Resume when paused
            }
            isPaused = !isPaused;
        }
    });

    // Volume Slider Control with Dynamic Display
    volumeSlider.addEventListener("input", function () {
        const volumePercent = Math.round(this.value * 100);
        volumeDisplay.textContent = `${volumePercent}%`;
        if (currentAudio) {
            currentAudio.volume = this.value;
        }
    });
});
