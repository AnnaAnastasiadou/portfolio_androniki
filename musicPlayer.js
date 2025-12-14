const songs = [
    { name: 'Song 1', path: './assets/music/song1.mp3' },
    { name: 'Song 2', path: './assets/music/song2.mp3' },
    { name: 'Song 3', path: './assets/music/song3.mp3' },
];

let currentIndex = 0;
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentSongLabel = document.getElementById('current-song');
const timeDisplay = document.getElementById('time');
const progress = document.getElementById('progress');

// Load a song details into the DOM
function loadSong(index) {
    audio.src = songs[index].path;
    currentSongLabel.textContent = 'Now Playing: ' + songs[index].name;
    // We reset to 'Play' icon initially, but nextSong() will override this if needed
    playPauseBtn.textContent = '▶';
    progress.value = 0;
    timeDisplay.textContent = '0:00 / 0:00';
}

// Helper to play audio and update icon
function playAudio() {
    audio
        .play()
        .then(() => {
            playPauseBtn.textContent = '❚❚';
        })
        .catch((error) => console.error('Playback failed:', error));
}

// Play/pause toggle
function togglePlayPause() {
    if (audio.paused) {
        playAudio();
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
}

// Previous/Next buttons
function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playAudio(); // Auto-play after switching
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playAudio(); // Auto-play after switching
}

// Update time and progress bar
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const duration = audio.duration || 0;

    // Format Time
    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${min}:${sec}`;
    };

    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(
        duration
    )}`;
    progress.value = duration ? (current / duration) * 100 : 0;
});

// Seek via progress bar
progress.addEventListener('input', () => {
    const duration = audio.duration || 0;
    audio.currentTime = (progress.value / 100) * duration;
});

// Update time and progress bar
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const duration = audio.duration || 0;

    // Format Time
    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${min}:${sec}`;
    };

    const currentProgress = duration ? (current / duration) * 100 : 0; // Calculate percentage

    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(
        duration
    )}`;
    progress.value = currentProgress;

    // 👇 ADD THIS LINE: Set the CSS variable used for dynamic filling
    progress.style.setProperty('--track-progress', `${currentProgress}%`);
});

audio.addEventListener('ended', () => {
    // When the current song finishes, automatically call the function
    // to switch to the next song.
    nextSong();
});

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Load first song on startup (but don't play automatically)
loadSong(currentIndex);
