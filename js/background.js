const images = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1511",
  "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1493",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1450",
  "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1470",
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=1507"
];

document.body.style.backgroundColor = "#000";
document.body.style.transition = "background-color 0.1s ease";

const preloadImages = () => {
  images.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

preloadImages();

let currentImageIndex = 0;
const bgImage = document.createElement("img");

bgImage.style.position = "fixed";
bgImage.style.top = "0";
bgImage.style.left = "0";
bgImage.style.width = "100%";
bgImage.style.height = "100%";
bgImage.style.objectFit = "cover";
bgImage.style.zIndex = "-1";
bgImage.style.opacity = "0";
bgImage.style.transition = "opacity 0.3s ease-in-out, transform 20s linear";

const changeBackground = () => {
  bgImage.style.opacity = "0";
  
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    bgImage.src = images[currentImageIndex];
    bgImage.style.opacity = "1";
  }, 300);
};

bgImage.onload = () => {
  bgImage.style.transform = "scale(1.1)";
  
  setTimeout(() => {
    bgImage.style.opacity = "1";
  }, 50);

  setInterval(() => {
    bgImage.style.transform = "scale(1.2)";
  }, 50);
};

bgImage.src = images[currentImageIndex];
document.body.appendChild(bgImage);

setInterval(changeBackground, 10000);