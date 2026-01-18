function handleInput(input) {
  // Ubah jadi huruf besar dan hapus karakter selain huruf/spasi
  input.value = input.value.toUpperCase().replace(/[^A-Z\s]/g, "");

  // Ambil elemen tempat menampilkan sapaan
  const greeting = document.getElementById("greeting");

  // Jika ada teks, tampilkan "HELLO (NAMA) !"
  if (input.value.trim() !== "") {
    greeting.textContent = `HELLO ${input.value.trim()}!`;
  } else {
    greeting.textContent = "";
  }
}

function nextMedia() {
  if (currentIndex < mediaList.length - 1) {
    currentIndex++;
    showMedia(currentIndex);
  } else {
    alert("Perjalanan selesai!");
  }
}

function backMedia() {
  if (currentIndex > 0) {
    currentIndex--;
    showMedia(currentIndex);
  }
}

// Loader
function createProgressSegments() {
  const container = document.getElementById("progress-segments");
  container.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const seg = document.createElement("div");
    seg.className = "segment";
    container.appendChild(seg);
  }
}

function animateProgressLoader(callback) {
  const segments = document.querySelectorAll(".segment");
  let i = 0;
  const interval = setInterval(() => {
    if (i < segments.length) {
      segments[i].classList.add("filled");
      i++;
    } else {
      clearInterval(interval);
      setTimeout(callback, 500);
    }
  }, 200);
}

function startJourney() {
  const loader = document.getElementById("progress-loader-container");
  const btnStart = document.getElementById("btn-start");
  btnStart.style.display = "none";
  loader.style.display = "flex";
  createProgressSegments();
  animateProgressLoader(() => {
    loader.style.display = "none";
    currentIndex = 1;
    showMedia(currentIndex);
  });
}

function MateriButton() {
  currentIndex = 3; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}

function Materi1Button() {
  currentIndex = 4; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}

function Materi2Button() {
  currentIndex = 13; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}

function Materi3Button() {
  currentIndex = 18; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}
function backMedia2() {
  currentIndex = 3; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}
function backMedia3() {
  currentIndex = 3; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}
function backHome() {
  currentIndex = 2; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}
function backMenu() {
  currentIndex = 3; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
}
function PlayVideo() {
  currentIndex = 32; // pindah ke index 3 → IMG/4.webp
  showMedia(currentIndex);
  toggleMusic();
}

const music = document.getElementById("bgMusic");
const btnMusik = document.getElementById("img-musik");

let isPlaying = false;
let initialized = false;

// Inisialisasi musik saat pertama kali user berinteraksi
document.addEventListener(
  "click",
  () => {
    if (!initialized) {
      music.volume = 0.5; // volume awal
      initialized = true;
    }
  },
  { once: true },
);

// Fungsi toggle musik
function toggleMusic() {
  if (!initialized) {
    music.volume = 0.5;
    initialized = true;
  }

  if (!isPlaying) {
    music
      .play()
      .then(() => {
        isPlaying = true;
        btnMusik.src = "ASSET/musik.webp";
      })
      .catch((err) => {
        console.warn("Autoplay prevented:", err);
        alert("Klik sekali di layar, lalu tekan tombol musik lagi.");
      });
  } else {
    music.pause();
    isPlaying = false;
    btnMusik.src = "ASSET/musikpause.webp";
  }
}

// Fungsi opsional: ubah volume manual (0–1)
function setVolume(value) {
  const vol = Math.max(0, Math.min(1, value));
  music.volume = vol;
}

function QuizButton() {
  currentIndex = 25;
  showMedia(currentIndex);
}
function GameButton() {
  currentIndex = 22;
  showMedia(currentIndex);
}

// --- JAVASCRIPT UNTUK POPUP ---

// Fungsi umum untuk membuka popup
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;

  // Pastikan popup berada di dalam container fullscreen
  // Ini penting jika popup belum dipindahkan sebelumnya
  const mediaContainer = document.getElementById("media-container");
  if (!mediaContainer.contains(popup)) {
    mediaContainer.appendChild(popup);
  }

  // Tampilkan popup
  popup.style.display = "flex";
  popup.style.zIndex = "9999";

  // --- TRIK UTAMA UNTUK MEMPERBAIKI GAMBAR ---
  // Cari semua gambar di dalam popup yang baru dibuka
  const images = popup.querySelectorAll("img");
  images.forEach((img) => {
    // Simpan src asli
    const originalSrc = img.src;
    // Kosongkan src terlebih dahulu
    img.src = "";
    // Karena sudah di-preload, ini terjadi instan.
    setTimeout(() => {
      img.src = originalSrc;
    }, 10); // 10ms sudah cukup
  });
}

// Fungsi umum untuk menutup popup
function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

// Event listener untuk menutup popup jika pengguna mengklik area gelap (overlay)
window.onclick = function (event) {
  // Cek apakah yang diklik adalah container popup (area gelapnya)
  if (event.target.classList.contains("popup-container")) {
    event.target.style.display = "none";
  }
};
function playClickSound() {
  document.getElementById("click-sound").play();
}

// Modifikasi fungsi toggleFullscreen untuk memindahkan popup
function toggleFullscreen() {
  const mediaContainer = document.getElementById("media-container");

  // Pindahkan SEMUA popup ke dalam mediaContainer SEBELUM fullscreen
  const allPopups = document.querySelectorAll(".popup-container");
  allPopups.forEach((popup) => {
    if (!mediaContainer.contains(popup)) {
      mediaContainer.appendChild(popup);
    }
  });

  // Pindahkan notifikasi juga
  const notif = document.querySelector(".notif");
  if (notif && !mediaContainer.contains(notif)) {
    mediaContainer.appendChild(notif);
    notif.style.zIndex = "9999";
  }

  if (notifBox && !mediaContainer.contains(notifBox)) {
    mediaContainer.appendChild(notifBox);
    notifBox.style.zIndex = "10000";
  }

  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement
  ) {
    // Enter fullscreen
    if (mediaContainer.requestFullscreen) {
      mediaContainer.requestFullscreen();
    } else if (mediaContainer.webkitRequestFullscreen) {
      /* Safari */
      mediaContainer.webkitRequestFullscreen();
    } else if (mediaContainer.mozRequestFullScreen) {
      /* Firefox */
      mediaContainer.mozRequestFullScreen();
    } else if (mediaContainer.msRequestFullscreen) {
      /* IE/Edge */
      mediaContainer.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen
    exitFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

// Handle fullscreen change events
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

function handleFullscreenChange() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    // Update button icon when in fullscreen mode
    fullscreenBtnImg.src = "ASSET/exit-fullscreen.webp";

    // Pastikan semua popup yang sedang terbuka tetap terlihat
    const visiblePopups = document.querySelectorAll(
      '.popup-container[style*="flex"]',
    );
    visiblePopups.forEach((popup) => {
      popup.style.zIndex = "9999";

      // Force reload gambar di dalam popup
      const images = popup.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
          img.src = src + "?t=" + new Date().getTime();
        }
      });
    });
  } else {
    // Update button icon when not in fullscreen mode
    fullscreenBtnImg.src = "ASSET/fullscreen.webp";
  }
}

// Handle ESC key to exit fullscreen
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement)
  ) {
    exitFullscreen();
  }
});
