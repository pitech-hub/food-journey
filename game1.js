const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resetBtn = document.getElementById("reset-btn");
const game1 = document.getElementById("check-game1");

let startPoint = null;
let tempMouse = null;
const connections = [];

// TAMBAHAN: Toleransi jarak untuk mendeteksi klik pada garis (dalam piksel)
const TOLERANCE = 10;

function getCenter(el) {
  const rect = el.getBoundingClientRect();
  const parent = canvas.getBoundingClientRect();
  return {
    x: rect.left - parent.left + rect.width / 2,
    y: rect.top - parent.top + rect.height / 2,
  };
}

function drawConnections() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  connections.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line.from.x, line.from.y);
    ctx.lineTo(line.to.x, line.to.y);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  });
}

function animateLine(from, to, color = "#2ecc71") {
  const steps = 25;
  let currentStep = 0;
  function animate() {
    if (currentStep <= steps) {
      const progressX = from.x + ((to.x - from.x) * currentStep) / steps;
      const progressY = from.y + ((to.y - from.y) * currentStep) / steps;
      drawConnections();
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(progressX, progressY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
      currentStep++;
      requestAnimationFrame(animate);
    } else {
      connections.push({ from, to, color });
      drawConnections();
    }
  }
  animate();
}

// TAMBAHAN: Fungsi untuk menghitung jarak dari titik ke segmen garis
function getDistanceFromPointToLine(px, py, line) {
  const {
    from: { x: x1, y: y1 },
    to: { x: x2, y: y2 },
  } = line;

  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

document.querySelectorAll(".point").forEach((p) => {
  p.addEventListener("mousedown", (e) => {
    const target = e.target;

    if (startPoint === target) {
      startPoint.classList.remove("active");
      startPoint = null;
      drawConnections();
      return;
    }

    if (!startPoint) {
      startPoint = target;
      target.classList.add("active");
    } else {
      const sameSide =
        (startPoint.closest(".left") && target.closest(".left")) ||
        (startPoint.closest(".right") && target.closest(".right"));

      if (sameSide) return;

      const from = getCenter(startPoint);
      const to = getCenter(target);

      startPoint.classList.remove("active");
      animateLine(from, to, "#4c368d");
      startPoint = null;
    }
  });
});

// UBAHAN: Event mousemove sekarang juga menangani perubahan kursor
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Logika untuk menggambar garis sementara
  if (startPoint) {
    tempMouse = { x: mouseX, y: mouseY };
    drawConnections();
    const from = getCenter(startPoint);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(tempMouse.x, tempMouse.y);
    ctx.strokeStyle = "#3498db";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.closePath();
    canvas.style.cursor = "crosshair"; // Kursor saat menggambar
  } else {
    // Logika untuk mengubah kursor saat di atas garis
    let isOverLine = false;
    for (const line of connections) {
      if (getDistanceFromPointToLine(mouseX, mouseY, line) < TOLERANCE) {
        isOverLine = true;
        break;
      }
    }
    canvas.style.cursor = isOverLine ? "pointer" : "default";
  }
});

canvas.addEventListener("mouseup", () => {
  tempMouse = null;
  drawConnections();
});

// TAMBAHAN: Event listener untuk menghapus garis
canvas.addEventListener("click", (e) => {
  // Jika sedang dalam proses menggambar garis baru, jangan hapus
  if (startPoint) return;

  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // Iterasi dari belakang untuk menghapus garis yang paling atas (terakhir dibuat)
  for (let i = connections.length - 1; i >= 0; i--) {
    const line = connections[i];
    if (getDistanceFromPointToLine(clickX, clickY, line) < TOLERANCE) {
      connections.splice(i, 1); // Hapus garis dari array
      drawConnections(); // Gambar ulang canvas
      break; // Hentikan loop setelah menghapus satu garis
    }
  }
});

resetBtn.addEventListener("click", () => {
  connections.length = 0;
  startPoint = null;
  drawConnections();
  document
    .querySelectorAll(".point")
    .forEach((p) => p.classList.remove("active"));
});

// --- Cek Jawaban Game 1 dengan warna garis ---
const kunciGame1 = {
  p1: "q3",
  p2: "q4",
  p3: "q5",
  p4: "q1",
  p5: "q2",
  p6: "q6",
};

game1.addEventListener("click", () => {
  let benar = 0;
  let total = Object.keys(kunciGame1).length;

  // Ubah connections jadi pasangan p-q
  const hasilUser = connections
    .map((line) => {
      const pElements = [...document.querySelectorAll(".point")];
      const fromId = pElements.find((el) => {
        const c = getCenter(el);
        return (
          Math.abs(c.x - line.from.x) < 5 && Math.abs(c.y - line.from.y) < 5
        );
      })?.id;

      const toId = pElements.find((el) => {
        const c = getCenter(el);
        return Math.abs(c.x - line.to.x) < 5 && Math.abs(c.y - line.to.y) < 5;
      })?.id;

      // pastikan sisi kiri = p, sisi kanan = q
      if (fromId && toId) {
        if (fromId.startsWith("p") && toId.startsWith("q"))
          return { p: fromId, q: toId, line };
        else if (fromId.startsWith("q") && toId.startsWith("p"))
          return { p: toId, q: fromId, line };
      }
      return null;
    })
    .filter(Boolean);

  // Reset warna semua garis dulu
  connections.forEach((line) => (line.color = "#4c368d"));

  // Bandingkan hasil user dengan kunci + ubah warna
  hasilUser.forEach((pair) => {
    if (kunciGame1[pair.p] === pair.q) {
      benar++;
      pair.line.color = "#2ecc71"; // 🟩 benar
    } else {
      pair.line.color = "#e74c3c"; // 🟥 salah
    }
  });

  drawConnections();

  // Notifikasi hasil
  if (benar === total) {
    soundCorrect.play();
    showNotif("🎉 Keren! Semua pasangan garis kamu benar!", "correct");
  } else {
    soundWrong.play();
    showNotif(
      `😅 Ada ${total - benar} garis yang salah. Perbaiki lagi ya!`,
      "wrong"
    );
  }
});
