document.addEventListener("DOMContentLoaded", () => {
    // Select the theme toggle buttons
    const greyVioletButton = document.getElementById("grey-violet");
    const redOrangeButton = document.getElementById("red-orange");

    // Define the themes
    const themes = {
        "default-light": {
            background: "#ffcff6",
            header: "#5a5acd",
            text: "#000",
            buttonBackground: "#edc8ca",
            buttonHover: "#b843a8",
            playerBackground: "#2a2a3b",
        },
        "grey-violet": {
            background: "#0e1324",
            header: "#202022",
            text: "#d0d0ff",
            buttonBackground: "#f57e7e",
            buttonHover: "#b843a8",
            playerBackground: "#000",
        },
        "red-orange": {
            background: "#f1896e",
            header: "#913d3d",
            text: "#ffddcc",
            buttonBackground: "#f57e7e",
            buttonHover: "#2a2a3b",
            playerBackground: "#2f2132",
        },
    };

    let currentTheme = "default-light"; // Start with the default theme

    // Apply the default theme when the page loads
    applyTheme(currentTheme);

    // Add click event listeners for the theme buttons
    greyVioletButton.addEventListener("click", () => toggleTheme("grey-violet"));
    redOrangeButton.addEventListener("click", () => toggleTheme("red-orange"));

    // Function to toggle between themes
    function toggleTheme(selectedTheme) {
        // Toggle back to the default theme if the same button is clicked again
        currentTheme = currentTheme === selectedTheme ? "default-light" : selectedTheme;
        applyTheme(currentTheme);
    }

    // Function to apply a theme
    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return; // Exit if theme doesn't exist

        // Apply theme styles
        document.body.style.backgroundColor = theme.background;

        const header = document.querySelector(".header");
        if (header) {
            header.style.backgroundColor = theme.header;
            header.style.color = theme.text;
        }

        // Style the buttons
        const buttons = document.querySelectorAll(".theme-toggle button");
        buttons.forEach((btn) => {
            btn.style.backgroundColor = theme.buttonBackground;
            btn.style.color = theme.text;

            btn.addEventListener("mouseover", () => {
                btn.style.backgroundColor = theme.buttonHover;
            });

            btn.addEventListener("mouseout", () => {
                btn.style.backgroundColor = theme.buttonBackground;
            });
        });

        // Style the video players
        const players = document.querySelectorAll(".video-player");
        players.forEach((player) => {
            player.style.backgroundColor = theme.playerBackground;
        });

        // Update text color for the entire document
        document.body.style.color = theme.text;
    }
});
