const container = document.getElementById('container');
const bgImage = document.getElementById('bg-image');
const character = document.getElementById('character');
const glow = document.querySelector('.glow');

const scaleFactor = 1.2;
const sensitivity = 0.3;
const characterSensitivity = 0.04;

bgImage.style.width = `${scaleFactor * 100}%`;
bgImage.style.height = `${scaleFactor * 100}%`;

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

container.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / container.offsetWidth;
    const mouseY = e.clientY / container.offsetHeight;
    
    const moveX = easeOutCubic(mouseX) * 2 - 1;
    const moveY = easeOutCubic(mouseY) * 2 - 1;
    
    const bgTranslateX = moveX * (bgImage.offsetWidth - container.offsetWidth) * 0.5 * sensitivity;
    const bgTranslateY = moveY * (bgImage.offsetHeight - container.offsetHeight) * 0.5 * sensitivity;
    
    bgImage.style.transform = `translate(calc(-50% + ${bgTranslateX}px), calc(-50% + ${bgTranslateY}px))`;

    const charTranslateX = Math.max(-moveX * container.offsetWidth * characterSensitivity, -container.offsetWidth * 0.1);
    const charTranslateY = -moveY * container.offsetHeight * characterSensitivity;
    
    character.style.transform = `translate(${charTranslateX}px, ${charTranslateY}px) scale(${1 + Math.abs(moveY) * 0.05})`;
    
    glow.style.opacity = Math.abs(moveX) + Math.abs(moveY);
    glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)`;
});

// 音效路徑生成函數
function getSoundById(id) {
    return new Audio(`sound/${id}.mp3`);
}

let currentAudio = null;

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        stopCurrentAudio();
        
        const sound = getSoundById(this.id);
        if (sound) {
            sound.play();
            currentAudio = sound;
        }
    });
});
