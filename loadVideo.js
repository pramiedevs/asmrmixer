document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(".radio-buttons input[name='mode']");
    const urlInput1 = document.getElementById("url-input-1");
    const urlInput2 = document.getElementById("url-input-2");
    const submitButton = document.getElementById("submit-button");
    const leftPlayer = document.getElementById("left-player");
    const rightPlayer = document.getElementById("right-player");

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

    // Function to load video into a specific player
    const loadVideo = (url, player) => {
        const videoId = extractVideoId(url);
        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.src = embedUrl;
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;

            // Clear previous content and add the iframe
            player.innerHTML = "";
            player.appendChild(iframe);

            // Check for embed restrictions after the iframe loads
            iframe.addEventListener("error", () => {
                player.innerHTML = `<p style="color: #fff; text-align: center;">This video cannot be embedded. 
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" style="color: #1e90ff;">Watch on YouTube</a></p>`;
            });
        } else {
            alert("Invalid YouTube URL. Please use a valid link.");
        }
    };

    // Function to extract video ID from a YouTube URL
    const extractVideoId = (url) => {
        const regexPatterns = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[?&]v=([^&]+)/, // Regular YouTube URL
            /(?:https?:\/\/)?youtu\.be\/([^?]+)/, // Shortened YouTube URL
        ];
        for (const pattern of regexPatterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null; // Return null if no match
    };

    // Handle Load Button Click
    submitButton.addEventListener("click", () => {
        const selectedMode = document.querySelector(".radio-buttons input[name='mode']:checked").value;
        const url1 = urlInput1.value.trim();
        const url2 = urlInput2.value.trim();

        if (selectedMode === "left" && url1) {
            loadVideo(url1, leftPlayer);
        } else if (selectedMode === "right" && url1) {
            loadVideo(url1, rightPlayer);
        } else if (selectedMode === "single-playlist" && url1) {
            loadVideo(url1, leftPlayer);
            loadVideo(url1, rightPlayer);
        } else if (selectedMode === "dual-playlist" && url1 && url2) {
            loadVideo(url1, leftPlayer);
            loadVideo(url2, rightPlayer);
        } else {
            alert("Please enter a valid URL!");
        }
    });
});
