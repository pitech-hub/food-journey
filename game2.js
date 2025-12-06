// game 2

const originalParents = {};

function allowDrop(event) {
  event.preventDefault();
}

window.addEventListener("DOMContentLoaded", () => {
  // Simpan posisi awal
  document.querySelectorAll(".food").forEach((img, index) => {
    if (!img.id) img.id = "food-img-" + (index + 1);
    originalParents[img.id] = img.parentElement;
  });

  // Tambah slot kosong ke tiap kolom
  document.querySelectorAll(".column").forEach((col) => {
    for (let i = 0; i < 4; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      // Tidak perlu ondrop/ondragover di sini lagi
      col.appendChild(slot);
    }
  });

  // --- PERUBAHAN PENTING ---
  // Jadikan seluruh .column sebagai area drop
  document.querySelectorAll(".column").forEach((column) => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("drop", drop);
    column.addEventListener("dragleave", handleDragLeave); // Untuk menghapus highlight
  });

  // 2. Area asal (food-list)
  document.querySelectorAll(".food-list").forEach((list) => {
    list.addEventListener("dragover", handleDragOver);
    list.addEventListener("drop", drop);
    list.addEventListener("dragleave", handleDragLeave);
  });

  // Event drag untuk gambar makanan
  document.querySelectorAll(".food").forEach((food) => {
    food.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  loadGameState();
});

// Fungsi baru untuk menangani saat item diseret di atas area
function handleDragOver(event) {
  event.preventDefault(); // Tetap diperlukan untuk mengizinkan drop

  // Cari slot yang sedang dituju
  const targetSlot = event.target.closest(".slot");
  const targetFoodList = event.target.closest(".food-list");

  // Hapus highlight dari semua slot terlebih dahulu
  document
    .querySelectorAll(".slot")
    .forEach((s) => s.classList.remove("drag-over"));
  document
    .querySelectorAll(".food-list")
    .forEach((l) => l.classList.remove("drag-over"));

  // Tambahkan highlight ke slot atau area yang dituju
  if (targetSlot && !targetSlot.classList.contains("filled")) {
    targetSlot.classList.add("drag-over");
  } else if (targetFoodList) {
    targetFoodList.classList.add("drag-over");
  }
}

// Fungsi untuk menghapus highlight saat kursor keluar dari area drop
function handleDragLeave(event) {
  // Hanya hapus highlight jika kursor benar-benar keluar dari kolom/food-list
  if (!event.currentTarget.contains(event.relatedTarget)) {
    document
      .querySelectorAll(".slot")
      .forEach((s) => s.classList.remove("drag-over"));
    document
      .querySelectorAll(".food-list")
      .forEach((l) => l.classList.remove("drag-over"));
  }
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const dragged = document.getElementById(data);

  // Cari target yang memiliki highlight
  const targetSlot = document.querySelector(".slot.drag-over");
  const targetFoodList = document.querySelector(".food-list.drag-over");

  // Hapus highlight setelah drop
  document
    .querySelectorAll(".slot")
    .forEach((s) => s.classList.remove("drag-over"));
  document
    .querySelectorAll(".food-list")
    .forEach((l) => l.classList.remove("drag-over"));

  // --- KASUS 1: Drop ke dalam Slot yang Dituji ---
  if (targetSlot && !targetSlot.classList.contains("filled")) {
    // Hapus dari slot lama jika ada
    const oldSlot = dragged.closest(".slot");
    if (oldSlot) {
      oldSlot.classList.remove("filled");
    }
    // Pindahkan ke slot baru yang dituju
    targetSlot.appendChild(dragged);
    targetSlot.classList.add("filled");
    animasiDrop(dragged);

    // 🔍 CEK BENAR / SALAH
    // 🔍 CEK BENAR / SALAH
    const kolomId = targetSlot.parentElement.id; // contoh: kolomK, kolomP
    const makananId = dragged.dataset.foodId; // contoh: "nasi"
    const food = dragged; // ambil elemen gambar
    const columnType = kolomId; // alias agar mudah dibaca

    // Cek apakah benar
    const isCorrect = kategoriBenar[kolomId]?.includes(makananId);

    if (isCorrect) {
      // ⭐ Tambahkan animasi sukses
      targetSlot.classList.add("correct");

      // ⭐ Mainkan suara benar
      playSoundgjf("correct");

      // ⭐ Tampilkan notifikasi keren
      showNotificationgjf(
        "correct",
        "Benar!",
        `${food.alt} mengandung ${getNutrientName(columnType)} yang tinggi.`
      );
    } else {
      // ⭐ Tambahkan animasi salah
      targetSlot.classList.add("incorrect");

      // ⭐ Mainkan suara salah
      playSoundgjf("incorrect");

      // ⭐ Notifikasi salah + pesan motivasi
      showNotificationgjf(
        "incorrect",
        "Coba Lagi!",
        `${food.alt} tidak termasuk kategori ${getNutrientName(columnType)}.`
      );
    }

    saveGameState();

    return;
  }

  // --- KASUS 2: Drop kembali ke Area Asal ---
  if (targetFoodList) {
    const oldSlot = dragged.closest(".slot");
    if (oldSlot) {
      oldSlot.classList.remove("filled");
    }
    targetFoodList.appendChild(dragged);
    animasiDrop(dragged);
    saveGameState();
  }
}

// Efek animasi lembut
function animasiDrop(el) {
  el.style.transition = "transform 0.3s ease";
  el.style.transform = "scale(1.1)";
  setTimeout(() => (el.style.transform = "scale(1)"), 300);
}

// 💾 Simpan posisi gambar ke localStorage
function saveGameState() {
  const state = {};
  document.querySelectorAll(".slot").forEach((slot, index) => {
    const img = slot.querySelector("img");
    state["slot" + index] = img ? img.id : null;
  });

  // Simpan area food-list
  const foodListState = {};
  document.querySelectorAll(".food-list").forEach((list, index) => {
    const imgs = Array.from(list.querySelectorAll("img")).map((i) => i.id);
    foodListState["list" + index] = imgs;
  });

  localStorage.setItem("slotState", JSON.stringify(state));
  localStorage.setItem("foodListState", JSON.stringify(foodListState));
}

// 🔄 Muat posisi gambar dari localStorage
function loadGameState() {
  const slotState = JSON.parse(localStorage.getItem("slotState") || "{}");
  const foodListState = JSON.parse(
    localStorage.getItem("foodListState") || "{}"
  );

  // Pulihkan slot
  Object.keys(slotState).forEach((key) => {
    const slot = document.querySelectorAll(".slot")[key.replace("slot", "")];
    const imgId = slotState[key];
    if (slot && imgId) {
      const img = document.getElementById(imgId);
      if (img) {
        slot.appendChild(img);
        slot.classList.add("filled");
      }
    }
  });

  // Pulihkan food list
  Object.keys(foodListState).forEach((key) => {
    const list =
      document.querySelectorAll(".food-list")[key.replace("list", "")];
    if (list) {
      foodListState[key].forEach((imgId) => {
        const img = document.getElementById(imgId);
        if (img) list.appendChild(img);
      });
    }
  });
}

const kategoriBenar = {
  kolomK: ["nasi", "roti", "kentang", "mie"],
  kolomP: ["ayam", "ikan", "daging", "tempe"],
  kolomL: ["madu", "mentega", "alpukat", "telur"],
  kolomV: ["wortel", "tomat", "apel", "jeruk"],
  kolomM: ["bayam", "jamur", "brokoli", "keju"],
};

function showNotificationgjf(type, title, message) {
  const container = document.getElementById("gjfNotifContainer");

  const notif = document.createElement("div");
  notif.classList.add("gjf-notif", type);
  notif.innerHTML = `
      <div class="gjf-title">${title}</div>
      <div class="gjf-message">${message}</div>
  `;

  container.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = "gjfFadeOut 0.4s ease forwards";
    setTimeout(() => notif.remove(), 400);
  }, 2500);
}

function playSoundgjf(type) {
  const audio =
    type === "correct"
      ? document.getElementById("sound-correct")
      : document.getElementById("sound-wrong");

  audio.currentTime = 0;
  audio.play();
}

function getNutrientName(id) {
  switch (id) {
    case "kolomK":
      return "Karbohidrat";
    case "kolomP":
      return "Protein";
    case "kolomL":
      return "Lemak";
    case "kolomV":
      return "Vitamin";
    case "kolomM":
      return "Mineral";
    default:
      return "Nutrisi";
  }
}
