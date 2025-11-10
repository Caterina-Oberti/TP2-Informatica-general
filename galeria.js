const images = [
  "imagenes/system-of-a-down.jfif",
  "imagenes/toxicity.jfif",
  "imagenes/steal-this-album!.png",
  "imagenes/mezmerize.jfif",
  "imagenes/hypnotize.jfif"
];

let index = 0;

// Mostrar imagen actual
function showImage() {
  document.getElementById("imagen").src = images[index];
}

// Siguiente imagen
function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

// Imagen anterior
function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

