


document.addEventListener("DOMContentLoaded", () => {
    // Select the theme toggle buttons
    const greyVioletButton = document.getElementById("grey-violet");
    const redOrangeButton = document.getElementById("red-orange");

    // Define the themes
    const themes = {
        "default-light": {
            background: "#b58bdb",
            header: "#5a5acd",
            text: "#000",
            buttonBackground: "#edc8ca",
            buttonHover: "#b843a8",
            playerBackground: "#2a2a3b",
        },
        "grey-violet": {
            background: "#0e1324",
            header: "#202022",
            text: "#fff",
            buttonBackground: "#f57e7e",
            buttonHover: "#b843a8",
            playerBackground: "#000",
        },
        "red-orange": {
            background: "#d3765c",
            header: "#913d3d",
            text: "#993705",
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

        // Apply theme styles to the body
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;

        // Apply styles to the header
        const header = document.querySelector("header");
        if (header) {
            header.style.backgroundColor = theme.header;
            header.style.color = theme.text;
        }

        // Style the buttons
        const buttons = document.querySelectorAll(".theme-toggle button");
        buttons.forEach((btn) => {
            btn.style.backgroundColor = theme.buttonBackground;
            btn.style.color = theme.text;

            // Update hover styles without adding multiple listeners
            btn.onmouseover = () => (btn.style.backgroundColor = theme.buttonHover);
            btn.onmouseout = () => (btn.style.backgroundColor = theme.buttonBackground);
        });

        // Style the video players
        const players = document.querySelectorAll(".video-player");
        players.forEach((player) => {
            player.style.backgroundColor = theme.playerBackground;
        });
    }
});
