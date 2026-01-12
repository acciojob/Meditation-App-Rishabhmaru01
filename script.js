//your JS code here. If required.
const video = document.getElementById("video");
const audio = document.getElementById("audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundPicker = document.querySelector(".sound-picker");
const timeSelect = document.getElementById("time-select");

let duration = 600; // default 10 mins
let currentTime = duration;

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
  }
});

// Sound switch
soundPicker.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    audio.src = e.target.dataset.sound;
    video.src = e.target.dataset.video;
    audio.play();
    video.play();
    playBtn.textContent = "Pause";
  }
});

// Time select
timeSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    duration = e.target.dataset.time;
    currentTime = duration;
    updateTime();
  }
});

// Timer countdown
audio.addEventListener("timeupdate", () => {
  const elapsed = Math.floor(audio.currentTime);
  const remaining = duration - elapsed;
  currentTime = remaining;

  updateTime();

  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.textContent = "Play";
  }
});

function updateTime() {
  const mins = Math.floor(currentTime / 60);
  const secs = Math.floor(currentTime % 60);
  timeDisplay.textContent = `${mins}:${secs}`;
}
