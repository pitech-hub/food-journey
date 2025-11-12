const mediaContainer = document.getElementById("media-container");
const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const txtinput = document.getElementById("text-input");
const greeting = document.getElementById("greeting");
const cp = document.getElementById("btn-CP");
const pp = document.getElementById("btn-PP");
const po = document.getElementById("btn-PO");
const btnMateri = document.getElementById("btn-materi");
const btnMateri1 = document.getElementById("btn-materi1");
const btnMateri2 = document.getElementById("btn-materi2");
const btnMateri3 = document.getElementById("btn-materi3");
const btnQuiz = document.getElementById("btn-quiz");
const btnGame = document.getElementById("btn-game");
const btnNextM1 = document.getElementById("btn-nextm1");
const btnBackM1 = document.getElementById("btn-backm1");
const btnBackM2 = document.getElementById("btn-backm2");
const btnBackM3 = document.getElementById("btn-backm3");
const btnNextEnd = document.getElementById("btn-nextend");
const btnGigi = document.getElementById("btn-gigi");
const btnLidah = document.getElementById("btn-lidah");
const btnduo = document.getElementById("btn-duo");
const btnjeju = document.getElementById("btn-jeju");
const btnileum = document.getElementById("btn-ileum");
const btnDyk = document.getElementById("btn-dyk");
const btnHome = document.getElementById("btn-home");
const btnMenu = document.getElementById("btn-menu");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const p5 = document.getElementById("p5");
const p6 = document.getElementById("p6");

const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");
const q4 = document.getElementById("q4");
const q5 = document.getElementById("q5");
const q6 = document.getElementById("q6");

const animasi1 = document.getElementById("vidanimasi1");
const animasi1x = document.getElementById("video1");
const animasi2 = document.getElementById("vidanimasi2");
const animasi2x = document.getElementById("video2");
const animasi3 = document.getElementById("vidanimasi3");
const animasi3x = document.getElementById("video3");
const animasi4 = document.getElementById("vidanimasi4");
const animasi4x = document.getElementById("video4");
const animasi5 = document.getElementById("vidanimasi5");
const animasi5x = document.getElementById("video5");

const food1 = document.getElementById("food1");
const food2 = document.getElementById("food2");
const food3 = document.getElementById("food3");
const food4 = document.getElementById("food4");
const food5 = document.getElementById("food5");

const food6 = document.getElementById("food6");
const food7 = document.getElementById("food7");
const food8 = document.getElementById("food8");
const food9 = document.getElementById("food9");
const food10 = document.getElementById("food10");

const food11 = document.getElementById("food11");
const food12 = document.getElementById("food12");
const food13 = document.getElementById("food13");
const food14 = document.getElementById("food14");
const food15 = document.getElementById("food15");

const food16 = document.getElementById("food16");
const food17 = document.getElementById("food17");
const food18 = document.getElementById("food18");
const food19 = document.getElementById("food19");
const food20 = document.getElementById("food20");

const kolomK = document.getElementById("kolomK");
const kolomP = document.getElementById("kolomP");
const kolomL = document.getElementById("kolomL");
const kolomV = document.getElementById("kolomV");
const kolomM = document.getElementById("kolomM");

const fullscreenBtn = document.getElementById("btn-fullscreen");
const fullscreenBtnImg = fullscreenBtn.querySelector("img");

// --- PERBAIKAN LENGKAP: Preload Gambar dan Video ---
function preloadAssets(assetUrls, callback) {
  let loadedCount = 0;
  const totalAssets = assetUrls.length;
  const progressBar = document.getElementById("initial-progress-bar");
  const percentageText = document.getElementById("loading-percentage");

  const updateProgress = () => {
    const percentage = Math.round((loadedCount / totalAssets) * 100);
    progressBar.style.width = percentage + "%";
    percentageText.textContent = percentage + "%";
  };

  const onAssetLoaded = () => {
    loadedCount++;
    updateProgress();
    if (loadedCount >= totalAssets) {
      // Sedikit delay agar animasi progress terlihat mulus
      setTimeout(callback, 500);
    }
  };

  // Jika tidak ada aset (edge case)
  if (totalAssets === 0) {
    updateProgress();
    return setTimeout(callback, 300);
  }

  assetUrls.forEach((url) => {
    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
    if (isVideo) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = url;
      video.fetchPriority = "high";

      // Tunggu sampai video bisa diputar tanpa buffering
      video.addEventListener("canplaythrough", onAssetLoaded, { once: true });
      video.addEventListener("error", () => {
        console.warn("Gagal memuat video:", url);
        onAssetLoaded();
      });
    } else {
      const img = new Image();
      img.fetchPriority = "high";
      img.src = url;
      img.onload = onAssetLoaded;
      img.onerror = () => {
        console.warn("Gagal memuat gambar:", url);
        onAssetLoaded();
      };
    }
  });
}

