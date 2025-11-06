const birgy = document.getElementById("birgy");
const icey = document.getElementById("icey");
const pizzano = document.getElementById("pizzano");

const organ1 = document.getElementById("organ1");
const organ2 = document.getElementById("organ2");
const organ3 = document.getElementById("organ3");
const organ4 = document.getElementById("organ4");
const organ5 = document.getElementById("organ5");
const organ6 = document.getElementById("organ6");
const organ7 = document.getElementById("organ7");
const organ8 = document.getElementById("organ8");
const organ9 = document.getElementById("organ9");
const organ10 = document.getElementById("organ10");
const organ11 = document.getElementById("organ11");
const organ12 = document.getElementById("organ12");
const organ13 = document.getElementById("organ13");
const organ14 = document.getElementById("organ14");

let selected = null;
const walls = document.querySelectorAll(".wall");
const organs = document.querySelectorAll(".organ"); // Tambahkan query untuk organ
const step = 10; // Kecepatan gerakan karakter (piksel per frame)

const keysPressed = {};
// === Urutan organ yang wajib dilewati ===
const requiredSequence = [
  "organ3",
  "organ11",
  "organ1",
  "organ8",
  "organ7",
  "organ4",
];

let progressIndex = 0;
let lastCollidedOrgan = null;
let completedOrgans = new Set(); // daftar organ yang sudah dilewati

// === Pilih karakter ===
function selectCharacter(id) {
  document.querySelectorAll(".character").forEach((el) => {
    el.style.border = "none";
    el.style.transform = "scale(1)";
    el.style.transition = "all 0.3s ease";
  });

  const char = document.getElementById(id);
  if (!char) return;

  char.style.border = "3px solid transparent";
  char.style.transition = "all 0.3s ease";
  char.style.transformOrigin = "bottom right";
  char.style.transform = "scale(0.4)";
  selected = id;

  // Reset progres dan status organ
  progressIndex = 0;
  lastCollidedOrgan = null;
  completedOrgans.clear();
  hideNotification();

  showNotification("🧭 Rute dimulai!");
}

// === Cek tabrakan dinding ===
function checkWallCollision(charElement) {
  const charRect = charElement.getBoundingClientRect();
  for (const wall of walls) {
    const wallRect = wall.getBoundingClientRect();
    if (
      charRect.left < wallRect.right &&
      charRect.right > wallRect.left &&
      charRect.top < wallRect.bottom &&
      charRect.bottom > wallRect.top
    ) {
      return true;
    }
  }
  return false;
}

// === Cek tabrakan organ ===
function checkOrganCollision(charElement) {
  const charRect = charElement.getBoundingClientRect();
  for (const organ of organs) {
    const organRect = organ.getBoundingClientRect();
    if (
      charRect.left < organRect.right &&
      charRect.right > organRect.left &&
      charRect.top < organRect.bottom &&
      charRect.bottom > organRect.top
    ) {
      return organ;
    }
  }
  return null;
}

// === Prediksi tabrakan sebelum bergerak ===
function wouldCollide(charElement, newTop, newLeft) {
  const temp = charElement.cloneNode(true);
  temp.style.position = "absolute";
  temp.style.top = newTop + "px";
  temp.style.left = newLeft + "px";
  temp.style.visibility = "hidden";
  charElement.parentNode.appendChild(temp);

  const collision = checkWallCollision(temp);
  temp.remove();
  return collision;
}

// === Pergerakan karakter ===
function moveCharacter(direction) {
  if (!selected) return;
  const char = document.getElementById(selected);
  const originalTop = char.offsetTop;
  const originalLeft = char.offsetLeft;
  let newTop = originalTop;
  let newLeft = originalLeft;

  switch (direction) {
    case "up":
      newTop -= step;
      break;
    case "down":
      newTop += step;
      break;
    case "left":
      newLeft -= step;
      break;
    case "right":
      newLeft += step;
      break;
  }

  if (!wouldCollide(char, newTop, newLeft)) {
    char.style.top = newTop + "px";
    char.style.left = newLeft + "px";

    const collidedOrgan = checkOrganCollision(char);
    if (collidedOrgan) handleOrganCollision(collidedOrgan);
  }
}

