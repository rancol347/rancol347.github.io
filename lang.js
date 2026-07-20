document.addEventListener("DOMContentLoaded", function() {
    // 1. База замен
    const ruToEn = {
        "ТЕКУЩИЕ ПРОЕКТЫ": "CURRENT PROJECTS",
        "В ПЛАНАХ": "IN PLANS",
        "ГОТОВО": "DONE",
        "В ПРОЦЕССЕ": "IN PROGRESS",
        "В ОЧЕРЕДИ": "IN QUEUE",
        "КУЗОВ": "BODY",
        "ФАРЫ": "LIGHTS",
        "ПОДКАПОТКА": "ENGINE BAY",
        "ГЕОМЕТРИЯ": "GEOMETRY",
        "КОНВЕРТ В ИГРУ": "CONVERT TO GAME",
        "ПОИСК ПО ГАРАЖУ": "SEARCH GARAGE",
        "ИГРА: NFS MW 2012": "GAME: NFS MW 2012"
    };

    // 2. Функция поиска и замены текста
    function translatePage(toLang) {
        const elements = document.querySelectorAll('body *:not(script):not(style)');
        
        elements.forEach(el => {
            if (el.children.length === 0 && el.textContent.trim() !== "") {
                const currentText = el.textContent.trim().toUpperCase();
                
                if (toLang === 'en') {
                    for (let ruKey in ruToEn) {
                        if (currentText.includes(ruKey)) {
                            if (!el.hasAttribute('data-original-ru')) {
                                el.setAttribute('data-original-ru', el.textContent);
                            }
                            if (el.textContent.includes(":")) {
                                el.textContent = ruToEn[ruKey] + ":";
                            } else {
                                el.textContent = ruToEn[ruKey];
                            }
                        }
                    }
                } else {
                    if (el.hasAttribute('data-original-ru')) {
                        el.textContent = el.getAttribute('data-original-ru');
                    }
                }
            }
        });

        // Подсвечиваем активную кнопку на лету
        document.querySelectorAll('.auto-lang-btn').forEach(btn => {
            if (btn.getAttribute('data-l') === toLang) {
                btn.style.color = '#ff6600'; // Оранжевый для активного
                btn.style.fontWeight = 'bold';
            } else {
                btn.style.color = '#777'; // Серый для неактивного
                btn.style.fontWeight = 'normal';
            }
        });
    }

    // Привязываем функцию глобально
    window.changeLanguage = function(lang) {
        localStorage.setItem('site_lang', lang);
        translatePage(lang);
    };

    // 3. АВТО-ИНЖЕКТОР КНОПОК ПРЯМО В НАВБАР
    // Создаем контейнер с кнопками
    const switcher = document.createElement('span');
    switcher.style.cssText = 'display: inline-flex; gap: 6px; margin-left: 15px; vertical-align: middle; font-size: 13px; font-family: inherit;';
    switcher.innerHTML = `
        <a href="#" class="auto-lang-btn" data-l="ru" onclick="changeLanguage('ru'); return false;" style="text-decoration: none; transition: 0.2s;">RU</a>
        <span style="color: #333;">/</span>
        <a href="#" class="auto-lang-btn" data-l="en" onclick="changeLanguage('en'); return false;" style="text-decoration: none; transition: 0.2s;">EN</a>
    `;

    // Хитрый поиск: ищем ссылку, которая ведет на телеграм или содержит слово TELEGRAM
    let tgLink = document.querySelector('a[href*="t.me"]') || 
                 Array.from(document.querySelectorAll('a')).find(el => el.textContent.includes('TG') || el.textContent.includes('TELEGRAM'));

    if (tgLink) {
        // Вставляем кнопки аккуратно СРАЗУ ПОСЛЕ ссылки на телеграм в тот же контейнер
        tgLink.parentNode.insertBefore(switcher, tgLink.nextSibling);
    } else {
        // Если ссылку не нашли — ищем любой блок навбара или кидаем в конец body
        const nav = document.querySelector('.navbar') || document.querySelector('nav') || document.body;
        nav.appendChild(switcher);
    }

    // 4. Инициализация при старте
    const userLang = localStorage.getItem('site_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    setTimeout(() => {
        translatePage(userLang);
    }, 100);
});
