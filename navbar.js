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
            
            /* ИЗМЕНЕННЫЕ СТРОКИ: */
            min-width: 140px; /* Сузили базовую ширину с 200px до 140px */
            padding: 4px 10px; /* Сделали компактные отступы сверху/снизу и по бокам */
            
            box-shadow: 0px 8px 16px rgba(0,0,0,0.6);
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }

        /* Эффект наведения на ссылку в меню */
        .dropdown-content a:hover {
            background-color: #ff3333 !important; /* Оранжевый акцент */
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
