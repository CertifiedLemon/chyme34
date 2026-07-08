// Create the audio object (Navigates out of pages/ into sources/unknown/)
const specialAudio = new Audio("../sources/unknown/ontime.mp3");

// Track if the audio has already played during this specific minute
let hasPlayed = false;

// Browser workaround: Prime the audio on the user's first click anywhere on the page
document.addEventListener('click', () => {
    specialAudio.load();
}, { once: true });

function updateLinkAndAudio() {
    // Target the link via the ID in your HTML
    const linkElement = document.getElementById("sny-link");
    
    // Safety check to prevent errors if the ID is missing
    if (!linkElement) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 8:31 PM is 20:31 in 24-hour time
    if (hours === 20 && minutes === 31) {
        linkElement.href = "sublevel1/martyr.html"; // Secret target page path
        
        // Play the audio only once when the minute starts
        if (!hasPlayed) {
            specialAudio.play().catch(error => {
                console.log("Audio playback blocked. Interact with the page first.", error);
            });
            hasPlayed = true;
        }
    } else {
        linkElement.href = "profiles/amb.html"; // Standard fallback path
        hasPlayed = false; // Reset the tracker when the minute passes
    }
}

// Run immediately when the page loads
updateLinkAndAudio();

// Check every second for precise audio timing
setInterval(updateLinkAndAudio, 1000);
