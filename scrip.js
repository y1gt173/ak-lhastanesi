// ⏳ GERİ SAYIM
function updateCountdown() {
  const now = new Date();
  const target = new Date();
  target.setHours(24, 0, 0, 0);

  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "00:05:00";
    startFireworks();
    playMusic();
    return;
  }

  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  document.getElementById("countdown").innerText = `${h}:${m}:${s}`;
}

setInterval(updateCountdown, 1000);

// 🎵 MÜZİK
function playMusic() {
  const music = document.getElementById("music");
  music.volume = 0.5;
  music.play();
}

// 🎆 HAVAİ FİŞEK
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function firework() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 6 + 2,
      life: 100,
      color: `hsl(${Math.random()*360},100%,60%)`
    });
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x += Math.cos(p.angle)*p.speed;
    p.y += Math.sin(p.angle)*p.speed;
    p.life--;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
    if(p.life<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

function startFireworks() {
  setInterval(firework, 700);
}

const music = document.getElementById("music");
music.volume = 0.4;

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
