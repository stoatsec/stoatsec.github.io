const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.background-animation').appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 50;
const colors = ['#ff6347', '#ff7f50', '#ff4500', '#ff8c69'];

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.y = (particle.y + particle.speedY) % canvas.height;
        particle.x += particle.speedX;

        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;

        particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = particle.color;
                ctx.globalAlpha = 0.2 - distance / 750;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });
    });
}

function animate() {
    drawParticles();
    requestAnimationFrame(animate);
}

animate();