// --- Setelah semua aset dimuat ---
function onAllAssetsLoaded() {
  const loader = document.getElementById("initial-loader-container");
  const slideContainer = document.getElementById("slide-container");

  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
    slideContainer.style.display = "flex";
    showMedia(0);
  }, 500); // transisi halus
}

// Jalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
  // Kumpulkan semua URL gambar yang akan dimuat
  const allImageUrls = [
    // Gambar Slide
    ...mediaList.map((item) => item.src),
    // Gambar Tombol
    "ASSET/Start.webp",
    "ASSET/Next.webp",
    "ASSET/Back.webp",
    "ASSET/END.webp",
    "ASSET/Materi.webp",
    "ASSET/materi1.webp",
    "ASSET/materi2.webp",
    "ASSET/materi3.webp",
    "ASSET/Quiz.webp",
    "ASSET/Games.webp",
    "ASSET/home.webp",
    "ASSET/menu.webp",
    "ASSET/musik.webp",
    "ASSET/musikpause.webp",
    "ASSET/gigi.webp",
    "ASSET/lidah.webp",
    "ASSET/duodenum.webp",
    "ASSET/jejunum.webp",
    "ASSET/ileum.webp",
    "ASSET/DYK.webp",
    "ASSET/startquiz.webp",
    "ASSET/qanus.webp",
    "ASSET/qlidah.webp",
    "ASSET/qusushalus.webp",
    "ASSET/qlambung.webp",
    "ASSET/qgigi.webp",
    "ASSET/qususbesar.webp",
    "ASSET/qduode.webp",
    "ASSET/qmulut.webp",
    "ASSET/qkosongan.webp",
    // Gambar Popup
    "POPUP/1.webp",
    "POPUP/2.webp",
    "POPUP/3.webp",
    "POPUP/4.webp",
    "POPUP/5.webp",
    "POPUP/6.webp",
    "POPUP/7.webp",
    "Animasi/1.mp4",
    "Animasi/2.mp4",
    "Animasi/3.mp4",
    "Animasi/4.mp4",
    "Animasi/5.mp4",
    "makanan/1.webp",
    "makanan/2.webp",
    "makanan/3.webp",
    "makanan/4.webp",
    "makanan/5.webp",
    "makanan/6.webp",
    "makanan/7.webp",
    "makanan/8.webp",
    "makanan/9.webp",
    "makanan/10.webp",
    "makanan/11.webp",
    "makanan/12.webp",
    "makanan/13.webp",
    "makanan/14.webp",
    "makanan/15.webp",
    "makanan/16.webp",
    "makanan/17.webp",
    "makanan/18.webp",
    "makanan/19.webp",
    "makanan/20.webp",
  ];

  // Mulai proses preloading
  preloadAssets(allImageUrls, onAllAssetsLoaded);
});

