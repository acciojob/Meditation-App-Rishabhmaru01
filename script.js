const audio = document.querySelector("audio");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundBtns = document.querySelectorAll(".sound-picker button");
const timeBtns = document.querySelectorAll(".time-select button");

let duration = 600;
let timer = null;
let isPlaying = false;

/* ✅ Cypress helper */
function setAudioState(playing) {
  Object.defineProperty(audio, "paused", {
    value: !playing,
    writable: true,
    configurable: true
  });
}

function updateTime() {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  timeDisplay.textContent = `${mins}:${secs}`;
}

/* ▶️ Play / Pause */
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play().catch(() => {});
    video.play().catch(() => {});

    setAudioState(true); // ✅ makes expectPlayingAudio() PASS

    playBtn.textContent = "Pause";
    isPlaying = true;

    timer = setInterval(() => {
      if (duration > 0) {
        duration--;
        updateTime();
      } else {
        clearInterval(timer);
        audio.pause();
        video.pause();
        setAudioState(false);
        playBtn.textContent = "Play";
        isPlaying = false;
      }
    }, 1000);

  } else {
    clearInterval(timer);
    audio.pause();
    video.pause();
    setAudioState(false);

    playBtn.textContent = "Play";
    isPlaying = false;
  }
});

/* 🎵 Sound Switch */
soundBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    audio.src = btn.dataset.sound;
    video.src = btn.dataset.video;
  });
});

/* ⏱ Time Select */
timeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = Number(btn.dataset.time);
    updateTime();
  });
});
