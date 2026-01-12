const audio = document.querySelector("audio");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundBtns = document.querySelectorAll(".sound-picker button");
const timeBtns = document.querySelectorAll(".time-select button");

let duration = 600;
let timer;
let isPlaying = false;

function updateTime() {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  timeDisplay.textContent = `${mins}:${secs}`;
}

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
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
        isPlaying = false;
      }
    }, 1000);
  } else {
    clearInterval(timer);
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
    isPlaying = false;
  }
});

soundBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    audio.src = btn.dataset.sound;
    video.src = btn.dataset.video;
  });
});

timeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = Number(btn.dataset.time);
    updateTime();
  });
});