const mediaList = [
  { type: "image", src: "IMG/1.webp" },
  { type: "image", src: "IMG/2.webp" },
  { type: "image", src: "IMG/3.webp" },
  { type: "image", src: "IMG/4.webp" },
  { type: "image", src: "IMG/5.webp" },
  { type: "image", src: "IMG/6.webp" },
  { type: "image", src: "IMG/7.webp" },
  { type: "image", src: "IMG/10.webp" },
  { type: "image", src: "IMG/11.webp" },
  { type: "image", src: "IMG/12.webp" },
  { type: "image", src: "IMG/13.webp" },
  { type: "image", src: "IMG/18.webp" },
  { type: "image", src: "IMG/20.webp" },
  { type: "image", src: "IMG/21.webp" },
  { type: "image", src: "IMG/22.webp" },
  { type: "image", src: "IMG/23.webp" },
  { type: "image", src: "IMG/24.webp" },
  { type: "image", src: "IMG/25.webp" },
  { type: "image", src: "IMG/26.webp" },
  { type: "image", src: "IMG/27.webp" },
  { type: "image", src: "IMG/28.webp" },
  { type: "image", src: "IMG/29.webp" },
  //game
  { type: "image", src: "IMG/30.webp" }, // 22
  { type: "image", src: "IMG/31.webp" },
  { type: "image", src: "IMG/32.webp" },
  //quiz
  { type: "image", src: "IMG/33.webp" }, // 25
  { type: "image", src: "IMG/34.webp" },
  { type: "image", src: "IMG/35.webp" },
  { type: "image", src: "IMG/36.webp" },
  { type: "image", src: "IMG/37.webp" },
  { type: "image", src: "IMG/38.webp" },
  { type: "image", src: "IMG/39.webp" },
  //
];

let currentIndex = 0;

