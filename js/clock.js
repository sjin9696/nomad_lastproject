const clock = document.querySelector("h2#clock");
const greetings = ["😊", "🌞", "🎉", "💖", "🌈"];

function getClock() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = String(hours % 12 || 12).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  clock.innerText += ` - ${randomGreeting}`;
}

getClock();
setInterval(getClock, 1000);