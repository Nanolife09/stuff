var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var particles = [];
var distance = 0;
var particleAmount = 20;
var fadeDistance = 300;
var colorchangetick = 0;

var colors = 0;
var direction = 1;

class Particle {
    constructor() {
        this.radius = 6;
        this.position = {
            x: Math.random() * (canvas.width - 2 * this.radius) + this.radius,
            y: Math.random() * (canvas.height - 2 * this.radius) + this.radius
        };
        this.angle = Math.PI * 2 * Math.random();
        this.speed = 2;
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        }
    }
    update() {
        if (this.position.x + this.radius > canvas.width || this.position.x - this.radius < 0) this.velocity.x *= -1;
        if (this.position.y + this.radius > canvas.height || this.position.y - this.radius < 0) this.velocity.y *= -1;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {
        this.update();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

function createParticles() {
    for (let i = 0; i < particleAmount; i++) {
        particles.push(new Particle());
    }
}

function linkParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles.forEach((particle, index) => {
            if (index < i) {
                var distance = Math.hypot(particles[i].position.x - particle.position.x, particles[i].position.y - particle.position.y);
                if (distance <= 2 + particle.radius) {
                    particles[i].velocity.x *= -1;
                    particles[i].velocity.y *= -1;
                    particle.velocity.x *= -1;
                    particle.velocity.y *= -1;
                }
                if (++colorchangetick % 100 == 0) {
                    colors++;
                    colors %= 360;
                }
                ctx.strokeStyle = `hsla(${colors}, 100%, 50%, ${(fadeDistance - distance) / fadeDistance})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[i].position.x, particles[i].position.y);
                ctx.lineTo(particle.position.x, particle.position.y);
                ctx.stroke();
            }  
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linkParticles();
    particles.forEach(particle => particle.draw());
    window.requestAnimationFrame(animate);
}

createParticles();
animate();  