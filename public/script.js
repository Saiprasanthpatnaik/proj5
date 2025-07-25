document.addEventListener("DOMContentLoaded", function () {
    // === Desktop Site Alert ===
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        alert("For a better experience, please switch to Desktop Site mode in your browser menu.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Fetching video list...");

    fetch("links.json")  // Ensure this file is inside the same directory as the HTML file
        .then(response => {
            if (!response.ok) throw new Error("Failed to load links.json");
            return response.json();
        })
        .then(videoData => {
            const videoContainer = document.querySelector(".video-grid");

            if (!videoContainer) {
                console.error("Error: .video-grid container not found!");
                return;
            }

            videoContainer.innerHTML = ""; // Clear previous content

            if (!Array.isArray(videoData) || videoData.length === 0) {
                console.warn("No videos found in JSON!");
                return;
            }

            videoData.forEach(video => {
                const videoWrapper = document.createElement("div");
                videoWrapper.classList.add("video-item");

                const title = document.createElement("h3");
                title.textContent = video.title;

                const iframe = document.createElement("iframe");
                iframe.width = "100%";
                iframe.height = "200";
                iframe.src = video.url;
                iframe.frameBorder = "0";
                iframe.allow = "autoplay; encrypted-media";
                iframe.allowFullscreen = true;

                videoWrapper.appendChild(title);
                videoWrapper.appendChild(iframe);
                videoContainer.appendChild(videoWrapper);
            });

            console.log("Videos added successfully.");
        })
        .catch(error => console.error("Error loading videos:", error));
});
// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Ensures AM/PM format
    });

    const dateTimeElement = document.getElementById("datetime");
    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDate;
    } else {
        console.error("Error: Element with ID 'datetime' not found!");
    }
}

// Ensure the function runs after the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    updateDateTime(); // Initialize date-time immediately
    setInterval(updateDateTime, 1000); // Update every second
});