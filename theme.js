// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Select theme buttons
    const greyVioletButton = document.getElementById("grey-violet");
    const redOrangeButton = document.getElementById("red-orange");

    // Define color palettes
    const themes = {
        "grey-violet": {
            background: "#1e1e2f",
            header: "#202022",
            text: "#d0d0ff",
            buttonBackground: "#f57e7e",
            buttonHover: "#b843a8",
            playerBackground: "#2a2a3b",
        },
        "red-orange": {
            background: "#f1896e",
            header: "#913d3d",
            text: "#ffddcc",
            buttonBackground: "#f57e7e",
            buttonHover: "#2a2a3b",
            playerBackground: "#913d3d",
        },
    };

    // Function to apply a theme
    const applyTheme = (theme) => {
        document.body.style.backgroundColor = theme.background;
        document.querySelector("header").style.backgroundColor = theme.header;
        document.querySelector("header .logo").style.color = theme.text;
        document.querySelectorAll(".theme-toggle button").forEach((button) => {
            button.style.backgroundColor = theme.buttonBackground;
        });
        document.querySelectorAll(".video-player").forEach((player) => {
            player.style.backgroundColor = theme.playerBackground;
        });
    };

    // Add hover effects dynamically
    const addHoverEffects = (theme) => {
        document.querySelectorAll(".theme-toggle button").forEach((button) => {
            button.addEventListener("mouseover", () => {
                button.style.backgroundColor = theme.buttonHover;
            });
            button.addEventListener("mouseout", () => {
                button.style.backgroundColor = theme.buttonBackground;
            });
        });
    };

    // Event listeners for theme buttons
    greyVioletButton.addEventListener("click", () => {
        applyTheme(themes["grey-violet"]);
        addHoverEffects(themes["grey-violet"]);
    });

    redOrangeButton.addEventListener("click", () => {
        applyTheme(themes["red-orange"]);
        addHoverEffects(themes["red-orange"]);
    });

    // Set default theme
    applyTheme(themes["grey-violet"]);
    addHoverEffects(themes["grey-violet"]);
});
