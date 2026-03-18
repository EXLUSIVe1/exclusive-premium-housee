const phoneNumber = "+998 91 987 17 17";
const phoneButton = document.getElementById("phoneButton");
phoneButton.innerHTML = `<i class="fas fa-phone-alt"></i> ${phoneNumber} <span class="ripple"></span>`;
phoneButton.href = "tel:" + phoneNumber;

document.querySelectorAll('.button').forEach(button=>{
  button.addEventListener('click', function(e){
    const ripple=this.querySelector('.ripple');
    ripple.style.left=`${e.offsetX}px`;
    ripple.style.top=`${e.offsetY}px`;
    ripple.classList.remove('animate'); void ripple.offsetWidth; ripple.classList.add('animate');

    this.classList.add('clicked');
    setTimeout(()=>this.classList.remove('clicked'),150);
  });
});

const sparklesContainer=document.querySelector('.sparkles');
function createSparkle(){
  const sparkle=document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left=Math.random()*window.innerWidth+'px';
  sparkle.style.top=window.innerHeight+'px';
  sparkle.style.animationDuration=(2+Math.random()*3)+'s';
  sparklesContainer.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),5000);
}
setInterval(createSparkle,200);

const copyButton=document.getElementById("copyLink");
const bioLink="https://www.instagram.com/exclusive_premium_house_?igsh=bDA3aG1sMm1kcW5k";
copyButton.addEventListener('click',()=>{
  navigator.clipboard.writeText(bioLink).then(()=>{
    copyButton.innerText="✅ Nusxalandi!";
    setTimeout(()=>{copyButton.innerHTML=`<i class="fas fa-link"></i> Bio Linkni Nusxalash <span class="ripple"></span>`;},1500);
  });
});

const qrButton=document.getElementById("qrButton");
const qrContainer=document.getElementById("qrContainer");
qrButton.addEventListener('click',()=>{
  qrContainer.innerHTML="";
  QRCode.toCanvas(bioLink,{width:180,margin:1},(err,canvas)=>{
    if(err) console.error(err);
    qrContainer.appendChild(canvas);
  });
});
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDhoLqoMxgToC_QakPTACxkEsbSa9VRtek",
  authDomain: "codea-wear.firebaseapp.com",
  databaseURL: "https://codea-wear-default-rtdb.firebaseio.com/",
  projectId: "codea-wear",
  storageBucket: "codea-wear.firebasestorage.app",
  messagingSenderId: "443203913183",
  appId: "1:443203913183:web:845fd62a08c66fc6ed706a"
};

// Init
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// REALTIME DATA
db.ref("shop").on("value", (snapshot) => {
  const data = snapshot.val();

  if(!data) return;

  // Telefon
  const phoneButton = document.getElementById("phoneButton");
  phoneButton.innerHTML = `<i class="fas fa-phone-alt"></i> ${data.phone}`;
  phoneButton.href = "tel:" + data.phone;

  // Instagram
  document.querySelector(".instagram").href = data.instagram;

  // Telegram
  document.querySelector(".telegram").href = data.telegram;
});