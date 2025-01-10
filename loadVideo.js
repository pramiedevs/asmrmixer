let leftPlayer, rightPlayer;  // Global player instances

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(".radio-buttons input[name='mode']");
    const urlInput1 = document.getElementById("url-input-1");
    const urlInput2 = document.getElementById("url-input-2");
    const submitButton = document.getElementById("submit-button");
    const shuffleButton = document.getElementById("shuffle-button");
    const resetButton = document.getElementById("reset-button");
    const volumeLeftControl = document.getElementById("volume-left");
    const volumeRightControl = document.getElementById("volume-right");

    // Loop button for left player
    const leftLoopButton = document.getElementById("loop-button-left");
    // Loop button for right player
    const rightLoopButton = document.getElementById("loop-button-right");

    // Toggle visibility of the second input box
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.value === "dual-playlist") {
                urlInput2.style.display = "block";
            } else {
                urlInput2.style.display = "none";
            }
        });
    });

    const loadMedia = (url, playerContainer, isRightPlayer = false) => {
        const videoId = extractVideoId(url);
        const playlistId = extractPlaylistId(url);

        if (playlistId) {
            initializePlayer(playerContainer, null, playlistId, isRightPlayer);
        } else if (videoId) {
            initializePlayer(playerContainer, videoId, null, isRightPlayer);
        } else {
            alert("Invalid YouTube URL. Please use a valid link.");
        }
    };

    const extractVideoId = (url) => {
        const regexPatterns = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[?&]v=([^&]+)/,
            /(?:https?:\/\/)?youtu\.be\/([^?]+)/,
        ];
        for (const pattern of regexPatterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    const extractPlaylistId = (url) => {
        const regexPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[?&]list=([^&]+)/;
        const match = url.match(regexPattern);
        return match ? match[1] : null;
    };

    const initializePlayer = (container, videoId = null, playlistId = null, isRightPlayer = false) => {
        const player = new YT.Player(container, {
            height: "100%",
            width: "100%",
            videoId: videoId || null,
            events: {
                onReady: (event) => {
                    if (playlistId) {
                        event.target.loadPlaylist({
                            list: playlistId,
                            listType: "playlist",
                            index: isRightPlayer ? 1 : 0,
                        });
                    } else if (videoId) {
                        event.target.playVideo();
                    }
                },
                onStateChange: (event) => handleVideoEnd(event, player),
            },
        });

        if (container === "left-player") {
            leftPlayer = player;
        } else if (container === "right-player") {
            rightPlayer = player;
        }
    };

    const handleVideoEnd = (event, player) => {
        if (event.data === YT.PlayerState.ENDED) {
            // Check if the loop is enabled for this player
            if (player.loop) {
                player.seekTo(0); // Restart video from the beginning
                player.playVideo(); // Play the video again
            }
        }
    };

    volumeLeftControl.addEventListener("input", (event) => {
        const volume = parseInt(event.target.value, 10);
        if (leftPlayer && leftPlayer.setVolume) {
            leftPlayer.setVolume(volume);
        }
    });

    volumeRightControl.addEventListener("input", (event) => {
        const volume = parseInt(event.target.value, 10);
        if (rightPlayer && rightPlayer.setVolume) {
            rightPlayer.setVolume(volume);
        }
    });

    submitButton.addEventListener("click", () => {
        const selectedMode = document.querySelector(".radio-buttons input[name='mode']:checked").value;
        const url1 = urlInput1.value.trim();
        const url2 = urlInput2.value.trim();

        if (selectedMode === "left" && url1) {
            loadMedia(url1, "left-player");
        } else if (selectedMode === "right" && url1) {
            loadMedia(url1, "right-player", true);
        } else if (selectedMode === "single-playlist" && url1) {
            loadMedia(url1, "left-player");
            loadMedia(url1, "right-player", true);
        } else if (selectedMode === "dual-playlist" && url1 && url2) {
            loadMedia(url1, "left-player");
            loadMedia(url2, "right-player", true);
        } else {
            alert("Please enter a valid URL!");
        }
    });

    // Toggle looping for a given player
    const toggleLoop = (button, player) => {
        const isLoopOn = button.classList.contains("loop-on");

        if (isLoopOn) {
            player.loop = false; // Disable loop
            button.textContent = "Loop Off";
            button.classList.remove("loop-on");
        } else {
            player.loop = true;  // Enable loop
            button.textContent = "Loop On";
            button.classList.add("loop-on");
        }
    };

    leftLoopButton.addEventListener("click", () => {
        if (leftPlayer) {
            toggleLoop(leftLoopButton, leftPlayer);
        } else {
            alert("Left player is not initialized. Please Load a video. Thanks =)");
        }
    });

    rightLoopButton.addEventListener("click", () => {
        if (rightPlayer) {
            toggleLoop(rightLoopButton, rightPlayer);
        } else {
            alert("Right player is not initialized. Please Load a video. Thanks =)");
        }
    });

    shuffleButton.addEventListener("click", () => {
        if (leftPlayer && rightPlayer) {
            const leftPlaylist = leftPlayer.getPlaylist();
            const rightPlaylist = rightPlayer.getPlaylist();

            if (leftPlaylist && rightPlaylist) {
                const leftIndex = getRandomIndex(leftPlaylist.length);
                let rightIndex = getRandomIndex(rightPlaylist.length);

                while (rightIndex === leftIndex) {
                    rightIndex = getRandomIndex(rightPlaylist.length);
                }

                leftPlayer.playVideoAt(leftIndex);
                rightPlayer.playVideoAt(rightIndex);
            } else {
                alert("Please load a playlist before using shuffle. Thanks =)");
            }
        } else {
            alert("Please load a playlist before using shuffle. Thanks =)");
        }
    });

    const getRandomIndex = (length) => Math.floor(Math.random() * length);

    resetButton.addEventListener("click", () => {
        window.location.reload();
    });

    const loadYouTubeAPI = () => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
    };

    loadYouTubeAPI();
});
