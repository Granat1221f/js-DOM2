const gallery = document.getElementById("gallery");
let loadedImages = [];
let currentPage = 1; // Для пагінації

// Функція для запиту картинок із заданої сторінки
function fetchImages(page = 1) {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=4`)
    .then((response) => response.json())
    .catch((error) => console.error("Помилка при завантаженні картинок:", error));
}

// Завантажити нові картинки, перевіряючи, щоб вони не повторювались
function loadMoreImages() {
  fetchImages(currentPage).then((images) => {
    images.forEach((image) => {
      // Перевіряємо, чи не було вже цієї картинки
      if (!loadedImages.includes(image.id)) {
        const imgElement = document.createElement("img");
        imgElement.src = `https://picsum.photos/id/${image.id}/200/150`;
        imgElement.alt = image.author;
        gallery.appendChild(imgElement);
        loadedImages.push(image.id); // Додаємо ідентифікатор картинки до масиву
      }
    });

    currentPage++; // Переходимо до наступної сторінки
  });
}

// Очистити галерею
function clearGallery() {
  gallery.innerHTML = "";
  loadedImages = [];
  currentPage = 1; // Скидаємо сторінку на початкову
}

// Видалити останню картинку
function removeLastImage() {
  const lastImage = gallery.lastElementChild;
  if (lastImage) {
    gallery.removeChild(lastImage);
    const imageId = lastImage.src.split('/')[4]; // Отримуємо id картинки з URL
    const index = loadedImages.indexOf(imageId);
    if (index !== -1) {
      loadedImages.splice(index, 1); // Видаляємо id картинки з масиву
    }
  }
}

// Перевернути галерею
function reverseGallery() {
  const images = Array.from(gallery.children);
  gallery.innerHTML = "";
  images.reverse().forEach((img) => gallery.appendChild(img));
}

// Завантажуємо перші 4 картинки при завантаженні сторінки
document.addEventListener("DOMContentLoaded", loadMoreImages);
