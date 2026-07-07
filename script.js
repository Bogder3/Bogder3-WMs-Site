// ========== ДАННЫЕ О ВОДЯНЫХ ЗНАКАХ ==========
// Добавляй сюда новые объекты по порядку
const watermarks = [
    {
        id: 1,
        name: "Bogder3 WM 1",
        description: "Водяной знак с аурой",
        author: "Bogder3"
    },
    {
        id: 2,
        name: "Bogder3 WM 2",
        description: "Необычный водяной знак, пустой текст с неоновой обводкой",
        author: "Bogder3"
    },
    {
        id: 3,
        name: "Bogder3 WM 3",
        description: "Водяной знак с фотом машины, с серой огненой аурой",
        author: "Bogder3"
    },
    {
        id: 4,
        name: "Popular WM 1",
        description: "Довольно известный водяной знак, розоватый неон на чёрном фоне",
        author: "???"
    },
    {
        id: 5,
        name: "Popular WM 2",
        description: "Довольно известный водяной знак, голубой неон на чёрном фоне",
        author: "???"
    }
];

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
// Формируем пути к файлам на основе id
function getPhotoPath(id)   { return `Photos/wm-${id}.jpg`; }
function getVideoPath(id)  { return `Videos/wm-${id}.mp4`; }
function getZipPath(id)    { return `Zips/wm-${id}.zip`; }

// ========== РЕНДЕРИНГ КАТАЛОГА ==========
function renderCatalog() {
    const container = document.getElementById('catalog');
    if (!container) return;

    container.innerHTML = '';
    watermarks.forEach(wm => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = wm.id;

        const img = document.createElement('img');
        img.src = getPhotoPath(wm.id);
        img.alt = wm.name;
        img.loading = 'lazy';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = wm.name;

        card.appendChild(img);
        card.appendChild(title);

        // Клик → переход на страницу знака
        card.addEventListener('click', () => {
            window.location.href = `wm.html?id=${wm.id}`;
        });

        container.appendChild(card);
    });
}

// ========== РЕНДЕРИНГ СТРАНИЦЫ WM ==========
function renderWmPage() {
    // Получаем id из URL (например, ?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    // Элементы, которые будем заполнять
    const titleEl = document.getElementById('wm-title');
    const nameEl = document.getElementById('wm-name');
    const descEl = document.getElementById('wm-description');
    const authorEl = document.getElementById('wm-author');
    const videoEl = document.getElementById('wm-video');
    const downloadEl = document.getElementById('wm-download');

    // Если id не передан или такого нет – показываем ошибку
    if (!id) {
        titleEl.textContent = 'Ошибка: не указан ID';
        nameEl.textContent = 'Знак не найден';
        descEl.textContent = 'Проверьте ссылку.';
        authorEl.textContent = '';
        downloadEl.style.display = 'none';
        return;
    }

    const wm = watermarks.find(w => w.id === id);
    if (!wm) {
        titleEl.textContent = 'Водяной знак не найден';
        nameEl.textContent = `Знак с ID ${id} отсутствует в базе.`;
        descEl.textContent = 'Возможно, вы перешли по неверной ссылке.';
        authorEl.textContent = '';
        downloadEl.style.display = 'none';
        return;
    }

    // Заполняем данными
    titleEl.textContent = wm.name;
    nameEl.textContent = wm.name;
    descEl.textContent = wm.description;
    authorEl.textContent = `✏️ Автор: ${wm.author}`;

    videoEl.src = getVideoPath(wm.id);
    videoEl.poster = getPhotoPath(wm.id); // показываем фото пока грузится видео

    downloadEl.href = getZipPath(wm.id);
    downloadEl.download = `wm-${wm.id}.zip`; // имя скачиваемого файла
    downloadEl.style.display = 'inline-block'; // убедимся, что видна
}

// ========== ЗАПУСК ==========
// Определяем, какая страница загружена, по наличию элементов
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('catalog')) {
        renderCatalog();
    } else if (document.getElementById('wm-video')) {
        renderWmPage();
    }
});