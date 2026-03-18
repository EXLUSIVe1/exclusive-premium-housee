// ================= PHONE =================
const phoneNumber = "+998 91 987 17 17";
const phoneButton = document.getElementById("phoneButton");

if (phoneButton) {
  phoneButton.innerHTML = `<i class="fas fa-phone-alt"></i> ${phoneNumber} <span class="ripple"></span>`;
  phoneButton.href = "tel:" + phoneNumber;
}

// ================= RIPPLE EFFECT =================
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = this.querySelector('.ripple');
    if (!ripple) return;

    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;

    ripple.classList.remove('animate');
    void ripple.offsetWidth;
    ripple.classList.add('animate');

    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 150);
  });
});

// ================= SPARKLES =================
const sparklesContainer = document.querySelector('.sparkles');

function createSparkle() {
  if (!sparklesContainer) return;

  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = window.innerHeight + 'px';
  sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';

  sparklesContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 5000);
}

setInterval(createSparkle, 200);

// ================= COPY LINK =================
const copyButton = document.getElementById("copyLink");
const bioLink = "https://www.instagram.com/exclusive_premium_house_";

if (copyButton) {
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(bioLink).then(() => {
      copyButton.innerText = "✅ Nusxalandi!";

      setTimeout(() => {
        copyButton.innerHTML = `<i class="fas fa-link"></i> Bio Linkni Nusxalash <span class="ripple"></span>`;
      }, 1500);
    });
  });
}

// ================= QR CODE =================
const qrButton = document.getElementById("qrButton");
const qrContainer = document.getElementById("qrContainer");

if (qrButton && qrContainer) {
  qrButton.addEventListener('click', () => {
    qrContainer.innerHTML = "";

    QRCode.toCanvas(bioLink, { width: 180, margin: 1 }, (err, canvas) => {
      if (err) console.error(err);
      qrContainer.appendChild(canvas);
    });
  });
}

// ================= FIREBASE =================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "codea-wear.firebaseapp.com",
  databaseURL: "https://codea-wear-default-rtdb.firebaseio.com/",
  projectId: "codea-wear",
  storageBucket: "codea-wear.firebasestorage.app",
  messagingSenderId: "443203913183",
  appId: "1:443203913183:web:845fd62a08c66fc6ed706a"
};

// Firebase borligini tekshiramiz
if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  db.ref("shop").on("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Telefon
    const phoneBtn = document.getElementById("phoneButton");
    if (phoneBtn) {
      phoneBtn.innerHTML = `<i class="fas fa-phone-alt"></i> ${data.phone}`;
      phoneBtn.href = "tel:" + data.phone;
    }

    // Instagram
    const insta = document.querySelector(".instagram");
    if (insta) insta.href = data.instagram;

    // Telegram
    const tg = document.querySelector(".telegram");
    if (tg) tg.href = data.telegram;
  });
}

// ================= SCROLL ANIMATION =================


// Sahifa ochilganda ham ishlaydi
window.addEventListener("load", checkScroll);

// Scroll bo‘lganda ham ishlaydi
window.addEventListener("scroll", checkScroll);

const faders = document.querySelectorAll(".fade");

function checkScroll() {
  faders.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("load", checkScroll);
window.addEventListener("scroll", checkScroll);