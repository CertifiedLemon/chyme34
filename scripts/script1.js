const specialAudio = new Audio("../sources/unknown/ontime.mp3");
let hasPlayed = false;
let isAudioUnlocked = false;

// Force browser to unlock audio processing on first user interaction
function unlockAudio() {
    if (isAudioUnlocked) return;
    
    // Create a silent buffer play to satisfy browser policy
    specialAudio.play()
        .then(() => {
            specialAudio.pause();
            specialAudio.currentTime = 0;
            isAudioUnlocked = true;
            console.log("Audio pipeline successfully unlocked.");
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        })
        .catch(err => console.log("Unlocking audio... waiting for real interaction.", err));
}

document.addEventListener('click', unlockAudio);
document.addEventListener('keydown', unlockAudio);

function updateLinkAndAudio() {
    const linkElement = document.getElementById("sny-link");
    if (!linkElement) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 8:31 PM check
    if (hours === 20 && minutes === 31) {
        linkElement.href = "sublevel1/martyr.html"; 
        
        if (!hasPlayed) {
            hasPlayed = true; // Set flag immediately to stop rapid fire loops
            
            specialAudio.play()
                .then(() => {
                    console.log("Audio successfully triggered at 8:31 PM!");
                })
                .catch(error => {
                    // Fallback: If browser still blocks it, try to play it the literal millisecond they click
                    console.log("Autoplay blocked. Sound armed for next click.");
                    const playOnForceClick = () => {
                        specialAudio.play();
                        document.removeEventListener('click', playOnForceClick);
                    };
                    document.addEventListener('click', playOnForceClick);
                });
        }
    } else {
        linkElement.href = "profiles/amb.html";
        hasPlayed = false; // Reset tracker when the minute passes
    }
}

// Run immediately on layout rendering
updateLinkAndAudio();

// Check every second for hyper-precise execution
setInterval(updateLinkAndAudio, 1000);
