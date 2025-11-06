const btnStartQuiz = document.getElementById("btn-startquiz");
const btnqLambung = document.getElementById("btn-qlambung");
const btnqUsushalus = document.getElementById("btn-qusushalus");
const btnqLidah = document.getElementById("btn-qlidah");
const btnqAnus = document.getElementById("btn-qanus");
const btnqMulut = document.getElementById("btn-qmulut");
const btnqDuode = document.getElementById("btn-qduode");
const btnqUsusbesar = document.getElementById("btn-qususbesar");
const btnqGigi = document.getElementById("btn-qgigi");
const btnqSoal3a = document.getElementById("input-qsoal3a");
const btnqSoal3b = document.getElementById("input-qsoal3b");
const btnqSoal3c = document.getElementById("input-qsoal3c");
const btnqSoal3d = document.getElementById("input-qsoal3d");
const btnqSoal4 = document.getElementById("input-qsoal4");
const btnqSoal5 = document.getElementById("input-qsoal5");
const btnqSoal6 = document.getElementById("input-qsoal6");
const check1 = document.getElementById("check-soal1");
const check2 = document.getElementById("check-soal2");
const check3 = document.getElementById("check-soal3");
// const check4 = document.getElementById("check-soal4");
// const check5 = document.getElementById("check-soal5");
// const check6 = document.getElementById("check-soal6");

const notif = document.getElementById("notif");
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

// --- SUARA & NOTIFIKASI --- //
notif.id = "notif";
document.body.appendChild(notif);

// --- KELOMPOK PILIHAN GAMBAR --- //
const soalGroups = {
  soal1: ["btn-qanus", "btn-qlidah", "btn-qusushalus", "btn-qlambung"],
  soal2: ["btn-qgigi", "btn-qususbesar", "btn-qduode", "btn-qmulut"],
};

// --- KUNCI JAWABAN --- //
const kunciJawaban = {
  soal1: "btn-qusushalus",
  soal2: "btn-qususbesar",
  soal3: ["MENGHANCURKAN", "LAMBUNG", "USUS HALUS", "ANUS"],
  // soal4: "USUS BESAR",
  // soal5: "ANUS",
  // soal6: "LIDAH",
};

const jawabanUser = {};

// --- PILIHAN GAMBAR (Soal 1 & 2) --- //
Object.keys(soalGroups).forEach((soal) => {
  const ids = soalGroups[soal];
  ids.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const img = btn.querySelector("img");
    const originalSrc = img.getAttribute("src");
    const klikSrc = originalSrc.replace(".png", "klik.png");

    btn.addEventListener("click", () => {
      ids.forEach((otherId) => {
        const other = document.getElementById(otherId);
        if (!other) return;
        const oImg = other.querySelector("img");
        if (oImg.src.endsWith("klik.png"))
          oImg.src = oImg.src.replace("klik.png", ".png");
      });
      img.src = klikSrc;
      jawabanUser[soal] = id;
    });
  });
});

// --- FUNGSI NOTIFIKASI --- //
function showNotif(teks, status) {
  notif.textContent = teks;
  notif.className = `notif show ${status}`;
  setTimeout(() => notif.classList.remove("show", "correct", "wrong"), 1800);
}

// --- CEK GAMBAR (1 & 2) --- //
check1.addEventListener("click", () => {
  if (jawabanUser.soal1 === kunciJawaban.soal1) {
    soundCorrect.play();
    showNotif("🎉 BENAR! Ini organ pencernaan yang tepat!", "correct");
  } else {
    soundWrong.play();
    showNotif("😜 Salah nih! Coba pikir lagi~", "wrong");
  }
});

check2.addEventListener("click", () => {
  if (jawabanUser.soal2 === kunciJawaban.soal2) {
    soundCorrect.play();
    showNotif("🎯 Betul sekali! Kamu hebat!", "correct");
  } else {
    soundWrong.play();
    showNotif("😅 Kurang tepat... ayo semangat!", "wrong");
  }
});

// --- AMBIL TEKS DARI TEXTAREA DALAM DIV --- //
function getTextareaValue(divId) {
  const div = document.getElementById(divId);
  const textarea = div ? div.querySelector("textarea") : null;
  return textarea ? textarea.value.trim().toUpperCase() : "";
}

// --- CEK ISIAN (3–6) --- //
check3.addEventListener("click", () => {
  const jawaban = [
    getTextareaValue("input-qsoal3a"),
    getTextareaValue("input-qsoal3b"),
    getTextareaValue("input-qsoal3c"),
    getTextareaValue("input-qsoal3d"),
  ];

  if (jawaban.some((j) => j === "")) {
    showNotif("⚠️ Lengkapi semua kolom dulu!", "wrong");
    return;
  }

  const benar = kunciJawaban.soal3.every((val, i) => val === jawaban[i]);
  if (benar) {
    soundCorrect.play();
    showNotif("🌟 Hebat! Semua urutan sudah benar!", "correct");
  } else {
    soundWrong.play();
    showNotif("🧐 Ada yang keliru, cek lagi urutannya!", "wrong");
  }
});

// check4.addEventListener("click", () => {
//   const val = getTextareaValue("input-qsoal4");
//   if (!val) return showNotif("⚠️ Isi dulu jawabannya!", "wrong");
//   if (val === kunciJawaban.soal4) {
//     soundCorrect.play();
//     showNotif("✅ Tepat sekali!", "correct");
//   } else {
//     soundWrong.play();
//     showNotif("❌ Masih salah, coba lagi ya!", "wrong");
//   }
// });

// check5.addEventListener("click", () => {
//   const val = getTextareaValue("input-qsoal5");
//   if (!val) return showNotif("⚠️ Isi dulu jawabannya!", "wrong");
//   if (val === kunciJawaban.soal5) {
//     soundCorrect.play();
//     showNotif("👏 Benar! Kamu paham fungsinya!", "correct");
//   } else {
//     soundWrong.play();
//     showNotif("😅 Kurang tepat, periksa lagi!", "wrong");
//   }
// });

// check6.addEventListener("click", () => {
//   const val = getTextareaValue("input-qsoal6");
//   if (!val) return showNotif("⚠️ Isi dulu jawabannya!", "wrong");
//   if (val === kunciJawaban.soal6) {
//     soundCorrect.play();
//     showNotif("💪 Mantap! Jawabanmu benar!", "correct");
//   } else {
//     soundWrong.play();
//     showNotif("😜 Salah sedikit nih, coba lagi!", "wrong");
//   }
// });