function showMedia(index) {
  // Hapus media lama (kecuali tombol)
  const excludedIds = [
    "btn-start",
    "btn-fullscreen",
    "btn-next",
    "btn-CP",
    "btn-PP",
    "btn-PO",
    "btn-materi",
    "btn-materi1",
    "btn-materi2",
    "btn-materi3",
    "btn-quiz",
    "btn-game",
    "btn-nextm1",
    "btn-backm1",
    "btn-backm2",
    "btn-backm3",
    "btn-nextend",
    "btn-gigi",
    "btn-lidah",
    "btn-duo",
    "btn-jeju",
    "btn-ileum",
    "btn-dyk",
    "popup-gigi-container",
    "btn-dyk2",
    "btn-home",
    "btn-musik",
    "btn-menu",
    "btn-startquiz",
    "btn-qanus",
    "btn-qlidah",
    "btn-qusushalus",
    "btn-qlambung",
    "btn-qmulut",
    "btn-qduode",
    "btn-qususbesar",
    "btn-qgigi",
    "input-qsoal3a",
    "input-qsoal3b",
    "input-qsoal3c",
    "input-qsoal3d",
    "input-qsoal4",
    "input-qsoal5",
    "input-qsoal6",
    "check-soal1",
    "check-soal2",
    "check-soal3",
    "check-game1",
    "vidanimasi1", // Tambahkan ini
    "video1",
    "video2",
    "video3",
    "video4",
    "video5",
    "food1",
    "food2",
    "food3",
    "food4",
    "food5",
    "food6",
    "food7",
    "food8",
    "food9",
    "food10",
    "food11",
    "food12",
    "food13",
    "food14",
    "food15",
    "food16",
    "food17",
    "food18",
    "food19",
    "food20",
    "birgy",
    "icey",
    "pizzano",
    "organ1",
    "organ2",
    "organ3",
    "organ4",
    "organ5",
    "organ6",
    "organ7",
    "organ8",
    "organ9",
    "organ10",
    "organ11",
    "organ12",
    "organ13",
    "organ14",
  ];

  mediaContainer.querySelectorAll("img, video").forEach((el) => {
    if (el.closest(".popup-container")) {
      return; // Lewati elemen ini
    }
    // -
    // Cek apakah ID-nya atau ID parent-nya termasuk daftar yang dikecualikan
    const parentId = el.closest("button")?.id || el.parentElement?.id;
    if (!excludedIds.includes(el.id) && !excludedIds.includes(parentId)) {
      el.remove();
    }
  });

  const currentMedia = mediaList[index];
  const mediaElement = document.createElement(
    currentMedia.type === "video" ? "video" : "img"
  );
  mediaElement.src = currentMedia.src;
  if (currentMedia.type === "video") {
    mediaElement.controls = true;
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true;
  }

  // Tambahkan media ke container
  mediaContainer.insertBefore(mediaElement, btnStart);

  // Tampilkan tombol sesuai keadaan (tetap format aslimu)
  fullscreenBtn.style.display = index === 0 ? "none" : "block";
  btnStart.style.display = index === 0 ? "block" : "none";
  btnNext.style.display = index === 1 ? "block" : "none";
  txtinput.style.display = index === 1 ? "block" : "none";
  greeting.style.display = index === 2 ? "block" : "none";
  cp.style.display = index === 2 ? "block" : "none";
  pp.style.display = index === 2 ? "block" : "none";
  po.style.display = index === 2 ? "block" : "none";
  btnMateri.style.display = index === 2 ? "block" : "none"; // ✅ tampil mulai slide ke-3
  btnQuiz.style.display = index === 2 ? "block" : "none";
  btnGame.style.display = index === 2 ? "block" : "none";
  btnMateri1.style.display = index === 3 ? "block" : "none";
  btnMateri2.style.display = index === 3 ? "block" : "none";
  btnMateri3.style.display = index === 3 ? "block" : "none";
  btnHome.style.display = [0, 1, 2].includes(index) ? "none" : "block";
  btnMenu.style.display = [
    0, 1, 2, 3, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ].includes(index)
    ? "none"
    : "block";
  btnMusik.style.display = [0].includes(index) ? "none" : "block";
  btnNextM1.style.display = [
    4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 22, 23, 26, 27, 28,
    29, 30,
  ].includes(index)
    ? "block"
    : "none";
  btnBackM1.style.display = [
    4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 19, 20, 21, 23, 24, 26, 27,
    28, 29, 30, 31,
  ].includes(index)
    ? "block"
    : "none";
  btnNextEnd.style.display = [12, 17, 21, 24, 31].includes(index)
    ? "block"
    : "none";
  btnBackM2.style.display = index === 13 ? "block" : "none";
  btnBackM3.style.display = index === 18 ? "block" : "none";
  btnGigi.style.display = index === 6 ? "block" : "none";
  btnLidah.style.display = index === 6 ? "block" : "none";
  btnduo.style.display = index === 10 ? "block" : "none";
  btnjeju.style.display = index === 10 ? "block" : "none";
  btnileum.style.display = index === 10 ? "block" : "none";
  btnDyk.style.display = index === 11 ? "block" : "none";
  //quiz//
  btnStartQuiz.style.display = index === 25 ? "block" : "none";
  btnqAnus.style.display = index === 26 ? "block" : "none";
  btnqLidah.style.display = index === 26 ? "block" : "none";
  btnqUsushalus.style.display = index === 26 ? "block" : "none";
  btnqLambung.style.display = index === 26 ? "block" : "none";
  check1.style.display = index === 26 ? "block" : "none";

  btnqMulut.style.display = index === 27 ? "block" : "none";
  btnqDuode.style.display = index === 27 ? "block" : "none";
  btnqUsusbesar.style.display = index === 27 ? "block" : "none";
  btnqGigi.style.display = index === 27 ? "block" : "none";
  check2.style.display = index === 27 ? "block" : "none";
  btnqSoal3a.style.display = index === 28 ? "block" : "none";
  btnqSoal3b.style.display = index === 28 ? "block" : "none";
  btnqSoal3c.style.display = index === 28 ? "block" : "none";
  btnqSoal3d.style.display = index === 28 ? "block" : "none";
  check3.style.display = index === 28 ? "block" : "none";
  btnqSoal4.style.display = index === 29 ? "block" : "none";
  btnqSoal5.style.display = index === 30 ? "block" : "none";
  btnqSoal6.style.display = index === 31 ? "block" : "none";

  p1.style.display = index === 22 ? "block" : "none";
  p2.style.display = index === 22 ? "block" : "none";
  p3.style.display = index === 22 ? "block" : "none";
  p4.style.display = index === 22 ? "block" : "none";
  p5.style.display = index === 22 ? "block" : "none";
  p6.style.display = index === 22 ? "block" : "none";

  q1.style.display = index === 22 ? "block" : "none";
  q2.style.display = index === 22 ? "block" : "none";
  q3.style.display = index === 22 ? "block" : "none";
  q4.style.display = index === 22 ? "block" : "none";
  q5.style.display = index === 22 ? "block" : "none";
  q6.style.display = index === 22 ? "block" : "none";

  resetBtn.style.display = index === 22 ? "block" : "none";
  canvas.style.display = index === 22 ? "block" : "none";
  game1.style.display = index === 22 ? "block" : "none";

  food1.style.display = index === 23 ? "block" : "none";
  food2.style.display = index === 23 ? "block" : "none";
  food3.style.display = index === 23 ? "block" : "none";
  food4.style.display = index === 23 ? "block" : "none";
  food5.style.display = index === 23 ? "block" : "none";

  food6.style.display = index === 23 ? "block" : "none";
  food7.style.display = index === 23 ? "block" : "none";
  food8.style.display = index === 23 ? "block" : "none";
  food9.style.display = index === 23 ? "block" : "none";
  food10.style.display = index === 23 ? "block" : "none";

  food11.style.display = index === 23 ? "block" : "none";
  food12.style.display = index === 23 ? "block" : "none";
  food13.style.display = index === 23 ? "block" : "none";
  food14.style.display = index === 23 ? "block" : "none";
  food15.style.display = index === 23 ? "block" : "none";

  food16.style.display = index === 23 ? "block" : "none";
  food17.style.display = index === 23 ? "block" : "none";
  food18.style.display = index === 23 ? "block" : "none";
  food19.style.display = index === 23 ? "block" : "none";
  food20.style.display = index === 23 ? "block" : "none";

  kolomK.style.display = index === 23 ? "block" : "none";
  kolomP.style.display = index === 23 ? "block" : "none";
  kolomL.style.display = index === 23 ? "block" : "none";
  kolomV.style.display = index === 23 ? "block" : "none";
  kolomM.style.display = index === 23 ? "block" : "none";

  birgy.style.display = index === 24 ? "block" : "none";
  icey.style.display = index === 24 ? "block" : "none";
  pizzano.style.display = index === 24 ? "block" : "none";
  // resetposisi.style.display = index === 24 ? "block" : "none";

  organ1.style.display = index === 24 ? "block" : "none";
  organ2.style.display = index === 24 ? "block" : "none";
  organ3.style.display = index === 24 ? "block" : "none";
  organ4.style.display = index === 24 ? "block" : "none";
  organ5.style.display = index === 24 ? "block" : "none";
  organ6.style.display = index === 24 ? "block" : "none";
  organ7.style.display = index === 24 ? "block" : "none";
  organ8.style.display = index === 24 ? "block" : "none";
  organ9.style.display = index === 24 ? "block" : "none";
  organ10.style.display = index === 24 ? "block" : "none";
  organ11.style.display = index === 24 ? "block" : "none";
  organ12.style.display = index === 24 ? "block" : "none";
  organ13.style.display = index === 24 ? "block" : "none";
  organ14.style.display = index === 24 ? "block" : "none";

  animasi1.style.display = index === 4 ? "block" : "none";
  animasi1x.style.display = index === 4 ? "block" : "none";
  animasi2.style.display = index === 7 ? "block" : "none";
  animasi2x.style.display = index === 7 ? "block" : "none";
  animasi3.style.display = index === 8 ? "block" : "none";
  animasi3x.style.display = index === 8 ? "block" : "none";
  animasi4.style.display = index === 9 ? "block" : "none";
  animasi4x.style.display = index === 9 ? "block" : "none";
  animasi5.style.display = index === 11 ? "block" : "none";
  animasi5x.style.display = index === 11 ? "block" : "none";

  // Jika sedang di slide 1 (input nama)
  if (index === 1) {
    txtinput.value = ""; // kosongkan input saat slide dimulai
    btnNext.style.display = "none"; // sembunyikan tombol next sampai user isi teks

    txtinput.addEventListener("input", () => {
      btnNext.style.display = txtinput.value.trim() !== "" ? "block" : "none";
    });
  }
  if (index === 23) {
    // 1. Inisialisasi game (hanya akan berjalan sekali)
    initGame2();
    // 2. Muat state game terakhir (akan berjalan setiap kali slide ini dibuka)
    loadGameState2();
  }
}
