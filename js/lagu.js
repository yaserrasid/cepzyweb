document.addEventListener("DOMContentLoaded", function () {
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      togglePlayPause(button.dataset.songId, button);
    });
  });
});

async function togglePlayPause(id, button) {
  const song = document.getElementById(id);
  if (song) {
    // Pause all other songs except the current one
    document.querySelectorAll("audio").forEach((audio) => {
      if (audio !== song && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        const btn = document.querySelector(
          `button[data-song-id='${audio.id}']`
        );
        if (btn) btn.textContent = "Play";
      }
    });

    // Play or pause the selected song
    if (song.paused || song.ended) {
      try {
        await song.play();
        // Change all buttons to "Play" except the current one
        document.querySelectorAll(".play-button").forEach((btn) => {
          if (btn !== button) {
            btn.textContent = "Play";
          }
        });
        button.textContent = "Pause";
      } catch (error) {
        console.error("Failed to play the audio:", error);
      }
    } else {
      song.pause();
      button.textContent = "Play";
    }
  } else {
    console.error(`Audio element with id ${id} not found.`);
  }
}
