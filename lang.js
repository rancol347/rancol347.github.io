document.addEventListener("DOMContentLoaded", function() {
    // 1. База замен (Слева — как в HTML, справа — английский аналог)
    const ruToEn = {
        "ТЕКУЩИЕ ПРОЕКТЫ": "CURRENT PROJECTS",
        "В ПЛАНАХ": "IN PLANS",
        "ГОТОВО": "DONE",
        "В ПРОЦЕССЕ": "IN PROGRESS",
        "В ОЧЕРЕДИ": "IN QUEUE",
        "КУЗОВ:": "BODY:",
        "ФАРЫ:": "LIGHTS:",
        "ПОДКАПОТКА (2JZ):": "ENGINE BAY (2JZ):",
        "ГЕОМЕТРИЯ:": "GEOMETRY:",
        "КОНВЕРТ В ИГРУ:": "CONVERT TO GAME:",
        "ПОИСК ПО ГАРАЖУ...": "SEARCH GARAGE...",
        "ИГРА: NFS MW 2012": "GAME: NFS MW 2012"
    };

    // 2. Функция поиска и замены текста по всему сайту
    function translatePage(toLang) {
        const elements = document.querySelectorAll('body *:not(script):not(style)');
        elements.forEach(el => {
            // Проверяем, что внутри элемента только текст без вложенных тегов
            if (el.children.length === 0 && el.textContent.trim() !== "") {
                const currentText = el.textContent.trim().toUpperCase();
                if (toLang === 'en') {
                    for (let ruKey in ruToEn) {
                        if (currentText === ruKey) {
                            if (!el.hasAttribute('data-original-ru')) {
                                el.setAttribute('data-original-ru', el.textContent);
                            }
                            el.textContent = ruToEn[ruKey];
                        }
                    }
                } else {
                    if (el.hasAttribute('data-original-ru')) {
                        el.textContent = el.getAttribute('data-original-ru');
                    }
                }
            }
        });
    }

    // Делаем функцию глобальной, чтобы ссылки в HTML её видели
    window.changeLanguage = function(lang) {
        localStorage.setItem('site_lang', lang);
        translatePage(lang);
    };

    // 3. Авто-определение языка при заходе иностранца
    const userLang = localStorage.getItem('site_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    if (userLang === 'en') {
        // Минимальная задержка, чтобы весь HTML успел прогрузиться перед заменой строк
        setTimeout(() => translatePage('en'), 100);
    }
});
