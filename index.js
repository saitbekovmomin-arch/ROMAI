
const translations = {
  uz: {
    home: "Bosh sahifa",
    designer: "Dizayner",
    styles: "Uslublar",
    start: "Boshlash",
    heroTitle: "Xonangizni yangi dunyoga aylantiring.",
    heroText: "Xonangiz rasmini yuklang va sun'iy intellekt yordamida yangi interyer g'oyalarini kashf eting.",
    try: "Dizaynni boshlash →",
    designerTitle: "O'z xonangizni loyihalang",
    designerText: "Rasm yuklang, xona turini va dizayn uslubini tanlang.",
    uploadTitle: "Xona rasmini yuklang",
    uploadClick: "Rasm tanlash uchun bosing",
    remove: "Rasmni o'chirish",
    roomType: "Xona turi",
    living: "Mehmonxona",
    bedroom: "Yotoqxona",
    kitchen: "Oshxona",
    office: "Ish xonasi",
    bathroom: "Hammom",
    designStyle: "Dizayn uslubi",
    color: "Asosiy rang",
    generate: "AI bilan dizayn yaratish",
    previewTitle: "Sizning loyihangiz",
    notice: "Bu hozircha ko'rish oynasi. Haqiqiy AI dizayn yaratish xizmati keyingi bosqichda ulanadi.",
    stylesTitle: "Dizayn uslublari",
    stylesText: "O'zingizga yoqqan uslubni tanlang.",
    ctaTitle: "Orzuingizdagi xona shu yerdan boshlanadi.",
    footer: "AI yordamida interyer dizayni.",
    selectImage: "Avval xona rasmini yuklang.",
    imageError: "Faqat JPG, PNG yoki WEBP rasm yuklang.",
    imageSize: "Rasm hajmi 10 MB dan oshmasligi kerak.",
    imageSuccess: "Rasm muvaffaqiyatli yuklandi!",
    apiMessage: "Rasm va sozlamalar tayyor! Haqiqiy AI yaratish uchun maxsus AI API hali ulanmagan."
  },

  ru: {
    home: "Главная",
    designer: "Дизайнер",
    styles: "Стили",
    start: "Начать",
    heroTitle: "Превратите свою комнату в новый мир.",
    heroText: "Загрузите фото комнаты и откройте новые идеи интерьера с помощью искусственного интеллекта.",
    try: "Начать дизайн →",
    designerTitle: "Создайте дизайн своей комнаты",
    designerText: "Загрузите фото, выберите тип комнаты и стиль дизайна.",
    uploadTitle: "Загрузите фото комнаты",
    uploadClick: "Нажмите, чтобы выбрать фото",
    remove: "Удалить фото",
    roomType: "Тип комнаты",
    living: "Гостиная",
    bedroom: "Спальня",
    kitchen: "Кухня",
    office: "Рабочий кабинет",
    bathroom: "Ванная",
    designStyle: "Стиль дизайна",
    color: "Основной цвет",
    generate: "Создать дизайн с AI",
    previewTitle: "Ваш проект",
    notice: "Пока это окно предварительного просмотра. Настоящий AI-сервис будет подключён на следующем этапе.",
    stylesTitle: "Стили дизайна",
    stylesText: "Выберите понравившийся стиль.",
    ctaTitle: "Комната вашей мечты начинается здесь.",
    footer: "Дизайн интерьера с помощью AI.",
    selectImage: "Сначала загрузите фото комнаты.",
    imageError: "Загрузите изображение JPG, PNG или WEBP.",
    imageSize: "Размер изображения не должен превышать 10 МБ.",
    imageSuccess: "Фото успешно загружено!",
    apiMessage: "Фото и настройки готовы! Для настоящей генерации пока не подключён AI API."
  },

  en: {
    home: "Home",
    designer: "Designer",
    styles: "Styles",
    start: "Get started",
    heroTitle: "Transform your room into a new world.",
    heroText: "Upload your room photo and discover new interior ideas with artificial intelligence.",
    try: "Start designing →",
    designerTitle: "Design your own room",
    designerText: "Upload a photo and choose your room type and design style.",
    uploadTitle: "Upload your room photo",
    uploadClick: "Click to choose an image",
    remove: "Remove image",
    roomType: "Room type",
    living: "Living room",
    bedroom: "Bedroom",
    kitchen: "Kitchen",
    office: "Home office",
    bathroom: "Bathroom",
    designStyle: "Design style",
    color: "Main color",
    generate: "Create design with AI",
    previewTitle: "Your project",
    notice: "This is currently a preview. The real AI design generation service will be connected in the next stage.",
    stylesTitle: "Design styles",
    stylesText: "Choose your favorite style.",
    ctaTitle: "Your dream room starts here.",
    footer: "Interior design powered by AI.",
    selectImage: "Please upload a room photo first.",
    imageError: "Only JPG, PNG or WEBP images are allowed.",
    imageSize: "Image size must not exceed 10 MB.",
    imageSuccess: "Image uploaded successfully!",
    apiMessage: "Your image and settings are ready! A real AI API has not been connected yet."
  }
};