// === Tangani urutan organ ===
function handleOrganCollision(organ) {
  const organId = organ.id;

  // Sudah dilewati sebelumnya? Abaikan
  if (completedOrgans.has(organId)) return;

  // Cegah deteksi berulang
  if (lastCollidedOrgan === organId) return;
  lastCollidedOrgan = organId;

  console.log(
    "Tersentuh:",
    organId,
    "| Sekarang harus:",
    requiredSequence[progressIndex]
  );

  // Jika urutan benar
  if (organId === requiredSequence[progressIndex]) {
    animateOrgan(organ);
    playSound("benar");
    completedOrgans.add(organId);
    progressIndex++;

    if (progressIndex === requiredSequence.length) {
      showNotification(
        "🎉 Hebat! Kamu telah melewati semua organ dengan benar! 🧠💪"
      );
      playSound("selesai");
      progressIndex = 0;
      completedOrgans.clear();
    } else {
      showNotification("✅ Bagus! Sekarang cari organ selanjutnya");
    }
  } else if (requiredSequence.includes(organId)) {
    showNotification("⚠️ Belum waktunya menyentuh organ ini!");
    playSound("salah");
  } else {
    showNotification("😅 Itu bukan bagian dari rute yang benar!");
    playSound("salah");
  }

  // Reset deteksi setelah 1 detik
  setTimeout(() => {
    lastCollidedOrgan = null;
  }, 1000);
}

// === Animasi organ disentuh ===
function animateOrgan(organ) {
  if (organ.classList.contains("animating")) return;
  organ.classList.add("animating");

  const original = organ.style.transform;
  organ.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  organ.style.transform = "scale(1.2) rotate(10deg)";
  organ.style.opacity = "0.7";

  setTimeout(() => {
    organ.style.transform = original;
    organ.style.opacity = "1";
    organ.classList.remove("animating");
  }, 500);
}

// === Notifikasi ===
const notifBox = document.createElement("div");
notifBox.id = "notifBox";
Object.assign(notifBox.style, {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "15px 25px",
  background: "rgba(255,255,255,0.9)",
  border: "2px solid #333",
  borderRadius: "15px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
  fontSize: "18px",
  textAlign: "center",
  opacity: "0",
  transition: "opacity 0.5s ease",
  zIndex: "9999",
});
document.body.appendChild(notifBox);

function showNotification(text) {
  notifBox.innerHTML = text;
  notifBox.style.opacity = "1";
  clearTimeout(notifBox.timeout);
  notifBox.timeout = setTimeout(() => {
    notifBox.style.opacity = "0";
  }, 2000);
}

function hideNotification() {
  notifBox.style.opacity = "0";
}

// === Keyboard control ===
document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    keysPressed[e.key] = true;
  }
});
document.addEventListener("keyup", (e) => delete keysPressed[e.key]);

// === Game loop ===
function gameLoop() {
  if (keysPressed["ArrowUp"]) moveCharacter("up");
  if (keysPressed["ArrowDown"]) moveCharacter("down");
  if (keysPressed["ArrowLeft"]) moveCharacter("left");
  if (keysPressed["ArrowRight"]) moveCharacter("right");
  requestAnimationFrame(gameLoop);
}
gameLoop();

// === Reset posisi karakter ===
function resetPosition() {
  document.getElementById("birgy").style.top = "38%";
  document.getElementById("birgy").style.left = "21%";
  document.getElementById("icey").style.top = "56%";
  document.getElementById("icey").style.left = "21%";
  document.getElementById("pizzano").style.top = "73.5%";
  document.getElementById("pizzano").style.left = "21%";

  selected = null;
  document
    .querySelectorAll(".character")
    .forEach((el) => (el.style.border = "none"));
  progressIndex = 0;
  completedOrgans.clear();
  hideNotification();
}

function playSound(type) {
  const soundBenar = document.getElementById("soundBenar");
  const soundSalah = document.getElementById("soundSalah");
  const soundSelesai = document.getElementById("soundSelesai");

  // Hentikan semua agar tidak overlap
  [soundBenar, soundSalah, soundSelesai].forEach((s) => {
    s.pause();
    s.currentTime = 0;
  });

  if (type === "benar") soundBenar.play();
  else if (type === "salah") soundSalah.play();
  else if (type === "selesai") soundSelesai.play();
}
