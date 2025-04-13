// Create falling flowers
const flowerContainer = document.querySelector('.falling-flowers');

function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.textContent = '🌸'; // you can change to 🌺, 🌼, 💮
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
    flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
    flower.style.opacity = Math.random();
    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 5000);
}

setInterval(createFlower, 300);

// CSS Animation
const style = document.createElement('style');
style.innerHTML = `
.flower {
    position: absolute;
    top: -50px;
    animation: fall linear forwards;
}

@keyframes fall {
    to {
        transform: translateY(110vh) rotate(360deg);
    }
}
`;
document.head.appendChild(style);
// Make only the currently playing audio glow
const audios = document.querySelectorAll('audio');

audios.forEach(audio => {
  audio.addEventListener('play', () => {
    audios.forEach(a => a.classList.remove('playing'));
    audio.classList.add('playing');
  });

  audio.addEventListener('pause', () => {
    audio.classList.remove('playing');
  });

  audio.addEventListener('ended', () => {
    audio.classList.remove('playing');
  });
});
// Horizontal Scroll Arrows
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

function updateArrows() {
  const scrollLeft = photoGrid.scrollLeft;
  const maxScroll = photoGrid.scrollWidth - photoGrid.clientWidth;
  
  leftArrow.style.display = scrollLeft > 0 ? 'block' : 'none';
  rightArrow.style.display = scrollLeft < maxScroll - 1 ? 'block' : 'none';
}

photoGrid.addEventListener('scroll', updateArrows);

leftArrow.addEventListener('click', () => {
  photoGrid.scrollBy({
    left: -photoGrid.offsetWidth * 0.8,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', () => {
  photoGrid.scrollBy({
    left: photoGrid.offsetWidth * 0.8,
    behavior: 'smooth'
  });
});

// Touch and Wheel Horizontal Scrolling
let isDown = false;
let startX;
let scrollLeft;

photoGrid.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - photoGrid.offsetLeft;
  scrollLeft = photoGrid.scrollLeft;
});

photoGrid.addEventListener('mouseleave', () => isDown = false);
photoGrid.addEventListener('mouseup', () => isDown = false);

photoGrid.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - photoGrid.offsetLeft;
  const walk = (x - startX) * 2;
  photoGrid.scrollLeft = scrollLeft - walk;
});

// Initialize arrows
updateArrows();