const languageSelect = document.getElementById("language");
const roomInput = document.getElementById("roomImage");
const preview = document.getElementById("preview");
const designPreview = document.getElementById("designPreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const removeButton = document.getElementById("removeImage");
const status = document.getElementById("status");

let currentLanguage = "uz";
let selectedColor = "white";
let uploadedImageUrl = null;

const roomNames = {
  living: "living",
  bedroom: "bedroom",
  kitchen: "kitchen",
  office: "office",
  bathroom: "bathroom"
};

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const value = translate(key);

    if (value) {
      element.textContent = value;
    }
  });

  updatePreviewInfo();
  status.textContent = "";
}

languageSelect.addEventListener("change", event => {
  changeLanguage(event.target.value);
});

roomInput.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!validTypes.includes(file.type)) {
    status.textContent = translate("imageError");
    roomInput.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    status.textContent = translate("imageSize");
    roomInput.value = "";
    return;
  }

  if (uploadedImageUrl) {
    URL.revokeObjectURL(uploadedImageUrl);
  }

  uploadedImageUrl = URL.createObjectURL(file);

  preview.src = uploadedImageUrl;
  designPreview.src = uploadedImageUrl;

  preview.classList.remove("hidden");
  uploadPlaceholder.classList.add("hidden");
  removeButton.classList.remove("hidden");

  status.textContent = translate("imageSuccess");
});

function removeUploadedImage() {
  if (uploadedImageUrl) {
    URL.revokeObjectURL(uploadedImageUrl);
    uploadedImageUrl = null;
  }

  roomInput.value = "";
  preview.removeAttribute("src");
  preview.classList.add("hidden");
  uploadPlaceholder.classList.remove("hidden");

  designPreview.src =
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000";

  removeButton.classList.add("hidden");
  status.textContent = "";
}

removeButton.addEventListener("click", removeUploadedImage);

const roomSelect = document.getElementById("roomType");
const styleSelect = document.getElementById("designStyle");

function updatePreviewInfo() {
  const roomKey = roomNames[roomSelect.value];

  document.getElementById("previewStyle").textContent =
    styleSelect.options[styleSelect.selectedIndex].text;

  document.getElementById("previewRoom").textContent =
    translate(roomKey) + " · " + selectedColor;
}

roomSelect.addEventListener("change", updatePreviewInfo);
styleSelect.addEventListener("change", updatePreviewInfo);

document.querySelectorAll(".color").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".color").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedColor = button.dataset.color;

    updatePreviewInfo();
  });
});

document.querySelectorAll(".style-card").forEach(card => {
  card.addEventListener("click", () => {
    styleSelect.value = card.dataset.style;
    updatePreviewInfo();

    document.getElementById("designer").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.getElementById("generateBtn").addEventListener("click", () => {
  if (!uploadedImageUrl) {
    status.textContent = translate("selectImage");
    return;
  }

  updatePreviewInfo();

  status.textContent = translate("apiMessage");
});

// Boshlang'ich holat
changeLanguage("uz");
updatePreviewInfo();
// PREMIUM MODAL

function openPremium() {
    document.getElementById("premiumModal").style.display = "flex";
}

function closePremium() {
    document.getElementById("premiumModal").style.display = "none";
}

document.getElementById("premiumModal").addEventListener("click", function(event) {
    if (event.target === this) {
        closePremium();
    }
});
// ROOM AI DASHBOARD

let savedDesigns = 8;

function saveDesign(button) {
    const isSaved = button.dataset.saved === "true";

    if (isSaved) {
        button.innerHTML = "♡";
        button.dataset.saved = "false";
        savedDesigns--;
    } else {
        button.innerHTML = "♥";
        button.dataset.saved = "true";
        savedDesigns++;
    }

    document.getElementById("savedCount").textContent =
        String(savedDesigns).padStart(2, "0");
}// ROOM AI BACKEND CONNECTION
async function sendRoomToServer(imageFile, style, roomType, color) {
    const formData = new FormData();

    formData.append("roomImage", imageFile);
    formData.append("style", style);
    formData.append("roomType", roomType);
    formData.append("color", color);

    try {
        const response = await fetch("http://localhost:3000/api/design", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Xatolik yuz berdi");
        }

        console.log("ROOM AI SERVER:", result);
        alert("Rasm serverga muvaffaqiyatli yuborildi!");

        return result;

    } catch (error) {
        console.error("SERVER ERROR:", error);
        alert("Server bilan bog‘lanib bo‘lmadi!");
        return null;
    }
}
    