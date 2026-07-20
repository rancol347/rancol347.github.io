document.addEventListener("DOMContentLoaded", function() {
    // 1. БАЗА ЗАМЕН (Капс)
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

    // 2. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ПЕРЕВОДА
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

        // Подсвечиваем активную кнопку в плавающем виджете
        document.querySelectorAll('.fixed-lang-btn').forEach(btn => {
            if (btn.getAttribute('data-l') === toLang) {
                btn.style.color = '#ff6600'; // Твой оранжевый акцент
                btn.style.borderColor = '#ff6600';
                btn.style.fontWeight = 'bold';
            } else {
                btn.style.color = '#777';
                btn.style.borderColor = '#222';
                btn.style.fontWeight = 'normal';
            }
        });
    }

    // Привязываем функцию глобально
    window.changeLanguage = function(lang) {
        localStorage.setItem('site_lang', lang);
        translatePage(lang);
    };

    // 3. СОЗДАЕМ КРАСИВЫЙ ФИКСИРОВАННЫЙ ВИДЖЕТ В УГЛУ ЭКРАНА
    const widget = document.createElement('div');
    // Закрепляем внизу справа экрана (фиксированная позиция поверх всего)
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #111111;
        border: 1px solid #222222;
        padding: 6px 10px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        display: flex;
        gap: 6px;
        align-items: center;
        z-index: 999999;
        font-family: inherit;
        font-size: 12px;
        letter-spacing: 0.5px;
    `;
    
    widget.innerHTML = `
        <a href="#" class="fixed-lang-btn" data-l="ru" onclick="changeLanguage('ru'); return false;" style="text-decoration: none; padding: 2px 6px; border: 1px solid transparent; border-radius: 4px; transition: 0.2s;">RU</a>
        <span style="color: #222;">|</span>
        <a href="#" class="fixed-lang-btn" data-l="en" onclick="changeLanguage('en'); return false;" style="text-decoration: none; padding: 2px 6px; border: 1px solid transparent; border-radius: 4px; transition: 0.2s;">EN</a>
    `;

    // Закидываем виджет прямо на страницу
    document.body.appendChild(widget);

    // Ховер-эффекты на кнопки через JS, чтобы не городить лишний CSS
    widget.querySelectorAll('.fixed-lang-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.style.fontWeight.includes('bold')) btn.style.color = '#bbb';
        });
        btn.addEventListener('mouseleave', () => {
            if (!btn.style.fontWeight.includes('bold')) btn.style.color = '#777';
        });
    });

    // 4. АВТО-ЗАПУСК ПО ЯЗЫКУ СИСТЕМЫ
    const userLang = localStorage.getItem('site_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    setTimeout(() => {
        translatePage(userLang);
    }, 150);
});
