document.addEventListener("DOMContentLoaded", function() {
    // 1. Создаем и внедряем стили для выпадающего меню
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
            
            /* Анимация скрытия/появления */
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }

        /* Ссылки внутри выпадашки */
        .dropdown-content {
            display: block;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background-color: #161616;
            
            /* ИЗМЕНЕНИЯ: */
            width: max-content; /* Рамка будет сжиматься ровно по длине самого длинного слова */
            padding: 6px 0;    /* Убираем боковые отступы у рамки, переносим их на ссылки */
            
            box-shadow: 0px 8px 16px rgba(0,0,0,0.6);
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        
        /* 2. Ссылки внутри выпадашки — центровка и отступы */
        .dropdown-content a {
            color: #b3b3b3 !important;
            text-decoration: none !important;
            display: block !important;
            font-size: 13px !important;
            font-family: sans-serif !important;
            
            /* ИЗМЕНЕНИЯ: */
            text-align: center !important;  /* Жесткая центровка текста по середине */
            padding: 12px 20px !important;  /* 12px сверху/снизу (это сделает отступ между строчками) и 20px по бокам */
            
            transition: background 0.2s, color 0.2s !important;
        }
        
        /* Ховер с твоим новым красным цветом */
        .dropdown-content a:hover {
            background-color: #ff3333 !important; 
            color: #fff !important;
        }

        /* Триггер анимации при наведении на DONATE */
        .dropdown:hover .dropdown-content {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0); /* Плавно поднимаем */
        }
    `;
    document.head.appendChild(style);

    // 2. Создаем контейнер для шапки
    const header = document.createElement('div');
    header.className = 'navbar';

    header.innerHTML = `
        <div class="logo" style="cursor: pointer;" onclick="window.location.href='/'">RANCOL<span>.DEV</span></div>
        <div class="nav-links">
            
            <!-- Выпадающее меню DONATE -->
            <div class="dropdown">
                <a href="#" onclick="return false;">DONATE</a>
                <div class="dropdown-content">
                    <a href="https://www.donationalerts.com/r/rancol" target="_blank">RUSSIA</a>
                    <a href="https://boosty.to/rancol347" target="_blank">INTERNATIONAL</a>
                </div>
            </div>

            <a href="https://nfsmods.xyz/user/9422" target="_blank">NFSMODS</a>
            <a href="https://t.me/rancol347" target="_blank">TELEGRAM</a>
        </div>
    `;

    // Встраиваем шапку в самый верх тега body на любой странице
    document.body.insertBefore(header, document.body.firstChild);
});
