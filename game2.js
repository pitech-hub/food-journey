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
      slot.setAttribute("ondrop", "drop(event)");
      slot.setAttribute("ondragover", "allowDrop(event)");
      col.appendChild(slot);
    }
  });

  // Area asal (food-list)
  document.querySelectorAll(".food-list").forEach((list) => {
    list.setAttribute("ondrop", "drop(event)");
    list.setAttribute("ondragover", "allowDrop(event)");
  });

  // Event drag
  document.querySelectorAll(".food").forEach((food) => {
    food.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  // 🔄 Muat ulang posisi terakhir jika ada
  loadGameState();
});

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const dragged = document.getElementById(data);

  const targetSlot = event.target.classList.contains("slot")
    ? event.target
    : event.target.closest(".slot");

  const targetFoodList = event.target.classList.contains("food-list")
    ? event.target
    : event.target.closest(".food-list");

  // Jika drop ke area asal (food-list)
  if (targetFoodList) {
    const oldSlot = dragged.closest(".slot");
    if (oldSlot) oldSlot.classList.remove("filled");
    targetFoodList.appendChild(dragged);
    animasiDrop(dragged);
    saveGameState(); // 💾 simpan posisi
    return;
  }

  // Jika drop ke slot kosong SAJA
  if (targetSlot && !targetSlot.classList.contains("filled")) {
    const oldSlot = dragged.closest(".slot");
    if (oldSlot && oldSlot !== targetSlot) {
      oldSlot.classList.remove("filled");
    }
    targetSlot.appendChild(dragged);
    targetSlot.classList.add("filled");
    animasiDrop(dragged);
    saveGameState(); // 💾 simpan posisi
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
