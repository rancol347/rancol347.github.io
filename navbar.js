document.addEventListener("DOMContentLoaded", function() {
    // 1. СОЗДАЕМ И ВНЕДРЯЕМ СТИЛИ ДЛЯ ВЫПАДАЮЩЕГО МЕНЮ И КНОПОК ЯЗЫКА
    const style = document.createElement('style');
    style.textContent = `
        /* Контейнер для кнопки и меню */
        .dropdown {
            position: relative;
            display: inline-block;
        }
        /* Выпадающий блок */
        .dropdown-content {
            display: block; /* Используем блочную модель для трансформаций */
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px); /* Центрируем под кнопкой и опускаем для анимации */
            background-color: #161616; /* Темный фон */
            min-width: 200px;
            box-shadow: 0px 8px 16px rgba(0,0,0,0.6);
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            padding: 6px 0;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        /* Ссылки внутри выпадашки */
        .dropdown-content a {
            display: block;
            color: #888;
            padding: 8px 16px;
            text-decoration: none;
            transition: 0.2s;
        }
        .dropdown-content a:hover {
            color: #fff;
            background-color: #1f1f1f;
        }
        /* ИЗМЕНЕНИЯ ДЛЯ РАМКИ */
        .dropdown-content {
            width: max-content; /* Рамка будет сжиматься ровно по длине самого длинного слова */
        }

        /* ===== НАШИ СТИЛИ ДЛЯ КНОПОК ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА ===== */
        .lang-switcher {
            display: inline-flex;
            gap: 6px;
            margin-left: 20px; /* Отступ от последней кнопки в твоем навбаре */
            align-items: center;
            vertical-align: middle;
        }
        .lang-btn {
            background: none;
            border: 1px solid #2a2a2a;
            color: #555;
            padding: 2px 8px;
            cursor: pointer;
            font-family: inherit;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 4px;
            transition: 0.2s ease;
        }
        .lang-btn:hover {
            color: #ccc;
            border-color: #444;
        }
        .lang-btn.active {
            color: #fff;
            border-color: #ff6600; /* Оранжевый акцент под стиль NFS/кнопок */
            background-color: rgba(255, 102, 0, 0.05);
        }
    `;
    document.head.appendChild(style);

    // 2. БАЗА ЗАМЕН ДЛЯ ТВОЕГО ИНДЕКС-ХТМЛ (Слева — как в HTML, справа — английский аналог)
    const ruToEn = {
        "ТЕКУЩИЕ ПРОЕКТЫ": "CURRENT PROJECTS",
        "В ПЛАНАХ": "PLANNED",
        "ГОТОВО": "DONE",
        "В ПРОЦЕССЕ": "IN PROGRESS",
        "В ОЧЕРЕДИ": "IN QUEUE",
        "КУЗОВ:": "BODY:",
        "ФАРЫ:": "LIGHTS:",
        "ПОДКАПОТКА:": "ENGINE BAY:",
        "ГЕОМЕТРИЯ:": "GEOMETRY:",
        "КОНВЕРТ В ИГРУ:": "CONVERT TO GAME:",
        "ПОИСК ПО ГАРАЖУ...": "SEARCH IN GARAGE...",
        "ИГРА: NFS MW 2012": "GAME: NFS MW 2012"
    };

    // 3. ФУНКЦИЯ ПЕРЕВОДА СТРАНИЦЫ ПО ВСЕМУ DOM-ДЕРЕВУ
    function translatePage(toLang) {
        const elements = document.querySelectorAll('body *:not(script):not(style)');
        
        elements.forEach(el => {
            // Проверяем, что внутри элемента чистый текст, а не другие теги
            if (el.children.length === 0 && el.textContent.trim() !== "") {
                const currentText = el.textContent.trim().toUpperCase();
                
                if (toLang === 'en') {
                    for (let ruKey in ruToEn) {
                        if (currentText === ruKey) {
                            // Сохраняем русский оригинал в специальный дата-атрибут, чтобы вернуть обратно
                            if (!el.hasAttribute('data-original-ru')) {
                                el.setAttribute('data-original-ru', el.textContent);
                            }
                            el.textContent = ruToEn[ruKey];
                        }
                    }
                } else {
                    // Возвращаем родной русский текст
                    if (el.hasAttribute('data-original-ru')) {
                        el.textContent = el.getAttribute('data-original-ru');
                    }
                }
            }
        });

        // Переключаем класс active на кнопках
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === toLang);
        });
    }

    // Делаем функцию глобальной, чтобы клики по onclick в разметке работали
    window.changeLanguage = function(lang) {
        localStorage.setItem('site_lang', lang);
        translatePage(lang);
    };

    // 4. АВТОМАТИЧЕСКОЕ СОЗДАНИЕ КНОПОК И ИХ ВСТАВКА В ТВОЙ НАВБАР
    const switcherContainer = document.createElement('div');
    switcherContainer.className = 'lang-switcher';
    switcherContainer.innerHTML = `
        <button class="lang-btn" data-lang-btn="ru" onclick="changeLanguage('ru')">RU</button>
        <button class="lang-btn" data-lang-btn="en" onclick="changeLanguage('en')">EN</button>
    `;

    // Скрипт ищет блок с твоими кнопками DONATE, TELEGRAM (обычно это тег <nav> или класс вроде .navbar-links)
    // Если ничего не находит — аккуратно закинет просто в body сайта
    const topMenu = document.querySelector('nav') || document.querySelector('.navbar') || document.body;
    if (topMenu) {
        topMenu.appendChild(switcherContainer);
    }

    // 5. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    // Проверяем сохраненный выбор в браузере. Если его нет — чекаем язык системы (если иностранец, сразу выдаст EN)
    const initialLang = localStorage.getItem('site_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    
    // Небольшой таймаут, чтобы страница полностью отрисовала русский HTML перед подменой текста
    setTimeout(() => {
        translatePage(initialLang);
    }, 40);


    // ==========================================
    // ЗДЕСЬ ТЫ МОЖЕШЬ ПИСАТЬ СВОЙ ОСТАЛЬНОЙ КОД НАВБАРА
    // (Обработчики кликов, открытие/закрытие выпадающего списка и т.д.)
    // ==========================================

});
