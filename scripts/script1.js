const specialAudio = new Audio("../sources/unknown/ontime.mp3");
let hasPlayed = false;
let isAudioUnlocked = false;

// A separate, silent, throwaway audio purely to satisfy the browser's
// autoplay policy — this NEVER touches specialAudio, so nothing can
// interfere with the real trigger later.
const silentUnlocker = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
);

function unlockAudio() {
    if (isAudioUnlocked) return;

    silentUnlocker.play()
        .then(() => {
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
            hasPlayed = true;

            specialAudio.play()
                .then(() => {
                    console.log("Audio successfully triggered at 8:31 PM!");
                })
                .catch(error => {
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
        hasPlayed = false;
    }
}

updateLinkAndAudio();
setInterval(updateLinkAndAudio, 1000);
